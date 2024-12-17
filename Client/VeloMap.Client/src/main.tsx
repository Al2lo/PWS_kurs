import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <App />
  <ToastContainer position='bottom-left' autoClose={2000}/>
</Provider>
)
