import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PageHeader from "../template/pageHeader";
import TodoForm from "../todo/todoForm";
import TodoList from "../todo/todoList";

import {
  add,
  edit,
  changeDescription,
  clear,
  clearEdit,
  search
} from "../todo/todoActions";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
  }

  keyHandler(e) {
    const {
      add,
      edit,
      clear,
      clearEdit,
      search,
      description,
      todoInEditing,
      descriptionForEdit
    } = this.props;

    if (e.key === "Enter") {
      if (todoInEditing._id) {
        clearEdit();
        edit({ ...todoInEditing, description: descriptionForEdit });
      } else {
        e.shiftKey ? search() : add(description);
      }
    }
    if (e.key === "Escape") {
      if (!todoInEditing._id) {
        clear();
      } else {
        clearEdit();
      }
    }
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm keyHandler={this.keyHandler} />
        <TodoList keyHandler={this.keyHandler} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  description: state.todo.description,
  todoInEditing: state.todo.todoInEditing,
  descriptionForEdit: state.todo.descriptionForEdit
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { add, edit, changeDescription, clear, clearEdit, search },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
