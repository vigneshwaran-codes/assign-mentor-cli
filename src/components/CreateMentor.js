import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AssignMentorsContext } from '../Context/AssignMentor'

function CreateMentor () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [mentors, setMentors] = useContext(AssignMentorsContext)

  const addMentor = (e) => {
   e.preventDefault();
    const posted_mentor = axios.post('https://assign-mentors-portal.herokuapp.com/mentors',
    {
      name,
      email,
      course
    })
    setMentors([...mentors, posted_mentor.data])
    setName('')
    setEmail('')
    setCourse('')
  }
  return (
    <>
    <form onSubmit={addMentor}>
        <h1>Created Mentor !</h1>
        <div className='col-md-6'>
          <label htmlFor='name' className='form-label'>Mentor Name</label>
          <input
            type='text'
            placeholder='Enter name'
            value={name}
            className='form-control'
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className='col-md-6'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            className='form-control'
            placeholder='Enter email' required
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className='col-md-6'>
          <label htmlFor='course' className='form-label'>Course</label>
          <input
            type='text'
            name='Course'
            placeholder='Enter Course'
            value={course}
            className='form-control'
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <br />
          <button type='submit' className='btn btn-primary mb-3'>Create</button>
        </div>
      </form>
    </>
  )
}

export default CreateMentor
