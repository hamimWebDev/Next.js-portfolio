"use client"
import { useGetSingleBlog } from "../../../hooks/blog.hook"
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge";  

export interface IBlog {
  title: string
  content: string
  author: string
  tags: string[]
  coverImage: string
  createdAt: Date
  updatedAt: Date
}

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { data, isPending, isError } = useGetSingleBlog(id)
  const blog = data?.data as IBlog | undefined

 
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Error loading blog post</h1>
        <p className="mb-8">We couldn't load the blog post you requested.</p>
        
        
          <button className="btn btn-accent flex items-center justify-center">
          <Link href="/"  className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
            </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-8">
      <button   className="btn btn-accent ">
          <Link href="/" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
            </button>
      </div>

      {isPending ? (
        <p className="text-center">Loadding</p>
      ) : (
        <>
          {/* Blog header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog?.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              {blog?.author && (
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              )}
                {blog?.createdAt && (
                <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                )}

                {blog?.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Updated: {new Date(blog.updatedAt).toLocaleString()}</span>
                </div>
                )}

            </div>

            {/* Tags */}
            {blog?.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className={"rounded-full px-3 py-1"}>
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Cover image */}
          {blog?.coverImage && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={blog.coverImage || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Blog content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {blog?.content && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
          </div>
        </>
      )}
    </div>
  )
} 

export default BlogDetailsPage
