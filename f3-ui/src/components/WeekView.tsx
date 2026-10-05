import { programme } from '../data/sessions';
import type { OpenDetail, Session } from '../types';
import { addDays, weekNumber } from '../utils';
import DayColumn from './DayColumn';
import Icon from './Icon';

interface WeekViewProps {
  weekStart: string;
  sessions: Session[];
  allSessions: Session[];
  showTeachers: boolean;
  onOpen: OpenDetail;
}

export default function WeekView({ weekStart, sessions, allSessions, showTeachers, onOpen }: WeekViewProps) {
  const n = weekNumber(weekStart, programme.start);
  const inProgramme = n >= 1 && n <= programme.length;
  const meta = programme.weeks[n];
  const days = [0, 1, 2, 3, 4].map(i => addDays(weekStart, i));

  return (
    <section aria-labelledby={`week-${weekStart}`} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-violet-100 px-4 py-3">
        <h2 id={`week-${weekStart}`} className="flex flex-wrap items-center gap-2 text-sm font-semibold text-violet-950">
          <Icon name="view_week" className="text-violet-700" />
          <span className="rounded bg-white px-1.5 py-0.5 text-xs font-bold text-violet-800">
            {inProgramme ? `S${String(n).padStart(2, '0')}` : 'Hors formation'}
          </span>
          {meta?.title ?? 'Bloc à planifier'}
        </h2>
        <p className="flex items-center gap-1 text-sm text-violet-900">
          <Icon name="schedule" size={18} />
          {meta ? `${meta.hours}h apprenant` : 'Volume à définir'}
        </p>
      </div>
      <ol className="flex flex-col gap-3 lg:flex-row">
        {days.map(date => (
          <DayColumn key={date} date={date} sessions={sessions} allSessions={allSessions} showTeachers={showTeachers} onOpen={onOpen} />
        ))}
      </ol>
    </section>
  );
}