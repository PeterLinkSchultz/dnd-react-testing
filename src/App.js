import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import logo from './logo.svg';
import './styles/main.css';

import { getList } from './actions/items';
import { handleFinish } from "./actions/drag"
import ListInfo from './lists/block';
import List from './lists/list';
import Panel from './panel/panel';
import Filter from './panel/filter';
import Sort from './panel/sort';

class App extends Component {

  componentDidMount() {
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdatePosition = this.handleUpdatePosition.bind(this);
    this.props.getList();
  }
  handleUpdatePosition(item, position, fixed) {
    this.props.changePosition(item, position, fixed);
    this.props.handleFinish();
  }
  handleUpdate(item, position, layers) {
    this.props.handleFinish();
  }
  render() {
    return (
      <div className="container">
        <ListInfo name="unchecked"
          handleUpdate={this.props.handleFinish}
          dynamic={false}>
          <Panel>
            <Sort
              type="C"
              name="name"
              value="sort"
              text="Sort"
              values={["ASC", "DESC"]}
              default="ASC"
              index="1" />
            <Filter
              type="S"
              name="name"
              text="Name"
              default={false} />
          </Panel>
          <List />
        </ListInfo>
        <div className="info">
          {/* this.props.active !== null ? this.props.active.name : ""*/}
        </div>
        <ListInfo name="checked"
          handleUpdate={this.props.handleFinish}
          handleUpdatePosition={this.handleUpdatePosition}
          dynamic={true}>
          <Panel>
            <Filter
              type="L"
              name="status"
              text="Status"
              values={["flower", "heart", "sun", "flash"]}
              default={["heart"]} />
          </Panel>
          <List />
        </ListInfo>
      </div >
    );
  }
}
App = DragDropContext(HTML5Backend)(App);

export default connect(
  (state) => {
    return {
      finish: state.dragFinish
    }
  },
  {
    handleFinish,
    getList
  }
)(App);
