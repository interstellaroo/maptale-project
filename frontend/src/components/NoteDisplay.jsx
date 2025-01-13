import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import TextEditor from './TextEditor'

const NoteDisplay = ({ note }) => {
  const [currentNote, setCurrentNote] = useState(note)

  return (
    <Box>
      <Box>
        <Typography>{note.name}</Typography>
      </Box>
      <TextEditor text={note.text}/>
    </Box>
  )
}

export default NoteDisplay
