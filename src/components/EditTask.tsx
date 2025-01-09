'use client';
import { baseUrl } from '../utils/utils';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { EditTaskModalProps, NewTask } from '../utils/Types';
// import { TaskType } from '../utils/Types';
import { getPriorityColor } from '../utils/utils';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditTaskModal({
  id,
  isOpen,
  onClose,
  editTask,
}: EditTaskModalProps) {
  const [task, setTask] = useState<NewTask | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  useEffect(() => {
    if (id && isOpen) {
      const fetchTaskDetails = async () => {
        try {
          const url = `${baseUrl}api/tasks/${id}`;
          const response = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          });
          const result = response.data.task;

          setTask(result);
          setName(result.name);
          setDescription(result.description);
          setDueDate(result.due_date);
          setPriority(result.priority);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };

      fetchTaskDetails();
    }
  }, [id, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
      const url = `${baseUrl}api/tasks/${id}`;
      const updatedTask: NewTask = {
        name,
        description,
        due_date: dueDate,
        priority,
      };

      const response = await axios.post(url, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const result: NewTask = response.data.task;
      console.log('Task updated successfully:', result);
      setTask(result);
      setName(result.name);
      setDescription(result.description);
      setDueDate(result.due_date);
      setPriority(result.priority);
      editTask(result);

      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

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
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Task
                  </DialogTitle>
                  {task ? (
                    <form
                      id="edit-task-form"
                      className="rounded-xl px-4 py-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <input
                          name="title"
                          className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
                          type="text"
                          value={name}
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
                          value={description}
                          placeholder="Task Description (optional)"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          name="date"
                          type="date"
                          className="block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg text-gray-600"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <select
                          name="priority"
                          className={`block w-full bg-transparent border-b-2 border-b-stone-500 outline-none font-light text-xl max-sm:text-lg ${getPriorityColor(
                            task.priority
                          )}`}
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          required
                        >
                          <option value="" className="text-gray-500">
                            Select Priority
                          </option>
                          <option value="not important">Not Important</option>
                          <option value="moderate">Moderate</option>
                          <option value="very important">Very Important</option>
                        </select>
                      </div>
                      <div className="mt-5 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-black text-white px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto border border-black hover:bg-gray-800 hover:text-white transition ease-in-out duration-300"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
