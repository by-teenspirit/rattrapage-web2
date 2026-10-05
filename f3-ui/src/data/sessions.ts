import type { Domain, DomainKey, Group, Mode, Period, Session, Stat, Status, TeacherId } from '../types';

export const sessions: Session[] = [
  { id: 's01', date: '2026-10-19', period: 'am', group: 'A', mode: 'DG', title: 'React composants', domain: 'web', teacherId: 't1', status: 'confirmed' },
  { id: 's02', date: '2026-10-19', period: 'am', group: 'B', mode: 'DG', title: 'React événements', domain: 'web', teacherId: 't2', status: 'confirmed' },
  { id: 's03', date: '2026-10-19', period: 'pm', group: 'Promotion', mode: 'CE', title: 'Données et SQL', domain: 'data', teacherId: 't1', status: 'confirmed' },
  { id: 's04', date: '2026-10-20', period: 'am', group: 'A', mode: 'DG', title: 'Authentification', domain: 'cyber', teacherId: 't2', status: 'proposed' },
  { id: 's05', date: '2026-10-20', period: 'am', group: 'B', mode: 'DG', title: 'Revue de projet', domain: 'projet', teacherId: 't3', status: 'proposed' },
  { id: 's06', date: '2026-10-20', period: 'pm', group: 'Promotion', mode: 'AUTO', title: 'Travail autonome', domain: 'projet', teacherId: null, status: 'proposed' },
];

export const teachers: Record<TeacherId, string> = {
  t1: 'Camille Exemple',
  t2: 'Alex Démonstration',
  t3: 'Sam Fictif',
};

export const periods: Record<Period, { label: string; hours: string }> = {
  am: { label: 'Matin', hours: '3h30' },
  pm: { label: 'Après-midi', hours: '3h30' },
};

export const groups: Record<Group, string> = {
  A: 'Groupe A',
  B: 'Groupe B',
  Promotion: 'Promotion entière',
};

export const modes: Record<Mode, string> = {
  DG: 'Demi-groupes',
  CE: 'Classe entière',
  AUTO: 'Autonomie',
};

export const statuses: Record<Status, string> = {
  confirmed: 'Confirmée',
  proposed: 'Proposée',
};

export const domains: Record<DomainKey, Domain> = {
  web: { label: 'Web', dot: 'bg-violet-600', block: 'border-l-violet-600 bg-violet-50', text: 'text-violet-800' },
  data: { label: 'Data & SQL', dot: 'bg-teal-600', block: 'border-l-teal-600 bg-teal-50', text: 'text-teal-800' },
  ia: { label: 'IA', dot: 'bg-pink-500', block: 'border-l-pink-500 bg-pink-50', text: 'text-pink-800' },
  ux: { label: 'UX / UI', dot: 'bg-sky-500', block: 'border-l-sky-500 bg-sky-50', text: 'text-sky-800' },
  cyber: { label: 'Cybersécurité', dot: 'bg-orange-500', block: 'border-l-orange-500 bg-orange-50', text: 'text-orange-800' },
  projet: { label: 'Projet', dot: 'bg-amber-500', block: 'border-l-amber-500 bg-amber-50', text: 'text-amber-800' },
};

export const programme: { start: string; length: number; weeks: Record<number, { title: string; hours: number }> } = {
  start: '2026-10-12',
  length: 28,
  weeks: {
    1: { title: 'Bloc accueil et fondamentaux', hours: 35 },
    2: { title: 'Bloc HTML/CSS et UX', hours: 35 },
    3: { title: 'Bloc JavaScript', hours: 35 },
  },
};

export const stats: Stat[] = [
  { value: '28', label: 'semaines de formation', icon: 'calendar_month', tone: 'bg-violet-100 text-violet-700' },
  { value: '10', label: 'formateurs mobilisables', icon: 'group', tone: 'bg-blue-100 text-blue-700' },
  { value: '931h', label: 'par étudiant, avant stage', icon: 'schedule', tone: 'bg-amber-100 text-amber-800' },
  { value: 'IA & RGPD', label: 'intégrés au parcours', icon: 'verified_user', tone: 'bg-emerald-100 text-emerald-700' },
];

export function teacherName(id: TeacherId | null): string | null {
  return id ? teachers[id] : null;
}