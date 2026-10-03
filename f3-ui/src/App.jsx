import StatusBadge from './components/StatusBadge';

export default function App() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">Planning pédagogique</h1>
      <div className="mt-4 flex gap-2">
        <StatusBadge status="confirmed" />
        <StatusBadge status="proposed" />
      </div>
    </main>
  );
}