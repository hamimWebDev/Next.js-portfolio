"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { useGetSingleWork, useUpdateWork } from "../../../../../hooks/work.hook"
import Loading from "../../../../../components/Loading"
import PHInput from "../../../../../components/form/PHInput"
import PHForm from "../../../../../components/form/PHForm"
import PHTextarea from "../../../../../components/form/PHTextArea"
import { workValidationSchema } from "../../../../../schema/journey.validation.schema"
import { X } from "lucide-react"

interface Params {
  id: string
}

interface FormData {
  category: string
  title: string
  frontend?: string
  backend?: string
  liveLink: string
  description: string
}

export default function UpdateWorkPage({ params }: { params: Params }) {
  const { id } = params
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [technology, setTechnology] = useState<string>("")
  const [technologies, setTechnologies] = useState<string[]>([]) 

  // Fetch single work data
  const { data: singleWork, isPending: isFetchingWork, isSuccess: isWorkLoaded } = useGetSingleWork(id)
console.log("singleWork", singleWork)
  // Update work mutation
  const {
    mutate: handleUpdateWork,
    isPending: isUpdating,
    isSuccess: isUpdateSuccess,
    data: updateResponse,
  } = useUpdateWork()

  useEffect(() => {
    // Initialize technologies array when work data is loaded
    if (isWorkLoaded && singleWork?.data?.technologies) {
      setTechnologies(singleWork.data.technologies)
    }
  }, [isWorkLoaded, singleWork])

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

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (technologies.length === 0) {
      toast.error("Please add at least one technology")
      return
    }

    const formDataObj = new FormData()
    if (imageFile) {
      formDataObj.append("file", imageFile)
    }

    const workData :any = {
      category: formData.category,
      title: formData.title,
      liveLink: formData.liveLink,
      description: formData.description,
      technologies: technologies,
    }

    // Only add optional fields if they have values
    if (formData.frontend) workData.frontend = formData.frontend
    if (formData.backend) workData.backend = formData.backend

    formDataObj.append("data", JSON.stringify(workData))

    handleUpdateWork({ id, workData: formDataObj })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (updateResponse && !updateResponse.success) {
      toast.error(updateResponse.message as string)
    }
    if (isUpdateSuccess && updateResponse?.success) {
      toast.success("Project updated successfully.")
      router.push("/dashboard/work")
    }
  }, [updateResponse, isUpdateSuccess, router])

  if (isFetchingWork) return <Loading />
  if (!isWorkLoaded || !singleWork) return <p className="text-red-500">Failed to load project details.</p>

  return (
    <div className="flex h-[calc(100vh)] mt-7 flex-col items-center justify-center p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">Update Project</h3>
      <hr className="border w-full mb-3" />
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <PHForm resolver={zodResolver(workValidationSchema)} onSubmit={onSubmit} defaultValues={singleWork?.data || {}}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <PHInput label="Category" name="category" size="sm" />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <PHInput label="Title" name="title" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <div>
              <label htmlFor="frontend" className="block text-sm font-medium text-gray-700">
                Frontend (Optional)
              </label>
              <PHInput label="Frontend" name="frontend" size="sm" />
            </div>
            <div>
              <label htmlFor="backend" className="block text-sm font-medium text-gray-700">
                Backend (Optional)
              </label>
              <PHInput label="Backend" name="backend" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div>
              <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700">
                Live Link
              </label>
              <PHInput label="Live Link" name="liveLink" size="sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <PHTextarea label="Description" name="description" size="sm" />
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
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
              Change Project Image
            </label>
            <input
              className="mt-2 block w-full rounded border-gray-300 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <Button
            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700"
            isLoading={isUpdating}
            size="lg"
            type="submit"
          >
            {isUpdating ? "Updating..." : "Update Project"}
          </Button>
        </PHForm>
      </div>
    </div>
  )
}
