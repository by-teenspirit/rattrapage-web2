import PlanningList from './components/PlanningList';
import { loadSessions } from './data/adapter';

export default function App() {
  return (
    <main>
      <p>MATRiCE — version de démonstration CI/CD</p>
      <PlanningList loadSessions={loadSessions} />
    </main>
  );
}