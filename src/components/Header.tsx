import styles from "./Header.module.css";
import challengeLogo from "../assets/logo-challenge-todo.svg";
import { PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface HeaderProps {
  onAddNewTask: (tasks: string) => void;
}
export function Header({ onAddNewTask }: HeaderProps) {
  const [newTask, setNewTask] = useState("");

  function handleNewTask(event: FormEvent) {
    event.preventDefault();

    const trimmedTask = newTask.trim();
    if (trimmedTask === "") return;
    onAddNewTask(trimmedTask);
    setNewTask("");
  }
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }
  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigátório!");
  }

  const isNewTaskEmpty = newTask.length === 0;
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src={challengeLogo}
        alt="Logo desafio Rocketseat To-do"
      />
      <form onSubmit={handleNewTask} className={styles.headerInput}>
        <input
          placeholder="Adicione uma tarefa"
          name="task"
          onChange={handleNewTaskChange}
          onInvalid={handleTaskInvalid}
          value={newTask}
        />
        <button
          type="submit"
          className={styles.buttonCreate}
          disabled={isNewTaskEmpty}
        >
          <p>Criar</p>
          <PlusCircle weight={"bold"} size={16} />
        </button>
      </form>
    </div>
  );
}
