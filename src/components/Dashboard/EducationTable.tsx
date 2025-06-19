/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteJourney } from "../../hooks/journey.hook";

interface EducationTableProps {
  educations: any[];
  setEducations: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
}

const EducationTable = ({
  educations,
  setEducations,
  isLoading,
}: EducationTableProps) => {
  const { mutate: deleteEducation } = useDeleteJourney();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education?")) {
      try {
        setDeletingId(id);
        await deleteEducation(id);
        toast.success("Education deleted successfully!");
        setEducations((prevEducations) =>
          prevEducations.filter((education) => education._id !== id)
        );
      } catch (error) {
        toast.error("Failed to delete the education.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Image
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Institution
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Qualification
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Description
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="py-6 text-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500" />
                </div>
              </td>
            </tr>
          ) : educations.length > 0 ? (
            educations.map((education) => (
              <tr
                key={education._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <img
                    alt={`Education at ${education.institution}`}
                    className="w-16 h-16 object-cover rounded-md"
                    src={education?.logoUrl || "/placeholder.png"}
                  />
                </td>
                <td className="py-3 px-4">{education.institution}</td>
                <td className="py-3 px-4">{education.qualification}</td>
                <td className="py-3 px-4">{education.description}</td>
                <td className="py-3 px-4 flex space-x-2 mt-4">
                  <Link href={`/dashboard/education/${education._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === education._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === education._id}
                    onClick={() => handleDelete(education._id)}
                  >
                    {deletingId === education._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No education records found. Add some!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EducationTable;
