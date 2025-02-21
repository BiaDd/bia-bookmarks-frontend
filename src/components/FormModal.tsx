'use client'
/**
 * Component properties
 */
interface ModalComponentProps {
  bookmarkInfo: any,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: FormProps) => Promise<void>
}

interface FormProps {
  content_url: string,
  content_title: string,
  content_description: string,
  content_thumbnail_url: string,
}

export default function Modal({ bookmarkInfo, isOpen, onClose, onSubmit }: ModalComponentProps) {
  if (!isOpen) return null; // Don't render the modal if it's closed

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      content_url: bookmarkInfo.contentUrl,
      content_title: bookmarkInfo.title,
      content_description: bookmarkInfo.description,
      content_thumbnail_url: bookmarkInfo.coverUrl ?? ""
    });
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 z-50 max-h-6xl max-w-5xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
        >
          &times;
        </button>
        <div className="flex max-w-[150vh] max-h-[60vh]">
          {bookmarkInfo.coverUrl && (
            <div className="w-1/3 md:w-1/3 h-auto flex justify-center">
              <img
                src={bookmarkInfo.coverUrl}
                alt={bookmarkInfo.title}
                className="max-h-full w-auto h-auto object-cover rounded"
              />
            </div>
          )}
          <div className="w-2/3 md:w-2/3 p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{bookmarkInfo.title}</h2>
            <div className="max-h-60 overflow-y-auto">
              <p className="text-sm mt-2">{bookmarkInfo.description}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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
              Add Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
