"use client"
import React, { useEffect, useState } from 'react'
import { useGetAllBlog } from '../../hooks/blog.hook';

const page = () => {
  const { data, isPending } = useGetAllBlog();
  const [work, setWork] = useState<any[]>([]);
  useEffect(() => {
    if (data?.data) {
      
      setWork(data?.data);
    }
  }, [data]);
  return (
    <div className='container mx-auto'><h1 className='text-3xl'>
      Blog section is loading</h1></div>
  )
}

export default page