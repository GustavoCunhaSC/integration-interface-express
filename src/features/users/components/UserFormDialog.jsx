import { useEffect, useRef, useState } from 'react';
import { UserRound, X } from 'lucide-react';
import Button from '../../../components/Button';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const fields = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    placeholder: 'Digite o nome do usuário',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Digite o email do usuário',
    autoComplete: 'email',
  },
];

export default function UserFormDialog({ user, onClose, onSave }) {
  const dialogRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;
    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
    };
    if (Object.values(values).some((value) => !value)) {
      setError('Preencha todos os campos.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(values);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="user-form-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!saving) onClose();
      }}
      onClick={(event) => {
        if (!saving && event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-auto bottom-6 right-4 m-0 max-h-[90dvh] w-[calc(100%-2rem)] max-w-[518px] overflow-y-auto rounded-xl border border-line bg-white p-6 text-ink shadow-[0_12px_35px_-10px_rgba(35,55,85,0.2)] backdrop:bg-slate-900/10 sm:bottom-[7.5vh] sm:right-[3%]"
    >
      <div className="mb-6 flex items-center gap-3">
        <UserRound size={25} aria-hidden="true" />
        <h2 id="user-form-title" className="text-xl font-semibold">
          {user ? 'Editar usuário' : 'Novo usuário'}
        </h2>
        <button
          type="button"
          disabled={saving}
          onClick={onClose}
          aria-label="Fechar formulário"
          className="ml-auto rounded p-1 text-muted hover:bg-slate-100 disabled:opacity-50"
        >
          <X size={22} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={saving} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={`user-${field.name}`}
                className="mb-1.5 block text-sm"
              >
                {field.label}
              </label>
              <input
                id={`user-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                defaultValue={user?.[field.name] ?? ''}
                required
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm placeholder:text-[#7488aa] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
            </div>
          ))}
        </fieldset>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <Button disabled={saving} variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={saving} type="submit">
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
