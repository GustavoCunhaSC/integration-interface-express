const variants = {
  primary: 'border-primary bg-primary text-white hover:bg-blue-700',
  secondary: 'border-slate-300 bg-white text-ink hover:bg-slate-50',
  danger: 'border-red-500 bg-red-500 text-white hover:bg-red-600',
}

export default function Button({ variant = 'primary', size = 'default', className = '', children, ...props }) {
  const spacing = size === 'icon' ? 'h-9 w-10 p-0' : 'px-6 py-2.5'
  return (
    <button type="button" className={`inline-flex items-center justify-center gap-3 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${spacing} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
