import React from "react";
import { connect } from "react-redux";
import IconButton from "../template/iconButton";

const TodoList = props => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? "markedAsDone" : ""}>
          {props.todoInEditing !== todo._id && todo.description}
          {props.todoInEditing === todo._id && (
            <input
              id="input-edit"
              className="form-control"
              type="text"
              onKeyUp={props.keyHandler}
              onChange={props.handleChangeEdit}
              value={props.descriptionForEdit}
            />
          )}
        </td>
        <td>
          <IconButton
            style="success"
            icon="thumbs-up"
            hide={todo.done || props.todoInEditing === todo._id}
            onClick={() => props.handleMarkAsDone(todo)}
          />
          <IconButton
            style="info"
            icon="check"
            hide={props.todoInEditing !== todo._id}
            onClick={() => props.handleEdit()}
          />
          <IconButton
            style="default"
            icon="pencil"
            hide={props.todoInEditing === todo._id || todo.done}
            onClick={() => props.handleMarkForEdit(todo)}
          />
          <IconButton
            style="warning"
            icon="undo"
            hide={!todo.done}
            onClick={() => props.handleMarkAsPending(todo)}
          />
          <IconButton
            style="danger"
            icon="trash-o"
            hide={!todo.done}
            onClick={() => props.handleRemove(todo)}
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
  list: state.todo.list
});

export default connect(mapStateToProps)(TodoList);
