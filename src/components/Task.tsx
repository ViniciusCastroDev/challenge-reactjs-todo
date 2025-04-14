import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

export interface TaskType {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: TaskType;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleCompleteTask() {
    onCompleteTask(task.id);
  }

  return (
    <div
      className={
        task.isCompleted == false ? styles.content : styles.contentChecked
      }
    >
      <button
        onClick={handleCompleteTask}
        className={task.isCompleted == false ? styles.circle : styles.checked}
      >
        {task.isCompleted == false ? (
          <Circle size={20} />
        ) : (
          <CheckCircle size={20} weight="fill" />
        )}
      </button>
      <p>{task.content}</p>
      <button className={styles.trash} onClick={handleDeleteTask}>
        <Trash size={15} />
      </button>
    </div>
  );
}
