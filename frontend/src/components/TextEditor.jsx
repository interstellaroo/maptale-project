import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { Paper, ButtonGroup, Button } from '@mui/material'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const extensions = [
  StarterKit,
  TextStyle,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
]

const TextEditor = ({ text, onChange }) => {
  const editor = useEditor({
    extensions,
    content: text || "Note text",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) {
    return null
  }

  return (
    <Paper sx={{ p: 2, overflow: 'auto', minHeight: '200px' }}>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <ButtonGroup variant="contained" size="small">
            <Button color='inherit' onClick={() => editor.chain().focus().toggleBold().run()}><FormatBoldIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalicIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().toggleUnderline().run()}><FormatUnderlinedIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().setTextAlign('left').run()}><FormatAlignLeftIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().setTextAlign('center').run()}><FormatAlignCenterIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().setTextAlign('right').run()}><FormatAlignRightIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulletedIcon /></Button>
            <Button color='inherit' onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumberedIcon /></Button>
          </ButtonGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} 
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word', 
        }}
      />
    </Paper>
  )
}

export default TextEditor