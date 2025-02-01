'use client'

import { useState } from 'react'

/**
 * Component properties
 */
interface ModalComponentProps {
  modalTitle: string,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: FormProps) => Promise<void>
}

interface FormProps {
  title: string,
  description: string,
  imageUrl: string,
  tags: string[]
}

export default function Modal({ modalTitle, isOpen, onClose, onSubmit }: ModalComponentProps) {
  if (!isOpen) return null; // Don't render the modal if it's closed

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit({ title, description, imageUrl, tags });
    onClose(); // Close the modal after submitting
  };

  // const createTags = (e: any) => {
  //   e.preventDefault();
  // }


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-700">Tags</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => {}}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
