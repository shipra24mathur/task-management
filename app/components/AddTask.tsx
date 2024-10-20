"use client";

import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addToDo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [priority, setPriority] = useState<string>("0");

  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmitToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addToDo({
      id: uuidv4(),
      title: newTaskValue,
      desc: newTaskDesc,
      priority: priority,
      status: true,
    });
    setNewTaskValue("");
    setNewTaskDesc("");
    setPriority("");

    router.refresh();
  };

  return (
    <div>
      <button className="btn btn-primary " onClick={() => setModalOpen(true)}>
        Add new task <AiOutlinePlus size={18} className="ml-2" />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitToDo}>
          <h3 className="font-bold text-lg text-blue-500">Add new task</h3>
          <div className="modal-action ">
            <label className="label cursor-pointer flex-col w-full items-start ml-2 gap-1.5">
              Title
              <input
                required
                className="input input-bordered w-full "
                placeholder="Title"
                type="text"
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
              />
            </label>
            <label className="label cursor-pointer flex-col w-full items-start ml-2 gap-1.5">
              Description
              <textarea
                required
                placeholder="Description"
                className="input input-bordered w-full "
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
              />
            </label>
            <div className="w-full mt-2 items-center ml-2 flex  flex-wrap">
              <div className="w-full flex-1 basis-full text-left">Priority</div>
              <label className="label cursor-pointer flex flex-row items-center gap-3   basis-2/12">
                <span className="label-text">Low</span>
                <input
                  type="radio"
                  name="priority"
                  className="radio input"
                  defaultChecked
                  value="1"
                  checked={priority == "1"}
                  onChange={handleChange}
                />
              </label>
              <label className="label cursor-pointer flex flex-row items-center  gap-3 basis-2/12">
                <span className="label-text">Medium</span>{" "}
                <input
                  type="radio"
                  value="2"
                  name="priority"
                  className="radio input"
                  checked={priority == "2"}
                  onChange={handleChange}
                />
              </label>
              <label className="label cursor-pointer flex flex-row items-center  gap-3 basis-2/12">
                <span className="label-text">High</span>
                <input
                  type="radio"
                  value="3"
                  name="priority"
                  className="radio input"
                  checked={priority == "3"}
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
    </div>
  );
};

export default AddTask;
