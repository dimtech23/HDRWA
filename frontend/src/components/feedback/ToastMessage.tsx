import { useEffect } from 'react'

type ToastTone = 'success' | 'error' | 'info'

const toneStyles: Record<ToastTone, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
}

type ToastMessageProps = {
  text: string
  tone?: ToastTone
  onClose: () => void
  durationMs?: number
}

export function ToastMessage({
  text,
  tone = 'info',
  onClose,
  durationMs = 2600,
}: ToastMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, durationMs)
    return () => clearTimeout(timer)
  }, [onClose, durationMs])

  return (
    <div className={`rounded-lg border px-3 py-2 text-xs font-medium shadow-sm ${toneStyles[tone]}`}>
      <div className="flex items-center justify-between gap-2">
        <span>{text}</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-1.5 py-0.5 text-[10px] font-semibold hover:bg-black/5"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
