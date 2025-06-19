/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteJourney } from "../../hooks/journey.hook";

interface SkillTableProps {
  skills: any;
  setSkills: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
}

const SkillTable = ({
  skills,
  setSkills,
  isLoading,
}: SkillTableProps) => {
  const { mutate: deleteProduct } = useDeleteJourney();
  const [deletingId, setDeletingId] = useState<string | null>(null); // Handle deleting state for each skill

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        setDeletingId(id);
        await deleteProduct(id);
        toast.success("Skill deleted successfully!");

        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill._id !== id)
        );
      } catch (error) {
        toast.error("Failed to delete the skill!");
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
              Icon
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Skill Name
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">
              Description
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
          ) : skills.length > 0 ? (
            skills.map((skill: any) => (
              <tr
                key={skill._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  <img
                    alt={skill?.name}
                    className="w-16 h-16 object-cover rounded-md"
                    src={skill?.icon || "/placeholder.png"} // Assuming iconUrl for the skill icon
                  />
                </td>
                <td className="py-2 px-4">{skill?.name}</td> {/* Skill Name */}
                <td className="py-2 px-4">{skill?.description}</td> {/* Description */}
                <td className="py-2 px-4 mt-3 flex space-x-2">
                  <Link href={`/dashboard/skills/${skill?._id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === skill._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === skill._id}
                    onClick={() => handleDelete(skill._id)}
                  >
                    {deletingId === skill._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-center" colSpan={4}>
                No skills found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
