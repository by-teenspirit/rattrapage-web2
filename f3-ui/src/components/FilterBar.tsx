import { domains, groups, statuses } from '../data/sessions';
import type { DomainKey, Filters, Group, Status } from '../types';
import { buttonSecondary, field, focusRing } from '../ui';
import { entries } from '../utils';
import Icon from './Icon';

const chip = `inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 aria-pressed:border-violet-700 aria-pressed:bg-violet-50 aria-pressed:font-semibold aria-pressed:text-violet-900 ${focusRing}`;

const select = `rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm ${focusRing}`;

interface FilterBarProps {
  filters: Filters;
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
  showTeachers: boolean;
  onToggleTeachers: (checked: boolean) => void;
  panelOpen: boolean;
  onTogglePanel: () => void;
}

export default function FilterBar({ filters, onChange, onReset, showTeachers, onToggleTeachers, panelOpen, onTogglePanel }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={`${field} min-w-0 flex-1`}>
          <Icon name="search" className="text-slate-500" />
          <label htmlFor="search" className="sr-only">Rechercher</label>
          <input
            id="search"
            type="search"
            value={filters.query}
            onChange={e => onChange('query', e.target.value)}
            placeholder="Rechercher un formateur, une séance"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
        </div>
        <button type="button" onClick={onTogglePanel} aria-expanded={panelOpen} aria-controls="filters-panel" className={`${buttonSecondary} shrink-0`}>
          <Icon name="filter_list" />
          <span className="sr-only sm:not-sr-only">Filtres</span>
        </button>
      </div>

      <div id="filters-panel" hidden={!panelOpen} className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-3">
        <label htmlFor="status" className="text-sm font-medium text-slate-700">Statut</label>
        <select id="status" value={filters.status} onChange={e => onChange('status', e.target.value as Status | 'all')} className={select}>
          <option value="all">Tous les statuts</option>
          {entries(statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={showTeachers} onChange={e => onToggleTeachers(e.target.checked)} className="size-4 accent-violet-700" />
          Formateurs affectés
        </label>
        <span aria-hidden="true" className="hidden h-6 w-px bg-slate-300 sm:block" />
        <div className="flex items-center gap-2">
          <Icon name="filter_alt" className="text-slate-500" />
          <label htmlFor="group" className="text-sm font-medium text-slate-700">Groupe</label>
          <select id="group" value={filters.group} onChange={e => onChange('group', e.target.value as Group | 'all')} className={select}>
            <option value="all">Tous les groupes</option>
            {entries(groups).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <button type="button" onClick={onReset} aria-label="Réinitialiser les filtres" className={`ml-auto flex rounded-lg p-2 text-slate-600 hover:bg-slate-100 ${focusRing}`}>
          <Icon name="filter_alt_off" />
        </button>
      </div>

      <div role="group" aria-label="Domaine" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <button type="button" aria-pressed={filters.domain === 'all'} onClick={() => onChange('domain', 'all')} className={`${chip} shrink-0`}>
          <Icon name="grid_view" size={18} />
          Tout le programme
        </button>
        {entries(domains).map(([value, d]) => (
          <button key={value} type="button" aria-pressed={filters.domain === value} onClick={() => onChange('domain', value as DomainKey)} className={`${chip} shrink-0`}>
            <span aria-hidden="true" className={`size-2.5 rounded-full ${d.dot}`} />
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}