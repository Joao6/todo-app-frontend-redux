import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import IconButton from "../template/iconButton";

import {
  changeDescriptionEdit,
  edit,
  markAsDone,
  markAsPending,
  markForEdit,
  remove
} from "./todoActions";

const TodoList = props => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? "markedAsDone" : ""}>
          {props.todoInEditing._id !== todo._id && todo.description}
          {props.todoInEditing._id === todo._id && (
            <input
              id="input-edit"
              className="form-control"
              type="text"
              onKeyUp={props.keyHandler}
              onChange={props.changeDescriptionEdit}
              value={props.descriptionForEdit}
            />
          )}
        </td>
        <td>
          <IconButton
            style="success"
            icon="thumbs-up"
            hide={todo.done || props.todoInEditing._id === todo._id}
            onClick={() => props.markAsDone(todo)}
          />
          <IconButton
            style="info"
            icon="check"
            hide={props.todoInEditing._id !== todo._id}
            onClick={() =>
              props.edit({ ...todo, description: props.descriptionForEdit })
            }
          />
          <IconButton
            style="default"
            icon="pencil"
            hide={props.todoInEditing._id === todo._id || todo.done}
            onClick={() => props.markForEdit(todo)}
          />
          <IconButton
            style="warning"
            icon="undo"
            hide={!todo.done}
            onClick={() => props.markAsPending(todo)}
          />
          <IconButton
            style="danger"
            icon="trash-o"
            hide={!todo.done}
            onClick={() => props.remove(todo)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th className="tableActions" scope="col">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  list: state.todo.list,
  todoInEditing: state.todo.todoInEditing,
  descriptionForEdit: state.todo.descriptionForEdit
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeDescriptionEdit,
      edit,
      markAsDone,
      markAsPending,
      markForEdit,
      remove
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
