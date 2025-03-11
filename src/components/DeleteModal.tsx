"use client";

import { useEffect } from "react";
import { X } from "lucide-react"; // Importing close icon

type ConfirmDeleteProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export default function ConfirmDelete({
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmDeleteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Are you sure you want to delete?
        </h2>

        <div className="flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* OK (Confirm) Button */}
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
