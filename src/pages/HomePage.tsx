import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Course } from "../models/course"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CourseCard from "../components/CourseCard";
import Container from "@mui/material/Container";
import { Icon } from '@iconify/react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const coursesWrapper = useRef<HTMLDivElement>(null)

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

  const scrollLeft = (element: HTMLDivElement) => {
    element.scrollLeft -= 100;
  }

  const scrollRight = (element: HTMLDivElement) => {
    element.scrollLeft += 100;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginY: 'auto' }}>
        <Box
          sx={{
            position: 'relative',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        >
          <Button size='medium'
            sx={{
              justifyContent: 'center',
              display: 'flex',
              position: 'absolute',
              left: 0,
              height: '100%',
              borderWidth: 0,
              minWidth: 0,
              zIndex: 5,
              padding: 0,
            }}
            onClick={() => scrollLeft(coursesWrapper.current!)}>
            <Box component={Icon} icon="dashicons:arrow-left-alt2" sx={{ height: 30, width: 30 }}/>
          </Button>
          <Button size='medium'
            sx={{
              display: 'flex',
              position: 'absolute',
              right: 0,
              height: '100%',
              borderWidth: 0,
              minWidth: 0,
              zIndex: 5,
              padding: 0,
            }}
            onClick={() => scrollRight(coursesWrapper.current!)}>
            <Box component={Icon} icon="dashicons:arrow-right-alt2" sx={{ height: 30, width: 30 }}/>
          </Button>
          <Box
            ref={coursesWrapper}
            sx={{
              display: 'flex',
              overflowX: 'scroll',
              flexWrap: 'nowrap',
              gap: '15px',
              scrollBehavior: 'smooth',
              padding: '27px 8px 42px',
              scrollbarWidth: 'none',
            }}>
            {courses.map((course) => (
              <CourseCard course={course}/>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage