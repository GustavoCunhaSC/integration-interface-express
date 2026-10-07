import { Pencil, SearchX, Trash2 } from 'lucide-react'
import Button from '../../../components/Button'

export default function UsersTable({ users, total, onEdit, onDelete }) {
  return (
    <section aria-label="Lista de usuários" className="rounded-xl border border-line bg-white p-3 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f5f7fa]">
            <tr>
              {['ID', 'Nome', 'Email', 'Ações'].map((heading) => (
                <th key={heading} scope="col" className="border-b border-line px-4 py-4 font-semibold first:rounded-tl-lg last:rounded-tr-lg">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-line transition-colors hover:bg-slate-50/70">
                <td className="w-[20%] px-4 py-3">{user.id}</td>
                <td className="w-[30%] px-4 py-3 font-medium">{user.name}</td>
                <td className="w-[30%] px-4 py-3 text-muted">{user.email}</td>
                <td className="w-[200px] px-4 py-3">
                  <div className="flex gap-2.5">
                    <Button size="icon" aria-label={`Editar ${user.name}`} title="Editar usuário" onClick={() => onEdit(user)}><Pencil size={17} aria-hidden="true" /></Button>
                    <Button variant="danger" size="icon" aria-label={`Excluir ${user.name}`} title="Excluir usuário" onClick={() => onDelete(user)}><Trash2 size={17} aria-hidden="true" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-muted"><SearchX className="mx-auto mb-3" aria-hidden="true" />Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p aria-live="polite" className="px-4 py-6 text-sm text-muted">Mostrando {users.length} de {total} usuários</p>
    </section>
  )
}
