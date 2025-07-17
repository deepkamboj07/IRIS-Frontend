import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Helmet from 'react-helmet'
import { routes } from './Routes'
function App() {

  const router = createBrowserRouter(routes)
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>GlobeStar | Assignment </title>
        <link rel="canonical" href="" />
        <meta name="description" content="GlobeStar Assignment" />
      </Helmet>
      <RouterProvider router={router} />
    </>
  )
}

export default App
