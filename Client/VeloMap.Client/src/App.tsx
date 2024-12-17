import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'
import './styles/HeaderStyles.css'
import { useDispatch } from 'react-redux'
import { AuthService } from './Services/AuthService'
import { logout, updateIsAuth, updateUser } from './store/user/userSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try{
      const data = await AuthService.getProfile();

      if(data)
      {
        dispatch(updateUser(data))
        dispatch(updateIsAuth(true))
      }
      else
      {
        dispatch(logout())
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  },[])

  return (
   <RouterProvider router={router}/>
  )
}

export default App
