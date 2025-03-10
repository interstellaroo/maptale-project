import { Box, CircularProgress, Typography, AppBar, Toolbar, Button, Fab, Backdrop } from '@mui/material'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import ProjectSideBar from '../components/ProjectSidebar'
import { useState } from 'react'
import { useTreeViewApiRef } from '@mui/x-tree-view'
import NoteDisplay from '../components/NoteDisplay'
import MapDisplay from '../components/MapDisplay'
import config from '../config'

const ProjectDetailsPage = () => {
  const { id } = useParams()
  const { data, loading, error, refetch } = useFetch(`${config.apiUrl}/api/project/${id}`)
  const [selectedItem, setSelectedItem] = useState(null)
  const apiRef = useTreeViewApiRef();

  const handleItemChange = (event, itemId) => {
      if (itemId  == null){
          setSelectedItem(null)
      }
      else {
          setSelectedItem(apiRef.current.getItem(itemId))
      }
  }

  const renderContentType = () => {
    if (!selectedItem) return null;

    switch (selectedItem.resourcetype) {
      case 'Note':
        return (
          <Box>
            <NoteDisplay note={selectedItem} refetch={refetch} />
          </Box>
        )
      case 'Map':
        return <MapDisplay mapItem={selectedItem} projectItems={data.children}/>
      case null:
        return
      default:
        return
    }
  };

  if (loading) return (
    <CircularProgress />
  )
  if (error) return (
    <Typography>Error: {error.message}</Typography>
  )

  if (data) return (
      <Box sx={{ display: 'flex'}}>
        <ProjectSideBar 
          project={data} 
          handleItemChange={handleItemChange}
          apiRef={apiRef}
          refetch={refetch}
        />
        <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">
            <Box>
              {renderContentType()}
            </Box>
          </Typography>
        </Box>
      </Box>
      </Box>
  )
  
}

export default ProjectDetailsPage;