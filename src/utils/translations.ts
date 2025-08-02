import { Priority, Status } from '../types/Task';

export const priorityTranslations = {
  [Priority.HIGH]: 'Высокий',
  [Priority.MEDIUM]: 'Средний', 
  [Priority.LOW]: 'Низкий'
};

export const statusTranslations = {
  [Status.TODO]: 'К выполнению',
  [Status.IN_PROGRESS]: 'В прогрессе',
  [Status.DONE]: 'Сделано'
};

export const getPriorityText = (priority: Priority): string => {
  return priorityTranslations[priority];
};

export const getStatusText = (status: Status): string => {
  return statusTranslations[status];
};