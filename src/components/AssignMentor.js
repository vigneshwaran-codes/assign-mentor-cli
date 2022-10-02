import { useState, useEffect, useContext } from 'react'
import MultiSelect from 'multiselect-react-dropdown'
import axios from 'axios'
import { AssignMentorsContext } from '../Context/AssignMentor'
import { v4 as uuidv4 } from 'uuid'

export default function AssignMentor () {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext)
  console.log(setMentors)
  const [mentor, setMentor] = useState('')
  const [options, setOptions] = useState([])
  
  useEffect(() => {
    let arrayval = []
    students.map(
      (student) => 
        (arrayval = [...arrayval, { name: student.name, value: student._id }])
  )
      setOptions(arrayval)
  }, [students])

  let selectedOptions = [],removedOptions = []

  const onSelect = (data) => {
    selectedOptions = data
  }

  const onRemove = (data) => {
    removedOptions = data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let selectedStudents = removedOptions.length
      ? removedOptions
      : selectedOptions

    const stud_list = selectedStudents.map((stud) => {
      return stud.value
    })

    await axios.patch(
      `https://assign-mentors-portal.herokuapp.com/students/assign-mentor-students`,
      { mentor, stud_list }
    )
    const stud_data = await axios.get(
      `https://assign-mentors-portal.herokuapp.com/students`
    )
    setStudents(stud_data.data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3> Assign Students to Mentor</h3>
        <div className='mb-3 mt-3 col-md-4'>
          <label htmlFor='mentor' className='form-label'>
            Mentor
          </label>
          <select
            className='form-control'
            aria-label='Default select example'
            value={mentor}
            onChange={(e) => {
              setMentor(e.target.value)
            }}
          >
            <option value=''></option>
            {mentors.map((mentor) => {
              return <option key={uuidv4()} value={mentor._id}>{mentor.name}</option>
            })}
          </select>
        </div>
        <div className='mb-3 col-md-4'>
          <label htmlFor='students' className='form-label'>
            Students
          </label>
          <div className='chat-container'>
            <MultiSelect
              options={options}
              displayValue='name'
              onSelect={onSelect}
              onRemove={onRemove}
              style={{
                searchBox: {
                  background: '#fafafa'
                }
              }}
            />
          </div>
        </div>
        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </form>
    </div>
  )
}
