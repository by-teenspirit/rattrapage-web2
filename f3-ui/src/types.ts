export type Period = 'am' | 'pm';
export type Group = 'A' | 'B' | 'Promotion';
export type Mode = 'DG' | 'CE' | 'AUTO';
export type Status = 'confirmed' | 'proposed';
export type DomainKey = 'web' | 'data' | 'ia' | 'ux' | 'cyber' | 'projet';
export type TeacherId = 't1' | 't2' | 't3';
export type View = 'week' | 'twoWeeks' | 'month';

export interface Session {
  id: string;
  date: string;
  period: Period;
  group: Group;
  mode: Mode;
  title: string;
  domain: DomainKey;
  teacherId: TeacherId | null;
  status: Status;
}

export interface Domain {
  label: string;
  dot: string;
  block: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
  tone: string;
}

export interface Filters {
  group: Group | 'all';
  domain: DomainKey | 'all';
  status: Status | 'all';
  query: string;
}

export type OpenDetail = (session: Session, trigger: HTMLButtonElement) => void;