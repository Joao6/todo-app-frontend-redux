import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription } from "./todoActions";

const TodoForm = props => {
  return (
    <div role="form" className="row todoForm">
      <Grid cols="12 8 10">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Adicione uma tarefa"
            value={props.description}
            onChange={props.changeDescription}
            onKeyUp={props.keyHandler}
          />
        </div>
      </Grid>
      <Grid cols="12 4 2">
        <div className="form-group">
          <IconButton style="primary" icon="plus" onClick={props.handleAdd} />
          <IconButton style="info" icon="search" onClick={props.handleSearch} />
          <IconButton
            style="default"
            icon="close"
            onClick={props.handleClear}
          />
        </div>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  description: state.todo.description
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
