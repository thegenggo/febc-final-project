import { useEffect, useState } from "react"
import axios from "axios"
import { Course } from "../models/course"

function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses`)
      .then(response => {
        setCourses(response.data);
        console.log(courses);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }, []);

  return (
    <div>
      {courses.map((course) => (
        <div>
          <div>{course.id}</div>
          <div>{course.name}</div>
          <div>{course.description}</div>
          <div>{course.category}</div>
        </div>
      ))}
    </div>
  )
}

export default HomePage