'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// import { ClearTasksModalProps } from '../utils/Types';
import { EditTaskModalProps } from '../utils/Types';
import { TaskType } from '../utils/Types';
import { getPriorityColor } from '../utils/utils';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function EditTaskModal({
  id,
  isOpen,
  onClose,
  openEditModal,
}: EditTaskModalProps) {
  const [task, setTask] = useState<TaskType>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
    setDescription('');
    setDueDate('');
    setPriority('');
  };

  useEffect(() => {
    if (id) {
      const url = `http://localhost:8000/api/tasks/${id}`;
      axios
        .get(url)
        .then((response) => {
          setTask(response.data.task);
        })
        .catch((error) => {
          console.error('Error fetching task:', error);
        });
    }
  }, [id]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Task
                  </DialogTitle>
                  { task ? <form
                    id="create-task"
                    className="rounded-xl bg-[#FDFBFB] px-4 py-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <input
                        name="title"
                        className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
                        type="text"
                        value={task.name}
                        placeholder="Task Title"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        name="description"
                        type="text"
                        className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
                        value={task.description}
                        placeholder="Task Description (optional)"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex relative w-full  bg-[#FDFBFB] border-b-2 border-b-stone-500 outline-none font-light ">
                        <label
                          className={`absolute h-full "w-3/4" text-gray-600 ${
                            dueDate
                              ? 'text-xs -top-2 text-gray-600'
                              : 'text-xl max-sm:text-lg opacity-70 bg-[#FDFBFB]'
                          }`}
                        >
                          Due Date
                        </label>
                        <input
                          name="date"
                          type="date"
                          className={`${
                            dueDate
                              ? 'text-xl max-sm:text-lg text-gray-600'
                              : 'text-transparent active:text-transparent'
                          } block w-full h-full outline-none bg-inherit`}
                          value={task.due_date}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <select
                        name="priority"
                        className={`block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg ${getPriorityColor(task.priority)}`}
                        value={task.priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                      >
                        <option value="" className="text-gray-500">
                          Select Priority
                        </option>
                        <option value="Not Important">Not Important</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Very Important">Very Important</option>
                      </select>
                    </div>
                  </form> : null}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
