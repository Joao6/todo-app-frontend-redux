import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription, search } from "./todoActions";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    //this.keyHandler = this.keyHandler.bind(this);
  }

  componentWillMount() {
    this.props.search();
  }

  render() {
    return (
      <div role="form" className="row todoForm">
        <Grid cols="12 8 10">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Adicione uma tarefa"
              value={this.props.description}
              onChange={this.props.changeDescription}
              onKeyUp={this.props.keyHandler}
            />
          </div>
        </Grid>
        <Grid cols="12 4 2">
          <div className="form-group">
            <IconButton
              style="primary"
              icon="plus"
              onClick={this.props.handleAdd}
            />
            <IconButton
              style="info"
              icon="search"
              onClick={this.props.handleSearch}
            />
            <IconButton
              style="default"
              icon="close"
              onClick={this.props.handleClear}
            />
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  description: state.todo.description
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription, search }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
