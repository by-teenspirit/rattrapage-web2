export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700';

export const field = 'flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-violet-700';

const button = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold sm:px-4 ${focusRing}`;

export const buttonPrimary = `${button} bg-violet-700 text-white hover:bg-violet-800`;

export const buttonSecondary = `${button} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`;