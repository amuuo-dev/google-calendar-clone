import type React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
};

export default Modal;
