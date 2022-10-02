import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AssignMentorsContext } from '../Context/AssignMentor'
import { v4 as uuidv4 } from 'uuid'

export default function ChangeMentor () {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext)
  const [student, setStudent] = useState('')
  const [mentor, setMentor] = useState('')
  console.log(setMentors)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updated_mentor = await axios.patch(
      `https://assign-mentors-portal.herokuapp.com/students/assign-mentor/${student}`,
      { mentor }
    )
    console.log(updated_mentor)
    const stud_data = await axios.get(
      'https://assign-mentors-portal.herokuapp.com/students'
    )
    setStudents(stud_data.data)
    setStudent('')
    setMentor('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Change Mentor</h1>
        <div className='mb-3 col-md-4'>
          <label className='form-label' htmlFor='course'>Student</label>
          <select
            className='form-control'
            value={student}
            aria-label='default select sample'
            onChange={(e) => setStudent(e.target.value)}
          >
            <option value='' />
            {students.map((student) => {
              return <option key={uuidv4()} value={student._id}>{student.name}</option>
            })}
          </select>
        </div>
        <div className='mb-3 col-md-4'>
          <label className='form-label' htmlFor='course'>
            Mentor
          </label>
          <select
            className='form-control'
            value={mentor}
            onChange={(e) => { setMentor(e.target.value) }}
          >
            <option value='' />
            {mentors.map((mentor) => {
              return <option key={uuidv4()} value={mentor._id}>{mentor.name}</option>
            })}
          </select>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </form>
    </div>
  )
}
