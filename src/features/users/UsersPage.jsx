import { useState } from 'react';
import { Plus, Search, Users, X } from 'lucide-react';
import Button from '../../components/Button';
import UsersTable from './components/UsersTable';
import UserFormDialog from './components/UserFormDialog';

const INITIAL_USERS = [
  { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com' },
  { id: 2, name: 'Bruno Lima', email: 'bruno@exemplo.com' },
  { id: 3, name: 'Carla Mendes', email: 'carla@exemplo.com' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(null);
  const [notice, setNotice] = useState('');
  const [users, setUsers] = useState(INITIAL_USERS);
  const query = search.trim().toLocaleLowerCase('pt-BR');
  const filteredUsers = users.filter((user) =>
    [user.name, user.email].some((value) =>
      value.toLocaleLowerCase('pt-BR').includes(query),
    ),
  );

  function handleEdit(user) {
    setNotice('');
    setForm({ user });
  }

  function handleSave(values) {
    setNotice('');
    if (form.user) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === form.user.id ? { ...user, ...values } : user,
        ),
      );
      setNotice('Usuário atualizado com sucesso!');
    } else {
      setUsers((currentUsers) => [
        ...currentUsers,
        { id: Date.now(), ...values },
      ]);
      setNotice('Usuário criado com sucesso!');
    }
    setForm(null);
  }

  function handleDelete(user) {
    if (!window.confirm(`Deseja excluir ${user.name}?`)) return;
    setNotice('');
    setUsers((currentUsers) =>
      currentUsers.filter((item) => item.id !== user.id),
    );
    setNotice('Usuário excluído com sucesso!');
  }

  return (
    <main className="mx-auto min-h-dvh max-w-[1440px] px-4 py-8 sm:px-10 sm:py-9">
      <header className="mb-9 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Users size={39} strokeWidth={2.1} aria-hidden="true" />
          <div>
            <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
              Usuários
            </h1>
            <p className="mt-2 text-base text-muted">
              Gerencie os usuários da sua aplicação
            </p>
          </div>
        </div>
        <Button
          className="min-h-12 text-base"
          onClick={() => {
            setNotice('');
            setForm({ user: null });
          }}
        >
          <Plus size={23} aria-hidden="true" />
          Novo usuário
        </Button>
      </header>

      <div className="relative mb-6">
        <Search
          size={22}
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted"
        />
        <label htmlFor="user-search" className="sr-only">
          Buscar usuários por nome ou email
        </label>
        <input
          id="user-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nome ou email..."
          className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-14 pr-4 text-base placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      </div>
      <UsersTable
        users={filteredUsers}
        total={users.length}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {notice && (
        <div
          role="status"
          className="mt-5 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
        >
          <p className="flex-1">{notice}</p>
          <button
            type="button"
            aria-label="Dispensar aviso"
            onClick={() => setNotice('')}
            className="rounded p-0.5"
          >
            <X size={18} />
          </button>
        </div>
      )}
      {form && (
        <UserFormDialog
          user={form.user}
          onClose={() => setForm(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
}
