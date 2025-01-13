import { useEditor, EditorContent, FloatingMenu, BubbleMenu} from '@tiptap/react'
import { Paper, Box } from '@mui/material'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const TextEditor = ({text}) => {
  const editor = useEditor({
    extensions,
    content: text || "Note text"
  })

  if (!editor) {
    return null
  }

  return (
    <Paper sx={{ p: 2}}>
      <EditorContent editor={editor}/>
      <BubbleMenu editor={editor}>
        <Box>

        </Box>
      </BubbleMenu>
    </Paper>

  )
}

export default TextEditor 