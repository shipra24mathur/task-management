"use client";
import React, { useState } from "react";
import { ITask } from "@/types/tasks";
import Task from "./Task";

interface ToDoListProps {
  tasks: ITask[];
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  const [data, setData] = useState<any>(tasks);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  //   const [data, setData] = useState(initialData);

  const sortTable = (column) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    // Toggle sort order onclick of Priority th
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedData);
    console.log(data, "soted");
  };

  return (
    <div className="overflow-x-auto shadow-md">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th
              className="cursor-pointer"
              onClick={() => sortTable("priority")}
            >
              Priority
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task: any) => (
            <Task task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
