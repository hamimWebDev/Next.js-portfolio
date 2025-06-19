"use client"

import type React from "react"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDeleteWork } from "../../hooks/work.hook"

interface WorkTableProps {
  works: any
  setWorks: React.Dispatch<React.SetStateAction<any[]>>
  isLoading: boolean
}

const WorkTable = ({ works, setWorks, isLoading }: WorkTableProps) => {
  const { mutate: deleteProduct } = useDeleteWork()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        setDeletingId(id)
        await deleteProduct(id)
        toast.success("Project deleted successfully!")

        setWorks((prevWorks) => prevWorks.filter((work) => work._id !== id))
      } catch (error) {
        toast.error("Failed to delete the project!")
      } finally {
        setDeletingId(null)
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Image</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Category</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="py-4 text-center" colSpan={5}>
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
                </div>
              </td>
            </tr>
          ) : works.length > 0 ? (
            works.map((work: any) => (
              <tr key={work._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-4">
                  <img
                    alt={work?.title}
                    className="w-16 h-16 object-cover rounded-md"
                    src={work?.image || "/placeholder.png"}
                  />
                </td>
                <td className="py-2 px-4">{work?.title}</td>
                <td className="py-2 px-4">{work?.category}</td>
                <td className="py-2 px-4">{work?.description}</td>
                <td className="py-2 px-4 mt-3 flex space-x-2">
                  <Link href={`/dashboard/work/${work?._id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Update</button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === work._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={deletingId === work._id}
                    onClick={() => handleDelete(work._id)}
                  >
                    {deletingId === work._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-center" colSpan={5}>
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default WorkTable
