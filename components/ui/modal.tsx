// /components/ui/modal.tsx

"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-6 sm:p-8 md:p-10 relative">  {/* ✅ Wider modal with padding */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-xl font-bold"
        >
          ✖
        </button>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>  {/* ✅ Scrollable content */}
      </div>
    </div>
  );
};
