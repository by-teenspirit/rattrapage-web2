import { statuses } from '../data/sessions';

const styles = {
  confirmed: 'border-emerald-700 bg-emerald-700 text-white',
  proposed: 'border-dashed border-slate-500 bg-white text-slate-700',
};

const icons = {
  confirmed: '✓',
  proposed: '…',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      <span aria-hidden="true">{icons[status]}</span>
      {statuses[status]}
    </span>
  );
}