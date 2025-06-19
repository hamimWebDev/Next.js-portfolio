import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi"
import { Badge } from "../ui/badge";

const WorkItems = ({ category, image, title, frontend, backend, liveLink, description, technologies }) => {
  return (
    <div className="group flex flex-col h-full border border-muted rounded-[30px] p-6 bg-background   transition-colors duration-500">
      <div className="w-full h-[300px] p-8 rounded-[30px] flex items-center justify-center mb-6 relative overflow-hidden bg-[#f4f4f4]">
        <Badge className="bg-primary text-base absolute z-40 top-6 left-6 uppercase">{category}</Badge>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          priority
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500 work-image-scroll"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Link
          href={liveLink}
          className="bg-accent  text-white  rounded-full w-[48px] h-[48px] flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500"
        >
          <FiArrowRight className="text-2xl" />
        </Link>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <Badge key={index} variant="outline" className="bg-background">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex gap-4">
        {frontend && (
          <Link
            href={frontend}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub /> Frontend
          </Link>
        )}

        {backend && (
          <Link
            href={backend}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub /> Backend
          </Link>
        )}

        <Link
          href={liveLink}
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors ml-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiExternalLink /> Live Demo
        </Link>
      </div>
    </div>
  )
}

export default WorkItems
