import { useRef, useState } from 'react';
import { sessions } from './data/sessions';
import type { Filters, OpenDetail, Session, View } from './types';
import { buttonPrimary } from './ui';
import { addDays, filterSessions, firstWeekOfMonth, monthOf, shiftMonth, toCsv, weeksToShow } from './utils';
import PageHeader from './components/PageHeader';
import StatsBar from './components/StatsBar';
import CalendarToolbar from './components/CalendarToolbar';
import FilterBar from './components/FilterBar';
import WeekView from './components/WeekView';
import SessionDetail from './components/SessionDetail';

const initialFilters: Filters = { group: 'all', domain: 'all', status: 'all', query: '' };
const months = Array.from({ length: 10 }, (_, i) => shiftMonth('2026-09', i));

export default function App() {
  const [anchor, setAnchor] = useState('2026-10-19');
  const [view, setView] = useState<View>('week');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [showTeachers, setShowTeachers] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<Session | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const weeks = weeksToShow(anchor, view);
  const visible = filterSessions(sessions, filters)
    .filter(s => weeks.some(w => s.date >= w && s.date <= addDays(w, 4)));
  const isFiltered = (Object.keys(initialFilters) as (keyof Filters)[])
    .some(key => filters[key] !== initialFilters[key]);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters(current => ({ ...current, [key]: value }));
  }

  function move(direction: 1 | -1) {
    if (view === 'month') setAnchor(firstWeekOfMonth(shiftMonth(monthOf(anchor), direction)));
    else setAnchor(addDays(anchor, direction * (view === 'week' ? 7 : 14)));
  }

  function exportCsv() {
    const url = URL.createObjectURL(new Blob([toCsv(visible)], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'planning.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  const openDetail: OpenDetail = (session, trigger) => {
    triggerRef.current = trigger;
    setSelected(session);
  };

  function closeDetail() {
    setSelected(null);
    triggerRef.current?.focus();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
        <PageHeader onExport={exportCsv} />
        <StatsBar />

        <section aria-label="Calendrier" className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
          <CalendarToolbar
            month={monthOf(anchor)}
            months={months}
            view={view}
            onMonthChange={m => setAnchor(firstWeekOfMonth(m))}
            onMove={move}
            onViewChange={setView}
          />
          <hr className="border-slate-200" />
          <FilterBar
            filters={filters}
            onChange={updateFilter}
            onReset={() => setFilters(initialFilters)}
            showTeachers={showTeachers}
            onToggleTeachers={setShowTeachers}
            panelOpen={panelOpen}
            onTogglePanel={() => setPanelOpen(open => !open)}
          />
          <hr className="border-slate-200" />

          <p className="text-sm text-slate-600" aria-live="polite">
            {visible.length} séance{visible.length > 1 ? 's' : ''} affichée{visible.length > 1 ? 's' : ''}
          </p>

          {visible.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-medium text-slate-900">
                {isFiltered ? 'Aucune séance ne correspond à ces filtres.' : 'Aucune séance planifiée sur cette période.'}
              </p>
              {isFiltered && (
                <button type="button" onClick={() => setFilters(initialFilters)} className={buttonPrimary}>
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}

          {weeks.map(w => (
            <WeekView key={w} weekStart={w} sessions={visible} allSessions={sessions} showTeachers={showTeachers} onOpen={openDetail} />
          ))}
        </section>
      </main>

      {selected && <SessionDetail session={selected} onClose={closeDetail} />}
    </div>
  );
}