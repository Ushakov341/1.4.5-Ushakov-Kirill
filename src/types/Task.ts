export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum Status {
  TODO = 'todo',
  IN_PROGRESS = 'progress', 
  DONE = 'done'
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
}

export interface TaskFormData {
  title: string;
  priority: Priority;
}