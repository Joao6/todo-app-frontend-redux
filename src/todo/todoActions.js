import api from "../main/api";

export const changeDescription = event => ({
  type: "DESCRIPTION_CHANGED",
  payload: event.target.value
});

export const changeDescriptionEdit = event => ({
  type: "DESCRIPTION_EDIT_CHANGED",
  payload: event.target.value
});

export const search = () => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    const search = description ? `&description__regex=/${description}/` : "";
    api.getTodos(search)
      .then(resp => dispatch({ type: "TODO_SEARCHED", payload: resp.data }));
  };
};

export const add = description => {
  console.log(description)
  return dispatch => {
    api.createTodos(description)
      .then(resp => dispatch(clear()))
      .then(resp => dispatch(search()));
  };
};

export const edit = todo => {
  return dispatch => {
    api.updateTodos(todo)
      .then(resp => dispatch(clearEdit()))
      .then(resp => dispatch(search()));
  };
};

export const markAsDone = todo => {
  return dispatch => {
    api.updateTodos({ ...todo, done: true })
      .then(resp => dispatch(search()));
  };
};

export const markAsPending = todo => {
  return dispatch => {
    api.updateTodos({ ...todo, done: false })
      .then(resp => dispatch(search()));
  };
};

export const markForEdit = todo => ({
  type: "MARK_FOR_EDIT",
  payload: todo
});

export const remove = todo => {
  return dispatch => {
    api.deleteTodos(todo._id).then(resp => dispatch(search()));
  };
};

export const clear = () => {
  return [
    {
      type: "TODO_CLEAR"
    },
    search()
  ];
};

export const clearEdit = () => {
  return [
    {
      type: "TODO_CLEAR_EDIT"
    },
    search()
  ];
};
