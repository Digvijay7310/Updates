import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
       
      <AppRoutes />
       <ToastContainer position="bottom-left"  autoClose={3000} />
    </>
  )
}

export default App
