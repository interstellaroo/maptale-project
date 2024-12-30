import { TreeItem2Checkbox, TreeItem2Content, TreeItem2Icon, TreeItem2IconContainer, TreeItem2Label, TreeItem2Provider, TreeItem2Root, useTreeItem2, TreeItem2DragAndDropOverlay, TreeItem2GroupTransition, RichTreeView } from "@mui/x-tree-view";
import { forwardRef } from "react";

const ProjectTreeView = ({ project, handleItemChange, apiRef}) => {

    const getItemLabel = (item) => item.name;
 
    const CustomTreeItem = forwardRef(function CustomTreeItem(props, ref) {
        const { id, itemId, label, disabled, children, ...other } = props

        const {
            getRootProps,
            getContentProps,
            getIconContainerProps,
            getCheckboxProps,
            getGroupTransitionProps,
            getDragAndDropOverlayProps,
            getLabelProps,
            status,
        } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref})

        return (
            <TreeItem2Provider itemId={itemId}>
                <TreeItem2Root {...getRootProps(other)}>
                    <TreeItem2Content {...getContentProps()}>
                        <TreeItem2IconContainer {...getIconContainerProps()}>
                            <TreeItem2Icon status={status} />
                        </TreeItem2IconContainer>
                        <TreeItem2Checkbox {...getCheckboxProps()} />
                        <TreeItem2Label {...getLabelProps()} />
                        <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
                    </TreeItem2Content>
                    {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
                </TreeItem2Root>
            </TreeItem2Provider>
        )
    })
    // Tree View
    return (
        <RichTreeView
            items={project.children}
            getItemLabel={getItemLabel}
            apiRef={apiRef}
            onSelectedItemsChange={handleItemChange}
            slots={{ items: CustomTreeItem }}
        />

    )
}

export default ProjectTreeView;