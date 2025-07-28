import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetCourseById, updateCourse ,deleteCourse} from '../../services/Userservice';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    GetCourseById(id).then((res) => setCourse(res.data));
    
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateCourse(id, course);
      console.log(course.title)
      alert("Course updated successfully");
      navigate(`/courses/${id}`);
    } catch (err) {
      alert("Update failed");
    }
  };

  const DeleteCourse= async()=>{
    try{
        await deleteCourse(id);
        alert("Course Deleted Succesfully")
        navigate("/admin-getAllcourses")

    }
    catch(err)
    {
        alert(err);
    }
  }

  return (
    <div className="container mt-4">
      <button
    className="btn btn-primary"
    onClick={() => navigate(-1)}
  >
   Back
  </button>

      <h2>Edit Course</h2>
      <input className="form-control my-2" placeholder="Title" value={course.title}
        onChange={(e) => setCourse({ ...course, title: e.target.value })} />
      <textarea className="form-control my-2" placeholder="Description" value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <input className="form-control my-2" placeholder="Instructor" value={course.instructor}
        onChange={(e) => setCourse({ ...course, instructor: e.target.value })} />
      <input className="form-control my-2" placeholder="Category" value={course.category}
        onChange={(e) => setCourse({ ...course, category: e.target.value })} />
      <input className="form-control my-2" placeholder="Price" value={course.price}
        onChange={(e) => setCourse({ ...course, price: e.target.value })} />

         <input className="form-control my-2" placeholder="Thumbnail" value={course.imageUrl}
        onChange={(e) => setCourse({ ...course, imageUrl: e.target.value })} />
      <button className="btn btn-success" onClick={handleUpdate}>Update Course</button>
      <button className="btn btn-danger" onClick={DeleteCourse}>Delete Course</button>
    </div>
  );
}

export default EditCourse;
