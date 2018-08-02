import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../template/pageHeader";
import TodoForm from "../todo/todoForm";
import TodoList from "../todo/todoList";

const URL = "http://localhost:3003/api/todos";

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      todoInEditing: "",
      descriptionForEdit: "",
      list: []
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleMarkForEdit = this.handleMarkForEdit.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.refresh();
  }

  refresh(description = "") {
    const search = description ? `&description__regex=/${description}/` : "";
    axios
      .get(`${URL}?sort=-createdAt${search}`)
      .then(resp =>
        this.setState({ ...this.state, description, list: resp.data })
      );
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value });
  }

  handleChangeEdit(e) {
    this.setState({ ...this.state, descriptionForEdit: e.target.value });
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description }).then(resp => this.refresh());
  }

  handleRemove(todo) {
    axios
      .delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh(this.state.description));
  }

  handleMarkAsDone(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => this.refresh(this.state.description));
  }

  handleMarkAsPending(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => this.refresh(this.state.description));
  }

  handleMarkForEdit(todo) {
    this.setState({
      ...this.state,
      todoInEditing: todo._id,
      descriptionForEdit: todo.description
    });
  }

  handleSearch() {
    this.refresh(this.state.description);
  }

  handleClear() {
    this.refresh();
  }

  handleEdit() {
    const todo = {
      _id: this.state.todoInEditing,
      description: this.state.descriptionForEdit,
      done: false
    };
    axios.put(`${URL}/${todo._id}`, todo).then(resp => {
      this.refresh(this.state.description);
      this.handleClearEdit();
    });
  }

  handleClearEdit() {
    this.setState({
      ...this.state,
      todoInEditing: "",
      descriptionForEdit: ""
    });
  }

  keyHandler(e) {
    if (e.key === "Enter") {
      if (this.state.todoInEditing !== "") {
        this.handleClearEdit();
        this.handleEdit();
      } else {
        e.shiftKey ? this.handleSearch() : this.handleAdd();
      }
    } else if (e.key === "Escape") {
      if (this.state.todoInEditing === "") {
        this.handleClear();
      } else {
        this.handleClearEdit();
      }
    }
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm
          description={this.state.description}
          handleChange={this.handleChange}
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
          keyHandler={this.keyHandler}
        />
        <TodoList
          list={this.state.list}
          todoInEditing={this.state.todoInEditing}
          keyHandler={this.keyHandler}
          descriptionForEdit={this.state.descriptionForEdit}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
          handleMarkForEdit={this.handleMarkForEdit}
          handleChangeEdit={this.handleChangeEdit}
        />
      </div>
    );
  }
}
