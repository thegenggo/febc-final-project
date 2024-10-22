import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Course } from "../models/course"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CourseCard from "../components/CourseCard";
import Container from "@mui/material/Container";
import { Icon } from '@iconify/react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const coursesWrapper = useRef<HTMLDivElement>(null)

  const fetchAllCourses = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/courses`)
      .then(response => {
        setCourses(response.data);
        console.log(courses);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }

  const fetchCoursesByCategory = (category: string) => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories/${category}/courses`)
      .then(response => {
        setCourses(response.data);
        console.log(courses);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }

  const fetchAllCategories = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then(response => {
        setCategories(response.data);
        console.log(categories);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if(categoryFilter === 'All') fetchAllCourses();
    else fetchCoursesByCategory(categoryFilter);
  }, [categoryFilter])

  const scrollLeft = (element: HTMLDivElement) => {
    element.scrollLeft -= 100;
  }

  const scrollRight = (element: HTMLDivElement) => {
    element.scrollLeft += 100;
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  }

  return (
    <>
      <Container maxWidth="lg" 
        sx={{
          display: 'block',
          padding: '0px !important'
        }}
      >
        <Box display='flex'
          margin='0px 20px'
          justifyContent='space-between'
        >
          <Typography variant='h3'>
            หลักสูตรทั้งหมด
          </Typography>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value='All'>All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
            {courses
              .map((course) => (
              <CourseCard key={course.id} course={course}/>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage