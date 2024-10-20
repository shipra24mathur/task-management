"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "@/api";

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.title);
  const [descToEdit, setDescToEdit] = useState<string>(task.desc);

  const [priorityToEdit, setPriorityToEdit] = useState<string>(task.priority);

  const handleChange = (e) => {
    setPriorityToEdit(e.target.value);
  };

  const handleEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editToDo({
      id: task.id,
      title: taskToEdit,
      desc: descToEdit,
      priority: priorityToEdit,
      status: true,
    });
    setTaskToEdit("");
    setDescToEdit("");
    setPriorityToEdit("");

    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteToDo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>{task.title}</td>
      <td>{task.desc}</td>
      <td>
        {task.priority == "1"
          ? "Low"
          : task.priority == "2"
          ? "Medium"
          : "High"}
      </td>
      <td>
        {task.status ? (
          <input
            title="Completed"
            type="checkbox"
            className="toggle"
            defaultChecked
          />
        ) : (
          <input type="checkbox" title="Pending" className="toggle" />
        )}
      </td>
      <td className="flex gap-2">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={18}
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEditToDo}>
            <h3 className="font-bold text-lg text-blue-500">Edit task</h3>
            <div className="modal-action ">
              <label className="label cursor-pointer flex-col w-full items-start ml-2 gap-1.5">
                Title
                <input
                  className="input input-bordered w-full "
                  placeholder="Title"
                  type="text"
                  required
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                />
              </label>
              <label className="label cursor-pointer flex-col w-full items-start ml-2 gap-1.5">
                Description
                <textarea
                  required
                  placeholder="Description"
                  className="input input-bordered w-full "
                  value={descToEdit}
                  onChange={(e) => setDescToEdit(e.target.value)}
                />
              </label>
              <div className="w-full  mt-2 items-center ml-2 flex  flex-wrap">
                <div className="w-full flex-1 basis-full text-left">
                  Priority
                </div>
                <label className="label cursor-pointer flex flex-row items-center gap-3 basis-2/12">
                  <span className="label-text">Low</span>
                  <input
                    type="radio"
                    name="priority"
                    className="radio input"
                    defaultChecked
                    // value={priorityToEdit}
                    value="1"
                    checked={priorityToEdit == "1"}
                    onChange={handleChange}
                  />
                </label>
                <label className="label cursor-pointer flex flex-row items-center gap-3 basis-2/12">
                  <span className="label-text">Medium</span>{" "}
                  <input
                    type="radio"
                    // value={priorityToEdit}
                    name="priority"
                    className="radio input"
                    value="2"
                    checked={priorityToEdit == "2"}
                    onChange={handleChange}
                  />
                </label>
                <label className="label cursor-pointer flex flex-row items-center gap-3 basis-2/12">
                  <span className="label-text">High</span>
                  <input
                    type="radio"
                    // value={priorityToEdit}
                    name="priority"
                    value="3"
                    className="radio input"
                    checked={priorityToEdit == "3"}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit" className="btn bg-blue-500 text-white mt-4">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          cursor="pointer"
          className="text-red-500"
          size={18}
          onClick={() => setOpenModalDelete(true)}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              className="btn bg-blue-500 text-white mt-4 "
              onClick={() => handleDeleteTask(task.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
