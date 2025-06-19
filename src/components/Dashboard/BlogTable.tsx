/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteBlog } from "../../hooks/blog.hook";
import Link from "next/link";

interface BlogTableProps {
  blogs: any[];
  setBlogs: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
}

const BlogTable = ({ blogs, setBlogs, isLoading }: BlogTableProps) => {
  const { mutate: deleteBlog } = useDeleteBlog();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        setDeletingId(id);
        await deleteBlog(id);
        toast.success("Blog deleted successfully!");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error) {
        toast.error("Failed to delete the blog.");
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
              Title
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Content
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Author
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
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr
                key={blog._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <img
                    alt={`Blog - ${blog.title}`}
                    className="w-16 h-16 object-cover rounded-md"
                    src={blog.coverImage || "/placeholder.png"}
                  />
                </td>
                <td className="py-3 px-4">{blog.title}</td>
                <td className="py-3 px-4">{blog.content}</td>
                <td className="py-3 px-4">{blog.author}</td>

                <td className="py-3 px-4 flex space-x-2 mt-4">
                  <Link href={`/dashboard/blogs/${blog._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === blog._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === blog._id}
                    onClick={() => handleDelete(blog._id)}
                  >
                    {deletingId === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No blogs found. Add some!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
