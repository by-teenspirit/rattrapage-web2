import { domains, groups, periods, statuses, teacherName } from './data/sessions';
import type { Filters, Session, View } from './types';

const DAY = 86400000;

export function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function addDays(iso: string, n: number): string {
  return new Date(toDate(iso).getTime() + n * DAY).toISOString().slice(0, 10);
}

export function mondayOf(iso: string): string {
  return addDays(iso, -((toDate(iso).getUTCDay() + 6) % 7));
}

export function monthOf(weekStart: string): string {
  return addDays(weekStart, 3).slice(0, 7);
}

export function shiftMonth(month: string, n: number): string {
  const date = toDate(`${month}-01`);
  date.setUTCMonth(date.getUTCMonth() + n);
  return date.toISOString().slice(0, 7);
}

export function firstWeekOfMonth(month: string): string {
  const monday = mondayOf(`${month}-01`);
  return monthOf(monday) === month ? monday : addDays(monday, 7);
}

export function weeksToShow(anchor: string, view: View): string[] {
  if (view === 'week') return [anchor];
  if (view === 'twoWeeks') return [anchor, addDays(anchor, 7)];
  const month = monthOf(anchor);
  const weeks: string[] = [];
  for (let w = firstWeekOfMonth(month); monthOf(w) === month; w = addDays(w, 7)) weeks.push(w);
  return weeks;
}

export function weekNumber(weekStart: string, start: string): number {
  return Math.round((toDate(weekStart).getTime() - toDate(start).getTime()) / (7 * DAY)) + 1;
}

function format(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('fr-FR', { ...options, timeZone: 'UTC' }).format(toDate(iso));
}

export function formatDate(iso: string): string {
  return format(iso, { weekday: 'long', day: 'numeric', month: 'long' });
}

export function formatMonth(month: string): string {
  const label = format(`${month}-01`, { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function dayParts(iso: string): { weekday: string; day: number; month: string } {
  return {
    weekday: format(iso, { weekday: 'long' }),
    day: toDate(iso).getUTCDate(),
    month: format(iso, { month: 'short' }),
  };
}

function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function filterSessions(list: Session[], { group, domain, status, query }: Filters): Session[] {
  const search = normalize(query.trim());
  return list.filter(s => {
    const groupOk = group === 'all'
      || s.group === group
      || (group !== 'Promotion' && s.group === 'Promotion');
    const domainOk = domain === 'all' || s.domain === domain;
    const statusOk = status === 'all' || s.status === status;
    const text = normalize(`${s.title} ${teacherName(s.teacherId) ?? ''} ${domains[s.domain].label}`);
    return groupOk && domainOk && statusOk && text.includes(search);
  });
}

export function toCsv(list: Session[]): string {
  const header = ['id', 'date', 'période', 'groupe', 'titre', 'domaine', 'formateur', 'statut'];
  const rows = list.map(s => [
    s.id, s.date, periods[s.period].label, groups[s.group], s.title,
    domains[s.domain].label, teacherName(s.teacherId) ?? '', statuses[s.status],
  ]);
  return '\ufeff' + [header, ...rows]
    .map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(';'))
    .join('\n');
}

export function entries<K extends string, V>(record: Record<K, V>): [K, V][] {
  return Object.entries(record) as [K, V][];
}