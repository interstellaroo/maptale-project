import { RichTreeView, useTreeViewApiRef } from '@mui/x-tree-view'
import { useState } from 'react';

const ProjectTreeView = ({ project, handleItemChange, apiRef }) => {
    function getItemLabel(item) {
        return item.name;
      }

    return (
        <RichTreeView 
            items={project.children}
            getItemLabel={getItemLabel}
            apiRef={apiRef}
            onSelectedItemsChange={handleItemChange}
        />
    )
}

export default ProjectTreeView;