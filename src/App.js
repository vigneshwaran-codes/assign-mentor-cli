import './App.css'
import { AssignMentorProvider } from './Context/AssignMentor'
import CreateStudent from './components/CreateStudent'
import CreateMentor from './components/CreateMentor'
import AssignMentor from './components/AssignMentor'
import ChangeMentor from './components/ChangeMentor'
import GetStudents from './components/GetStudents'
import StudentList from './components/StudentList'
import MentorList from './components/MentorList'

function App () {
  return (
    <div className='container'>
      <h2 className='title'>Assign Mentor portal</h2>
      <AssignMentorProvider>
        <div className='row'>
          <div className='col-md-5 col-sm-12'>
            <CreateStudent />
            <CreateMentor />
            <AssignMentor />
            <ChangeMentor />
            <GetStudents />
          </div>
          <div className='col-md-7 col-sm-12'>
            <StudentList />
            <MentorList />
          </div>
        </div>
      </AssignMentorProvider>
    </div>
  )
}

export default App
