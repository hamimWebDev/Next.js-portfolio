/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteJourney } from "../../hooks/journey.hook";

interface ExperienceTableProps {
  experiences: any;
  setExperiences: React.Dispatch<React.SetStateAction<any[]>>;  
  isLoading: boolean;
}

const ExperienceTable = ({
  experiences,
  setExperiences,
  isLoading,
}: ExperienceTableProps) => {
  const { mutate: deleteProduct } = useDeleteJourney();
  const [deletingId, setDeletingId] = useState<string | null>(null); // Handle deleting state for each recipe

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      try {
        setDeletingId(id);
        await deleteProduct(id);
        toast.success("Experince deleted successfully!");

        setExperiences((prevCategory) =>
          prevCategory.filter((category) => category._id !== id)
        );
      } catch (error) {
        toast.error("Failed to delete the experience.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Image
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Company
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Position
            </th>

            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
                </div>
              </td>
            </tr>
          ) : experiences.length > 0 ? (
            experiences.map((category: any) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  <img
                    alt={category?.name}
                    className="w-16 h-16 object-cover rounded-md"
                    src={category?.logoUrl || "/placeholder.png"}
                  />
                </td>
                <td className="py-2 px-4">{category.company}</td>
                <td className="py-2 px-4">{category?.position}</td>
                <td className="py-2 px-4 mt-3 flex space-x-2">
                  <Link href={`/dashboard/experience/${category?._id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === category._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === category._id}
                    onClick={() => handleDelete(category._id)}
                  >
                    {deletingId === category._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                No experince found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceTable;
