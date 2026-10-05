import { domains, groups } from '../data/sessions';

const selectClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700';

export default function Filters({ group, domain, onGroupChange, onDomainChange }) {
  return (
    <form className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2" onSubmit={e => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-group" className="text-sm font-medium text-slate-700">Groupe</label>
        <select id="filter-group" value={group} onChange={e => onGroupChange(e.target.value)} className={selectClass}>
          <option value="all">Tous les groupes</option>
          {Object.entries(groups).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-domain" className="text-sm font-medium text-slate-700">Domaine</label>
        <select id="filter-domain" value={domain} onChange={e => onDomainChange(e.target.value)} className={selectClass}>
          <option value="all">Tous les domaines</option>
          {Object.entries(domains).map(([value, d]) => (
            <option key={value} value={value}>{d.label}</option>
          ))}
        </select>
      </div>
    </form>
  );
}