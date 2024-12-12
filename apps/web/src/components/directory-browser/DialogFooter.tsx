interface DialogFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DialogFooter({ onCancel, onConfirm }: DialogFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Select
      </button>
    </div>
  );
}
