import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Initial from '../src/components/PlanningListInitial';
import Corrige from '../src/components/PlanningList';
import { sessions } from '../src/data/sessions';
import { filterSessions } from '../src/data/adapter';

const PlanningList = process.env.VERSION === 'initial' ? Initial : Corrige;

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function fakeLoader() {
  return vi.fn(({ group }) => Promise.resolve(filterSessions(sessions, group)));
}

describe('PlanningList', () => {
  test('affiche le chargement pendant la requête', () => {
    const pending = deferred();
    render(<PlanningList loadSessions={() => pending.promise} />);
expect(screen.getByRole('status')).toHaveTextContent('Loading');  });

  test('affiche les séances en cas de succès', async () => {
    render(<PlanningList loadSessions={fakeLoader()} />);
    expect(await screen.findByText('React composants')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('le groupe A inclut les séances Promotion', async () => {
    const user = userEvent.setup();
    const loader = fakeLoader();
    render(<PlanningList loadSessions={loader} />);
    await screen.findByText('React composants');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Groupe' }), 'A');
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(4));
    expect(screen.getByText('Données et SQL')).toBeInTheDocument();
    expect(screen.queryByText('React événements')).not.toBeInTheDocument();
    expect(loader).toHaveBeenLastCalledWith({ group: 'A' });
  });

  test('affiche un message quand le résultat est vide', async () => {
    render(<PlanningList loadSessions={() => Promise.resolve([])} />);
    expect(await screen.findByText('Aucune séance pour ce groupe.')).toBeInTheDocument();
  });

  test('affiche une erreur puis recharge après nouvelle tentative', async () => {
    const user = userEvent.setup();
    const loader = vi.fn()
      .mockRejectedValueOnce(new Error('réseau'))
      .mockResolvedValueOnce(sessions);
    render(<PlanningList loadSessions={loader} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Impossible de charger');
    await user.click(screen.getByRole('button', { name: 'Réessayer' }));
    expect(await screen.findByText('React composants')).toBeInTheDocument();
    expect(loader).toHaveBeenCalledTimes(2);
  });

  test('ignore une réponse obsolète arrivée en retard', async () => {
    const user = userEvent.setup();
    const lente = deferred();
    const rapide = deferred();
    const loader = vi.fn(({ group }) => (group === 'all' ? lente.promise : rapide.promise));
    render(<PlanningList loadSessions={loader} />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Groupe' }), 'B');
    rapide.resolve(filterSessions(sessions, 'B'));
    await screen.findByText('React événements');
    lente.resolve(sessions);
    await new Promise(r => setTimeout(r, 0));
    expect(screen.queryByText('React composants')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  test('le filtre a un nom accessible et se manipule au clavier', async () => {
    const user = userEvent.setup();
    const loader = fakeLoader();
    render(<PlanningList loadSessions={loader} />);
    const filtre = screen.getByRole('combobox', { name: 'Groupe' });
    await user.tab();
    expect(filtre).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    await user.selectOptions(filtre, 'B');
    expect(filtre).toHaveValue('B');
    expect(loader).toHaveBeenLastCalledWith({ group: 'B' });
  });
});