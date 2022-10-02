import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const AssignMentorsContext = React.createContext()

export const AssignMentorProvider = ({ children }) => {
  const [students, setStudents] = useState([])
  const [mentors, setMentors] = useState([])
  const BaseURL = `https://assign-mentors-portal.herokuapp.com`

  const fetchData = async () => {
    await axios
      .get(`${BaseURL}/mentors`)
      .then((response) => setMentors(response.data))
      .then(() => console.log(mentors))

    await axios
      .get(`${BaseURL}/students`)
      .then((response) => setStudents(response.data))
      .then(() => console.log(students))
  }

  useEffect(() => {
      fetchData()
      return () => {
        <></>
      }
  }, [])

  return (
    <>
      {console.log(mentors, students)}
      <AssignMentorsContext.Provider
        value={[
          mentors,
          setMentors,
          students,
          setStudents
        ]}
      >
        {children}
      </AssignMentorsContext.Provider>
    </>
  )
}
