import { CourseLectures } from "./models/course";

const defaultLectures = {
  1: [
    { name: "Introduction to Python", time: 45, isViewed: false },
    { name: "Python Data Types", time: 50, isViewed: false },
    { name: "Control Flow in Python", time: 60, isViewed: false },
    { name: "Functions and Modules", time: 55, isViewed: false },
    { name: "Object-Oriented Programming", time: 65, isViewed: false }
  ],
  2: [
    { name: "Advanced JavaScript Concepts", time: 40, isViewed: false },
    { name: "Asynchronous JavaScript", time: 60, isViewed: false },
    { name: "JavaScript Design Patterns", time: 70, isViewed: false },
    { name: "Performance Optimization", time: 55, isViewed: false },
    { name: "Testing and Debugging", time: 50, isViewed: false }
  ],
  3: [
    { name: "Introduction to TensorFlow", time: 45, isViewed: false },
    { name: "Building Neural Networks", time: 75, isViewed: false },
    { name: "Convolutional Neural Networks", time: 80, isViewed: false },
    { name: "Recurrent Neural Networks", time: 70, isViewed: false },
    { name: "Model Deployment with TensorFlow", time: 90, isViewed: false }
  ],
  4: [
    { name: "Introduction to Data Science with R", time: 50, isViewed: false },
    { name: "Data Wrangling in R", time: 65, isViewed: false },
    { name: "Data Visualization with ggplot2", time: 70, isViewed: false },
    { name: "Statistical Modeling in R", time: 85, isViewed: false },
    { name: "Machine Learning with R", time: 75, isViewed: false }
  ]
}

let lectures: CourseLectures = {}

const loadLectures = () => {
  if(!localStorage.getItem('lectures')) {
    localStorage.setItem('lectures', JSON.stringify(defaultLectures))
  } else {
    lectures = JSON.parse(localStorage.getItem('lectures')!);
  }
}

export const getLectures = () => {
  loadLectures();
  return lectures;
}

export const getLectureById = (id: number) => {
  loadLectures();
  return lectures[id]
}

export const setIsViwed = (id: number, name: string) => {
  const lecture = lectures[id].find(i => i.name == name);
  if(lecture) lecture.isViewed = true;
}

export const saveLectures = () => {
  localStorage.setItem('lectures', JSON.stringify(lectures))
}