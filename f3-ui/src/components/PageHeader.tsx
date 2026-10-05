import { buttonPrimary, buttonSecondary } from '../ui';
import Icon from './Icon';

export default function PageHeader({ onExport }: { onExport: () => void }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Année pédagogique 2026 – 2027</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Planning pédagogique</h1>
        <p className="text-slate-600">Les bonnes expertises, au bon moment</p>
      </div>
      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        <button type="button" onClick={onExport} className={`${buttonSecondary} flex-1 sm:flex-none`}>
          <Icon name="ios_share" />
          Exporter
        </button>
        <button type="button" className={`${buttonPrimary} flex-1 sm:flex-none`}>
          <Icon name="done_all" />
          Affecter un bloc
        </button>
      </div>
    </header>
  );
}