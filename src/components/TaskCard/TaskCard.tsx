import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Task, Status } from '../../types/Task';
import { getPriorityText, getStatusText } from '../../utils/translations';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Status) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleStatusClick = () => {
    const statusOrder = [Status.TODO, Status.IN_PROGRESS, Status.DONE];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.infoGroup}>
        <span className={styles.label}>Задача</span>
        <h3 className={styles.taskTitle}>{task.title}</h3>
      </div>
      
      <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Приоритет</span>
            <span className={`${styles.priority} ${styles[task.priority]}`}>
              {getPriorityText(task.priority)}
            </span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.label}>Статус</span>
            <span className={`${styles.status} ${styles[task.status]}`}>
              {getStatusText(task.status)}
            </span>
          </div>
        </div>
        
        <button 
          className={`${styles.progressCircle} ${styles[task.status]}`}
          onClick={handleStatusClick}
          title="Изменить статус"
        >
        </button>
        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.edit}`}
            onClick={() => onEdit(task)}
            title="Редактировать задачу"
          >
            <Edit size={16} />
          </button>
          <button 
            className={`${styles.actionButton} ${styles.delete}`}
            onClick={() => onDelete(task.id)}
            title="Удалить задачу"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;