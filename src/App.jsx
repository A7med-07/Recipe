import './App.css'
import SideNav from './Components/Sidenav/SideNav'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Details from './Components/Details/Details'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'




function App() {
 const routers = createBrowserRouter([
    {path: '/', element: <Layout />, children: [
        {index: true, element: <Home />},
        {path: 'details/:id', element: <Details />},
        {path: '*', element: <NotFound />}
      ],
    },
  ])
  return <>

<RouterProvider router={routers}/>

  </>

}

export default App
