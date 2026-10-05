import type { View } from '../types';
import { field, focusRing } from '../ui';
import { formatMonth } from '../utils';
import Icon from './Icon';

const views: { value: View; label: string; previous: string; next: string }[] = [
  { value: 'week', label: 'Semaine', previous: 'Semaine précédente', next: 'Semaine suivante' },
  { value: 'twoWeeks', label: '2 semaines', previous: 'Deux semaines précédentes', next: 'Deux semaines suivantes' },
  { value: 'month', label: 'Mois', previous: 'Mois précédent', next: 'Mois suivant' },
];

interface CalendarToolbarProps {
  month: string;
  months: string[];
  view: View;
  onMonthChange: (month: string) => void;
  onMove: (direction: 1 | -1) => void;
  onViewChange: (view: View) => void;
}

export default function CalendarToolbar({ month, months, view, onMonthChange, onMove, onViewChange }: CalendarToolbarProps) {
  const current = views.find(v => v.value === view) ?? views[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className={`${field} min-w-0`}>
          <Icon name="calendar_month" className="text-violet-700" />
          <label htmlFor="month" className="sr-only">Mois affiché</label>
          <select
            id="month"
            value={month}
            onChange={e => onMonthChange(e.target.value)}
            className="min-w-0 appearance-none bg-transparent font-semibold text-slate-900 focus:outline-none"
          >
            {months.map(m => <option key={m} value={m}>{formatMonth(m)}</option>)}
          </select>
          <Icon name="expand_more" className="pointer-events-none text-slate-500" />
        </div>

        <div className="flex shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-white">
          <button type="button" onClick={() => onMove(-1)} aria-label={current.previous} className={`flex p-2 text-slate-700 hover:bg-slate-50 ${focusRing}`}>
            <Icon name="chevron_left" />
          </button>
          <span aria-hidden="true" className="w-px bg-slate-300" />
          <button type="button" onClick={() => onMove(1)} aria-label={current.next} className={`flex p-2 text-slate-700 hover:bg-slate-50 ${focusRing}`}>
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>

      <div role="group" aria-label="Affichage du calendrier" className="flex w-full rounded-lg bg-slate-100 p-1 sm:w-auto sm:self-start">
        {views.map(v => (
          <button
            key={v.value}
            type="button"
            aria-pressed={view === v.value}
            onClick={() => onViewChange(v.value)}
            className={`flex-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 aria-pressed:bg-white aria-pressed:font-semibold aria-pressed:text-violet-800 aria-pressed:shadow-sm sm:flex-none ${focusRing}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}