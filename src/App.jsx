
import './App.css'
import Users from './Component/Users'

const userPromise = fetch('https://test-backend-app-fjlv.onrender.com/users')
.then(res => res.json());

function App() {
  

  return (
    <>
      <h2>Simple Crude Operatin</h2>
      <Users userPromise ={userPromise}></Users>
    </>
  )
}

export default App
