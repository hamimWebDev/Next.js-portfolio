"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaCogs, // Icon for Skills
  FaGraduationCap, // Icon for Education
  FaBriefcase, // Icon for Work Experience
  FaChartLine,
  FaFileAlt,
  FaCode, // Icon for Dashboard
} from "react-icons/fa"; // Importing from Font Awesome

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen mt-3">
      {/* Side Navigation Bar */}
      <aside
        className={`fixed inset-y-0  z-50 left-0 border-r bg-white dark:bg-black shadow-lg w-64 lg:w-72 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between p-6 lg:p-8">
         
          {/* Navigation Links */}
          <nav className="space-y-8 lg:space-y-12">
            <Link href="/">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaHome className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Home</span>
              </p>
            </Link>
            <hr />
            {/* Dashboard */}
            <Link href="/dashboard">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaChartLine className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Dashboard</span>
              </p>
            </Link>
            <hr />
            {/* New Links */}
            {/* Skills */}
            <Link href="/dashboard/skills">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaCogs className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Skills</span>
              </p>
            </Link>
            <hr />
            {/* Education */}
            <Link href="/dashboard/education">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaGraduationCap className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Education</span>
              </p>
            </Link>
            <hr />
            {/* Blog */}
            <Link href="/dashboard/blogs">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaFileAlt className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Blogs</span>
              </p>
            </Link>
            <hr />
            {/* Work Experience */}
            <Link href="/dashboard/experience">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaBriefcase className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Work Experience</span>
              </p>
            </Link>
            <hr />
            {/* Work Experience */}
            <Link href="/dashboard/work">
              <p className="flex mt-3 items-center hover:text-blue-500 transition-all duration-200 text-lg lg:text-xl">
                <FaCode className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="ml-3 hidden lg:block">Work</span>
              </p>
            </Link>
          </nav>
        </div>

        {/* Close Button on Mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden z-50"
          onClick={toggleSidebar}
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="w-full lg:ml-72">
        {/* Header on Mobile */}
        <header className="lg:hidden flex justify-between items-center bg-white dark:bg-black p-4 shadow-md">
          <h1 className="text-2xl font-bold text-blue-500">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaBars className="h-6 w-6 text-blue-500" />
          </button>
        </header>

        {/* Main Content Section */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>

      {/* Overlay when Sidebar is open (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboardLayout;
