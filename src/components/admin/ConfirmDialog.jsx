import Modal from './Modal'
import { FiAlertTriangle } from 'react-icons/fi'

export default function ConfirmDialog({ open, onClose, onConfirm, title='Confirm Delete', message='Are you sure? This action cannot be undone.' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
          <FiAlertTriangle size={26} className="text-red-500" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{message}</p>
        <div className="flex gap-3 w-full pt-2">
          <button onClick={onClose} className="btn-adm-secondary flex-1">Cancel</button>
          <button onClick={() => { onConfirm(); onClose() }} className="flex-1 btn bg-red-500 text-white hover:bg-red-600">Delete</button>
        </div>
      </div>
    </Modal>
  )
}
