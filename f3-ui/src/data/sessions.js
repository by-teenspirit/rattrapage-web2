export const sessions = [
  { id: 's01', date: '2026-10-19', period: 'am', group: 'A', mode: 'DG', title: 'React composants', domain: 'web', teacherId: 't1', status: 'confirmed' },
  { id: 's02', date: '2026-10-19', period: 'am', group: 'B', mode: 'DG', title: 'React événements', domain: 'web', teacherId: 't2', status: 'confirmed' },
  { id: 's03', date: '2026-10-19', period: 'pm', group: 'Promotion', mode: 'CE', title: 'Données et SQL', domain: 'data', teacherId: 't1', status: 'confirmed' },
  { id: 's04', date: '2026-10-20', period: 'am', group: 'A', mode: 'DG', title: 'Authentification', domain: 'cyber', teacherId: 't2', status: 'proposed' },
  { id: 's05', date: '2026-10-20', period: 'am', group: 'B', mode: 'DG', title: 'Revue de projet', domain: 'projet', teacherId: 't3', status: 'proposed' },
  { id: 's06', date: '2026-10-20', period: 'pm', group: 'Promotion', mode: 'AUTO', title: 'Travail autonome', domain: 'projet', teacherId: null, status: 'proposed' },
];

export const teachers = {
  t1: 'Camille Exemple',
  t2: 'Alex Démonstration',
  t3: 'Sam Fictif',
};

export const periods = {
  am: 'Matin',
  pm: 'Après-midi',
};

export const groups = {
  A: 'Groupe A',
  B: 'Groupe B',
  Promotion: 'Promotion entière',
};

export const modes = {
  DG: 'Demi-groupe',
  CE: 'Classe entière',
  AUTO: 'Autonomie',
};

export const statuses = {
  confirmed: 'Confirmée',
  proposed: 'Proposée',
};

export const domains = {
  web: { label: 'Développement web', className: 'bg-violet-100 text-violet-800' },
  data: { label: 'Data & SQL', className: 'bg-sky-100 text-sky-800' },
  cyber: { label: 'Cybersécurité', className: 'bg-rose-100 text-rose-800' },
  projet: { label: 'Projet', className: 'bg-amber-100 text-amber-900' },
};