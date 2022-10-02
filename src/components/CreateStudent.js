import React, { useState, useContext } from 'react'
import { AssignMentorsContext } from '../Context/AssignMentor'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

function CreateStudent () {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext)
  console.log(setMentors)
  const [name, setname] = useState('')
  const [batch, setBatch] = useState('')
  const [assignMentor, setAssignMentor] = useState('')

  const addStudent = async (e) => {
    e.preventDefault()
    console.log('AssignsMentor', assignMentor)
    console.log(name, batch, assignMentor)
    const posted_stud = await axios.post(
      'https://assign-mentors-portal.herokuapp.com/students',
      {
        name,
        batch,
        mentor: assignMentor
      }
    )
    setStudents([...students, posted_stud.data])
    setname('')
    setBatch('')
    setAssignMentor('')
  }
  return (
    <>
      <form onSubmit={addStudent}>
        <h1>Create Student !</h1>
        <div className='mb-3 col-md-6'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            placeholder='Enter name'
            className='form-control'
            value={name}
            onChange={(e) => {
              setname(e.target.value)
            }}
            required
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label htmlFor='batch' className='form-label'>
            Batch
          </label>
          <input
            type='text'
            name='batch'
            placeholder='Enter Batch'
            className='form-control'
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value)
            }}
            required
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label htmlFor='course' className='form-label'>
            Mentor
          </label>
          <select
            className='form-control'
            value={assignMentor}
            onChange={(e) => setAssignMentor(e.target.value)}
          >
            <option value='' />
            {mentors.map((mentor) => {
              return <option key={uuidv4()} value={mentor._id}>{mentor.name}</option>
            })}
          </select>
        </div>
        <button
          type='submit'
          className='btn btn-primary mb-3'
        >
          Create
        </button>
      </form>
    </>
  )
}

export default CreateStudent
