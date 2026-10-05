import { useEffect, useRef, type MouseEvent } from 'react';
import { domains, groups, modes, periods, teacherName } from '../data/sessions';
import type { Session } from '../types';
import { focusRing } from '../ui';
import { formatDate } from '../utils';
import Icon from './Icon';
import StatusBadge from './StatusBadge';

interface SessionDetailProps {
  session: Session;
  onClose: () => void;
}

export default function SessionDetail({ session, onClose }: SessionDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) close();
  }

  const domain = domains[session.domain];
  const rows: [string, string][] = [
    ['Date', formatDate(session.date)],
    ['Période', `${periods[session.period].label} · ${periods[session.period].hours}`],
    ['Groupe', groups[session.group]],
    ['Mode', modes[session.mode]],
    ['Formateur', teacherName(session.teacherId) ?? 'Aucun : séance en autonomie'],
  ];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="detail-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 shadow-xl backdrop:bg-slate-900/50"
    >
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Détail de la séance · {session.id}</p>
            <h2 id="detail-title" className="text-xl font-bold text-slate-900">{session.title}</h2>
          </div>
          <button type="button" onClick={close} autoFocus aria-label="Fermer le détail" className={`flex rounded-lg p-2 text-slate-600 hover:bg-slate-100 ${focusRing}`}>
            <Icon name="close" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium ${domain.text}`}>
            <span aria-hidden="true" className={`size-2 rounded-full ${domain.dot}`} />
            {domain.label}
          </span>
          <StatusBadge status={session.status} />
        </div>

        <dl className="flex flex-col gap-2 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <dt className="w-24 shrink-0 text-slate-500">{label}</dt>
              <dd className="text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        {session.status === 'proposed' && (
          <p className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
            <Icon name="info" size={18} />
            Cette séance est proposée : elle n'est pas encore validée.
          </p>
        )}
      </div>
    </dialog>
  );
}