import { RichTreeView } from '@mui/x-tree-view'
import useFetch from './hooks/useFetch'

function App() {
  const { data, loading, error } = useFetch("http://127.0.0.1:8000/api/project/")

  function getItemLabel(item) {
    return item.name;
  }

  if (loading) return <p>Loading..</p>
  if (error) return <p>{error.message}</p>

  
  console.log(data)
  if (data) return (
    <>
      <h1>AAAAAA</h1>
      {data.map((project) => (
        <div key={project.id} style={{ maxWidth: '300px'}}>
          <h3>{project.name}</h3>
          <p>{project.id}</p>
          <RichTreeView items={project.children} getItemLabel={getItemLabel}/>
        </div>
      ))}
    </>
  )
}

export default App
