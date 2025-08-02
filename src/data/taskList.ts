import { Task, Priority, Status } from '../types/Task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Выучить React state',
    priority: Priority.HIGH,
    status: Status.TODO
  },
  {
    id: '2', 
    title: 'Читать книгу',
    priority: Priority.LOW,
    status: Status.DONE
  },
  {
    id: '3',
    title: 'Сходить в магазин',
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS
  },
  {
    id: '4',
    title: 'Заплатить за квартиру',
    priority: Priority.HIGH,
    status: Status.DONE
  },
  {
    id: '5',
    title: 'Написать статью',
    priority: Priority.MEDIUM,
    status: Status.IN_PROGRESS
  }
];