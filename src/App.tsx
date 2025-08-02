import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './components/TaskCard/TaskCard';
import TaskModal from './components/TaskModal/TaskModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import { Task, TaskFormData, Status } from './types/Task';
import { initialTasks } from './data/taskList';
import styles from './App.module.scss';

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
    }
  };

  const handleTaskSubmit = (formData: TaskFormData) => {
    if (editingTask) {
      // Редактирование существующей задачи
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: formData.title, priority: formData.priority }
          : task
      ));
    } else {
      // Добавление новой задачи
      const newTask: Task = {
        id: generateId(),
        title: formData.title,
        priority: formData.priority,
        status: Status.TODO
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Список задач</h1>
          <button className={styles.addButton} onClick={handleAddTask}>
            <Plus size={20} />
            Добавить задачу
          </button>
        </div>

        <div className={styles.taskList}>
          {tasks.length === 0 ? (
            <div className={styles.emptyState}>
              Нет задач. Добавьте первую задачу!
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
        />

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmDelete}
          title="Точно удалить задачу?"
        />
      </div>
    </div>
  );
}

export default App;