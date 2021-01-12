import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { memo, useContext } from "react";
import { DispatchContext } from './contexts/todos.context';
import EditTodoForm from "./EditTodoForm";
import useToggleState from "./hooks/useToggleState";

function Todo({ id, task, completed}) {
  const [isEditing, toggle] = useToggleState(false);
  const  dispatch = useContext(DispatchContext);
  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditTodoForm
          id={id}
          task={task}
          toggleEditForm={toggle}
        />
      ) : (
        <>
          <Checkbox
            tabIndex={-1}
            checked={completed}
            onClick={() => dispatch({ type: "TOGGLE", id: id })}
          />
          <p
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {task}
          </p>
          <ListItemSecondaryAction>
            <IconButton aria-label='Delete' onClick={() => dispatch({ type: "REMOVE", id: id })}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label='Edit' onClick={toggle}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default memo(Todo);
