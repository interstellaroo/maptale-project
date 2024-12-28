import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import Page404 from './pages/Page404'
import ProjectPage from './pages/ProjectPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'

const App = () => {
  return (
    <>
        <MainLayout>
          <Routes>
            <Route path='/' element={ <HomePage />} />
            <Route path='/project' element={ <ProjectPage />} />
            <Route path='/project/:id' element={ <ProjectDetailsPage />} />
            <Route path='*' element={ <Page404 />} />
          </Routes>
        </MainLayout>
    </>
  )
}

export default App
