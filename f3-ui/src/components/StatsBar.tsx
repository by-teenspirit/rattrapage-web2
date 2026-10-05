import { stats } from '../data/sessions';
import Icon from './Icon';

export default function StatsBar() {
  return (
    <ul className="flex flex-wrap gap-3 sm:gap-4" aria-label="Chiffres clés de la formation">
      {stats.map(stat => (
        <li key={stat.label} className="flex min-w-36 flex-1 basis-36 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg sm:size-11 ${stat.tone}`}>
            <Icon name={stat.icon} size={24} />
          </span>
          <p className="flex min-w-0 flex-col">
            <span className="text-base font-bold text-slate-900 sm:text-lg">{stat.value}</span>
            <span className="text-xs text-slate-600 sm:text-sm">{stat.label}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}