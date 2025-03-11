import { DeleteUser } from "@/lib/auth/auth";
import { Fragment, useState } from "react";
interface DeleteModalProps {
  setShowDeleteModal: (showModal: boolean) => void;
  deleteUserId: string;
  fetchData: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setShowDeleteModal,
  deleteUserId,
  fetchData,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await DeleteUser(deleteUserId);
      if (res.code == 200) {
        await fetchData();
        setIsDeleting(false);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  };
  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Delete Developer
          </h2>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete ?
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteModal;
