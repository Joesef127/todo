export default function DeleteModal() {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75 px-4 pt-4 pb-4 text-center">
        <div className="inline-block w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="mt-3 text-xl font-bold text-gray-900">
            Are you sure you want to delete this task?
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => {
                // Handle deletion logic here
                console.log('Task deleted');
              }}
            >
              Delete
            </button>
            <button
              className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => {
                // Close modal
                console.log('Modal closed');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
