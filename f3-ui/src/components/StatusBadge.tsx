import { statuses } from '../data/sessions';
import type { Status } from '../types';
import Icon from './Icon';

const styles: Record<Status, string> = {
  confirmed: 'border-emerald-700 bg-emerald-700 text-white',
  proposed: 'border-dashed border-slate-500 bg-white text-slate-700',
};

const icons: Record<Status, string> = {
  confirmed: 'check_circle',
  proposed: 'hourglass_empty',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      <Icon name={icons[status]} size={14} filled={status === 'confirmed'} />
      {statuses[status]}
    </span>
  );
}