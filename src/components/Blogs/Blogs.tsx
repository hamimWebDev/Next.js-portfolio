"use client"

import { useState } from "react"
import { useGetAllBlog } from "../../hooks/blog.hook"
import AnimatedText from "../AnimatedText"
import BlogCard from "../Cards/BlogCard"

const Blogs = () => {
  const { data, isPending } = useGetAllBlog()
  const [visibleCount, setVisibleCount] = useState(6)

  // Get the blogs to show based on the current visibleCount
  const blogsToShow = data?.data.slice(0, visibleCount)

  // Check if there are more blogs to load
  const hasMoreBlogs = data?.data.length > visibleCount

  // Function to handle showing more blogs
  const handleShowMore = () => {
    // Increase the visible count by 3 (or another number that fits your grid)
    setVisibleCount((prevCount) => prevCount + 3)
  }

  return (
    <div className="container mx-auto h-full " id="blog">
      <div className="my-5 pt-20 pb-5 flex justify-center items-center">
        <AnimatedText text="My Latest Blogs" textStyles="h2 mb-2" />
      </div>

      {isPending ? (
        <p>Loading...</p> // Display loading state while fetching data
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsToShow?.map((blog, index) => (
              <BlogCard key={`${blog?._id}-${index}`} blog={blog} />
            ))}
          </div>

          {hasMoreBlogs && (
            <div className="flex justify-center mt-10">

              <button onClick={handleShowMore} className="btn btn-accent">
                Load More
              </button>

            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blogs
