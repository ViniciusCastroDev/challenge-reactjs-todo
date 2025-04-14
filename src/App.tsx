import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import { ClipboardText } from "@phosphor-icons/react";
import { Task, TaskType } from "./components/Task";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export function App() {
  const [tasks, setNewTasks] = useState<TaskType[]>([]);

  function addNewTask(content: string) {
    const newTask: TaskType = {
      id: uuidv4(),
      content: content,
      isCompleted: false,
    };

    setNewTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function deleteTask(id: string) {
    const tasksToDelete = tasks.filter((task) => {
      return task.id !== id;
    });
    setNewTasks(tasksToDelete);
  }

  function completeTask(id: string) {
    const tasksCompleted = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setNewTasks(tasksCompleted);
  }
  const totalTask = tasks.length;
  const sumTasks = tasks.reduce((accumulator, task) => {
    return task.isCompleted ? accumulator + 1 : accumulator;
  }, 0);

  return (
    <div className={styles.wrapperMain}>
      <Header onAddNewTask={addNewTask} />
      <main className={styles.wrapperContent}>
        <div className={styles.contentHeader}>
          <div className={styles.taskCreated}>
            <p>Tarefas criadas</p>
            <span>{totalTask}</span>
          </div>
          <div className={styles.taskCompleted}>
            <p>Tarefas concluidas</p>
            <span>
              {sumTasks} de {totalTask}
            </span>
          </div>
        </div>
        <div
          className={
            tasks.length > 0 ? styles.content : styles.contentWithoutTask
          }
        >
          <ClipboardText size={56} />
          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
        {tasks.map((task) => {
          return (
            <Task
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
              key={task.id}
              task={task}
            />
          );
        })}
      </main>
    </div>
  );
}
