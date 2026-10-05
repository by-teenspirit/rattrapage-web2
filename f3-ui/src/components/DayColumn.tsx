import { modes } from '../data/sessions';
import type { OpenDetail, Session } from '../types';
import { dayParts } from '../utils';
import SessionBlock from './SessionBlock';

interface DayColumnProps {
  date: string;
  sessions: Session[];
  allSessions: Session[];
  showTeachers: boolean;
  onOpen: OpenDetail;
}

export default function DayColumn({ date, sessions, allSessions, showTeachers, onOpen }: DayColumnProps) {
  const { weekday, day, month } = dayParts(date);
  const daySessions = sessions
    .filter(s => s.date === date)
    .sort((a, b) => a.period.localeCompare(b.period) || a.group.localeCompare(b.group));
  const dayModes = [...new Set(allSessions.filter(s => s.date === date).map(s => modes[s.mode]))];

  return (
    <li className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="flex flex-col">
        <span className="text-xs font-medium text-slate-500">{weekday}</span>
        <span className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900">{day}</span>
          <span className="text-sm text-slate-500">{month}</span>
        </span>
        <span className="text-xs text-slate-500">{dayModes.join(' · ') || 'Pas de cours'}</span>
      </h3>
      <hr className="border-slate-200" />
      {daySessions.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {daySessions.map(s => (
            <li key={s.id}>
              <SessionBlock session={s} showTeacher={showTeachers} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-slate-500">Aucune séance</p>
      )}
    </li>
  );
}