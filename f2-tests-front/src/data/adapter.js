import { sessions } from './sessions';

export function filterSessions(list, group) {
  if (group === 'all') return list;
  if (group === 'Promotion') return list.filter(s => s.group === 'Promotion');
  return list.filter(s => s.group === group || s.group === 'Promotion');
}

export function loadSessions({ group }) {
  return new Promise(resolve => {
    setTimeout(() => resolve(filterSessions(sessions, group)), 300);
  });
}