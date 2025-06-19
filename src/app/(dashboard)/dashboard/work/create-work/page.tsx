"use client"

import type React from "react"

import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState, useRef, type FormEvent } from "react"
import { toast } from "sonner"
import { useCreateWork } from "../../../../../hooks/work.hook"
import { X } from "lucide-react"

export default function CreateWorkPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [imageFiles, setImageFiles] = useState<File | null>(null)
  const [technology, setTechnology] = useState<string>("")
  const [technologies, setTechnologies] = useState<string[]>([])
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    frontend: "",
    backend: "",
    liveLink: "",
    description: "",
  })
  const [errors, setErrors] = useState({
    category: "",
    title: "",
    liveLink: "",
    description: "",
  })

  const { mutate: handleCreateWork, isPending, isSuccess, data } = useCreateWork()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      category: "",
      title: "",
      liveLink: "",
      description: "",
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
      isValid = false
    }

    if (!formData.title) {
      newErrors.title = "Title is required"
      isValid = false
    }

    if (!formData.liveLink) {
      newErrors.liveLink = "Live link is required"
      isValid = false
    }  

    if (!formData.description) {
      newErrors.description = "Description is required"
      isValid = false
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
      isValid = false
    } else if (formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")

    if (!validateForm()) {
      toast.error("Please fix the form errors")
     
    }

    if (!imageFiles) {
      toast.error("Please upload a project image")
 
    }

    if (technologies.length === 0) {
      toast.error("Please add at least one technology")
      return
    }

    try {
      // Create the data object that matches the expected schema format
      const workData: any = {
        category: formData.category,
        title: formData.title,
        liveLink: formData.liveLink,
        description: formData.description,
        technologies: technologies,
      }

      // Only add optional fields if they have values
      if (formData.frontend) workData.frontend = formData.frontend
      if (formData.backend) workData.backend = formData.backend

      // Create FormData for submission
      const data = new FormData()
      data.append("file", imageFiles)
      data.append("data", JSON.stringify(workData))

      // Log the data being sent for debugging
      console.log("Submitting data:", workData)

      handleCreateWork(data)
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("There was an error submitting the form. Please check all fields.")
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0]
    setImageFiles(files)
  }

  const handleAddTechnology = () => {
    if (technology.trim() !== "") {
      setTechnologies([...technologies, technology.trim()])
      setTechnology("")
    }
  }

  const handleRemoveTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }

  const handleTechnologyKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTechnology()
    }
  }

  useEffect(() => {
    if (data && !data?.success) {
        toast.error("Faild to create project")
        console.log(data)
    }

    if (isSuccess && data?.success) {
      toast.success("Project created successfully")
      router.push("/dashboard/work")
    }
  }, [data, isSuccess, router])

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl p-8 shadow-lg border">
        <h3 className="mb-2 text-3xl font-extrabold text-center">Create Project</h3>
        <p className="mb-6 text-center">Add a new project to your portfolio</p>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter category"
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter title"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Frontend (Optional)</label>
              <input
                type="text"
                name="frontend"
                value={formData.frontend}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Frontend technologies"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Backend (Optional)</label>
              <input
                type="text"
                name="backend"
                value={formData.backend}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Backend technologies"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Live Link</label>
              <input
                type="text"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com"
              />
              {errors.liveLink && <p className="text-sm text-red-500">{errors.liveLink}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your project (10-500 characters)"
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Technologies</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                onKeyPress={handleTechnologyKeyPress}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add a technology"
              />
              <Button
                type="button"
                onClick={handleAddTechnology}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Add
              </Button>
            </div>

            {technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(index)}
                      className="ml-1 rounded-full text-indigo-600 hover:text-indigo-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {technologies.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">Add at least one technology used in this project</p>
            )}
          </div>

          <div className="mb-6 mt-6">
            <label className="block text-sm font-medium" htmlFor="image">
              Upload Project Image
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input className="hidden" id="image" type="file" onChange={handleImageChange} />
              <label
                htmlFor="image"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
              >
                Choose File
              </label>
              {imageFiles && <span className="text-sm text-gray-700">{imageFiles.name}</span>}
            </div>
          </div>

          <Button
            className="w-full rounded-lg bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </div>
  )
}
