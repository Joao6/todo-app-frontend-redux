const INITIAL_STATE = {
  description: "",
  list: [],
  todoInEditing: {},
  descriptionForEdit: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DESCRIPTION_CHANGED":
      return { ...state, description: action.payload };
    case "DESCRIPTION_EDIT_CHANGED":
      return { ...state, descriptionForEdit: action.payload };
    case "TODO_SEARCHED":
      return { ...state, list: action.payload };
    case "TODO_CLEAR":
      return { ...state, description: "" };
    case "TODO_CLEAR_EDIT":
      return { ...state, todoInEditing: {}, descriptionForEdit: "" };
    case "MARK_FOR_EDIT":
      return {
        ...state,
        todoInEditing: action.payload,
        descriptionForEdit: action.payload.description
      };
    default:
      return state;
  }
};
