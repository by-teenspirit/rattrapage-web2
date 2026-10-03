import { useEffect, useState } from 'react';

export default function PlanningList({ loadSessions }) {
  const [group, setGroup] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    loadSessions({ group })
      .then(result => {
        if (active) setItems(result);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [group, loadSessions, attempt]);

  return (
    <section>
      <h1>Planning</h1>
      <select aria-label="Groupe" value={group}
        onChange={e => setGroup(e.target.value)}>
        <option value="all">Tous</option>
        <option value="A">Groupe A</option>
        <option value="B">Groupe B</option>
        <option value="Promotion">Promotion</option>
      </select>
      {loading && <p role="status">Chargement…</p>}
      {!loading && error && (
        <div role="alert">
          <p>Impossible de charger le planning.</p>
          <button type="button" onClick={() => setAttempt(a => a + 1)}>Réessayer</button>
        </div>
      )}
      {!loading && !error && items.length === 0 && <p>Aucune séance pour ce groupe.</p>}
      {!loading && !error && items.length > 0 && (
        <ul>{items.map(s => <li key={s.id}>{s.title}</li>)}</ul>
      )}
    </section>
  );
}