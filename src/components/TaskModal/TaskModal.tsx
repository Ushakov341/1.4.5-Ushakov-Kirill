import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, Priority, TaskFormData } from '../../types/Task';
import { getPriorityText } from '../../utils/translations';
import styles from './TaskModal.module.scss';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  editingTask?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, editingTask }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    priority: Priority.MEDIUM
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        priority: editingTask.priority
      });
    } else {
      setFormData({
        title: '',
        priority: Priority.MEDIUM
      });
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isEditing = !!editingTask;
  const title = isEditing ? 'Редактировать задачу' : 'Добавить задачу';
  const submitText = isEditing ? 'Редактировать' : 'Добавить';

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Задача</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Введите текст.."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              autoFocus
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Приоритет</label>
            <div className={styles.priorityOptions}>
              {Object.values(Priority).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  className={`${styles.priorityButton} ${styles[priority]} ${
                    formData.priority === priority ? styles.selected : ''
                  }`}
                  onClick={() => setFormData({ ...formData, priority })}
                >
                  {getPriorityText(priority)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
              Отмена
            </button>
            <button 
              type="submit" 
              className={`${styles.button} ${styles.submit}`}
              disabled={!formData.title.trim()}
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;