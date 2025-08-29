import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  const dummyUser = {
    name: "RAvi",
    avatar: "https://tse1.mm.bing.net/th/id/OIP.DwCotZHIPvGg8mfzqHdwJAHaHa?pid=Api&P=0&h=180"
  }

  return (
    <>
       <Navbar user={dummyUser} />
      <AppRoutes />
       <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
