
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { createHashRouter,RouterProvider } from 'react-router';
import './assets/all.scss'
import {store} from './store.js'
import routes from './routes/index.jsx';
import { Provider } from 'react-redux'
import Toast from './components/Toast.jsx';
const router = createHashRouter(routes)
createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <Toast/>
    <RouterProvider router={router}/>
  </Provider>
)
