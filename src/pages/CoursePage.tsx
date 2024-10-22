import { useParams } from "react-router-dom"

function CoursePage() {
    const { id } = useParams();

  return (
    <>
      <div>CoursePage</div>
      <div>{id}</div>
    </>
  )
}

export default CoursePage