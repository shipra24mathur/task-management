import Image from "next/image";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();
  return (
    <main className="max-w-4xl   container mx-auto">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mt-6 text-blue-500">Todo list App</h1>
        <AddTask />
      </div>
      <ToDoList tasks={tasks} />
    </main>
  );
}
