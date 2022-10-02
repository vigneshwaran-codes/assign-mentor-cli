import React, { useState, useContext } from 'react'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send'
import { AssignMentorsContext } from '../Context/AssignMentor'
import { v4 as uuidv4 } from 'uuid'

function GetStudents () {
  const [mentors, setMentors] = useContext(AssignMentorsContext)
  const [mentor, setMentor] = useState('')
  const [studList, setStudList] = useState([])
  console.log(setMentors)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const student_list = await axios.get(
      `https://assign-mentors-portal.herokuapp.com/students/mentor-students/${mentor}`
    )
    console.log(student_list)
    setStudList(student_list.data)
    setMentor('')
  }

  return (
    <div>
      <h1>Get Students List based on Mentor</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3 mt-3'>
          <label htmlFor='mentor' className='form-label'>Mentor</label>
          <select
            className='form-label'
            value={mentor}
            onChange={(e) => setMentor(e.target.value)}
          >
            <option value='' />
            {mentors.map((mentor) => {
              return <option key={uuidv4()} value={mentor._id}>{mentor.name}</option>
            })}
          </select>
        </div>
        <br />
        <button className='btn btn-success' type='submit'>
          Show <SendIcon />
        </button>
      </form>
      {
        studList.length
          ? (
            <>
              <table className='table table-stripped table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {studList.map((student) => {
                    return (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.batch}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
            )
          : (
              ''
            )
}
    </div>
  )
}

export default GetStudents
