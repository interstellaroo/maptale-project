import { RichTreeView } from '@mui/x-tree-view'

const ProjectTreeView = ({ project }) => {
    function getItemLabel(item) {
        return item.name;
      }

    return (
        <RichTreeView 
            items={project.children}
            getItemLabel={getItemLabel}
        />
    )
}

export default ProjectTreeView;