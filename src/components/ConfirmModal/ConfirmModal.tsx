import React from 'react';
import { X } from 'lucide-react';
import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <h2 className={styles.title}>{title}</h2>
        
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.confirm}`} onClick={handleConfirm}>
            Удалить
          </button>
          <button className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;