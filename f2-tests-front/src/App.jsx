import PlanningList from './components/PlanningList';
import { loadSessions } from './data/adapter';

export default function App() {
  return <PlanningList loadSessions={loadSessions} />;
}