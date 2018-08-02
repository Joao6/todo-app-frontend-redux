import React from "react";

export default props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-header">
      <a className="navbar-brand" href="#/todos">
        <i className="fa fa-calendar-check-o" /> TodoApp
      </a>
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbar">
      <div className="navbar-nav">
        <a className="nav-item nav-link active" href="#/todos">
          Tarefas
        </a>
        <a className="nav-item nav-link" href="#/about">
          Sobre
        </a>
      </div>
    </div>
  </nav>
);
