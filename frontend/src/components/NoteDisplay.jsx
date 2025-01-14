import { Box, Typography, Fab } from '@mui/material'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import TextEditor from './TextEditor'
import axios from 'axios'

const NoteDisplay = ({ note, refetch}) => {
  const [currentNote, setCurrentNote] = useState(note)

  const handleSave = async () => {
    try {
      console.log('Saving note:', currentNote)
      await axios.put(`http://127.0.0.1:8000/api/item/note/${currentNote.id}`, {
        id: currentNote.id,
        name: currentNote.name,
        text: currentNote.text,
        node: currentNote.node
      })
      refetch()
    } catch (error) {
      console.error('Failed to save the note:', error.message)
    }
  }

  const handleTextChange = (updatedText) => {
    setCurrentNote((prevNote) => ({ ...prevNote, text: updatedText }))
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box>
        <Typography variant='h5'>{currentNote.name}</Typography>
      </Box>
      <Box sx={{ marginTop: 5, maxWidth: '100%', overflow: 'auto'}}>
        <TextEditor text={currentNote.text} onChange={handleTextChange} />
      </Box>
      <Fab
        color="primary"
        aria-label="save"
        onClick={handleSave}
        sx={{ 
          position: 'absolute', 
          top: 5, 
          right: 16,
          backgroundColor: '#3c493f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#8fd1b0',
          },
        }}
      >
        <SaveIcon />
      </Fab>
    </Box>
  )
}

export default NoteDisplay
