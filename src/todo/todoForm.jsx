import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { add, changeDescription, search, clear } from "./todoActions";

class TodoForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.search();
  }

  render() {
    const { add, search, clear, description } = this.props;
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
              onClick={() => add(description)}
            />
            <IconButton style="info" icon="search" onClick={search} />
            <IconButton style="default" icon="close" onClick={() => clear()} />
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
  bindActionCreators({ add, changeDescription, search, clear }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
