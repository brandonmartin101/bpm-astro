import Markdown from 'react-markdown'

export function MarkDownOutput({ markdown }) {
  return (
    <div>
      <p>Test</p>
      <Markdown>{markdown}</Markdown>
    </div>
  )
}

// import { useState } from 'react'
// import MDEditor from '@uiw/react-md-editor'

// export function MarkdownEditor() {
//   const [value, setValue] = useState(``)
//   return (
//     <div className='container'>
//       <MDEditor value={value} onChange={setValue} />
//       <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
//     </div>
//   )
// }
