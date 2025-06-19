"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { useGetAllBlog } from "../../../../hooks/blog.hook";
import BlogTable from "../../../../components/Dashboard/BlogTable";

const ManageBlog = () => {
  const { data, isPending } = useGetAllBlog();
  const [blog, setBlog] = useState<any[]>([]);
  console.log(blog);

  useEffect(() => {
    if (data?.data) {
      setBlog(data?.data || []);
    }
  }, [data]);
  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Blogs</h3>
      <Link className="flex justify-end" href="/dashboard/blogs/create-blog">
        <Button
          className="mb-4 px-5 font-medium py-2 bg-accent text-primary rounded-full"
          color="success"
        >
          Create Blog
        </Button>
      </Link>
      <BlogTable blogs={blog} isLoading={isPending} setBlogs={setBlog} />
    </div>
  );
};

export default ManageBlog;
