import { domains, groups, periods, teacherName } from '../data/sessions';
import type { OpenDetail, Session } from '../types';
import { focusRing } from '../ui';
import Icon from './Icon';
import StatusBadge from './StatusBadge';

interface SessionBlockProps {
  session: Session;
  showTeacher: boolean;
  onOpen: OpenDetail;
}

export default function SessionBlock({ session, showTeacher, onOpen }: SessionBlockProps) {
  const domain = domains[session.domain];
  const period = periods[session.period];
  const border = session.status === 'proposed' ? 'border-dashed' : '';

  return (
    <button
      type="button"
      onClick={e => onOpen(session, e.currentTarget)}
      className={`flex w-full flex-col items-start gap-1 rounded-lg border border-l-4 border-slate-300 p-3 text-left hover:shadow-md ${domain.block} ${border} ${focusRing}`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
        {period.label} – {groups[session.group]}
      </span>
      <span className="font-semibold text-slate-900">{session.title}</span>
      <span className="text-xs text-slate-600">{period.hours}</span>
      <span className={`text-xs font-medium ${domain.text}`}>{domain.label}</span>
      {showTeacher && (
        <span className="flex items-center gap-1 text-xs text-slate-700">
          <Icon name="person" size={16} />
          {teacherName(session.teacherId) ?? 'Sans formateur'}
        </span>
      )}
      <StatusBadge status={session.status} />
      <span className="sr-only">, voir le détail</span>
    </button>
  );
}