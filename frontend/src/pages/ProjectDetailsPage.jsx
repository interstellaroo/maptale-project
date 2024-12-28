import { CircularProgress, Typography } from '@mui/material'
import useFetch from '../hooks/useFetch'
import ProjectTreeView from '../components/ProjectTreeView'
import { useParams, useNavigate } from 'react-router-dom'

const ProjectDetailsPage = () => {
  const { id } = useParams()
  const { data, loading, error } = useFetch(`http://127.0.0.1:8000/api/project/${id}`)
  

  if (loading) return (
    <CircularProgress />
  )
  if (error) return (
    <Typography>Error: {error.message}</Typography>
  )

  if (data) return (
    <>
      <ProjectTreeView project={data}/>
    </>
  )
  
}

export default ProjectDetailsPage;