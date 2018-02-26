import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { getList, changeList, changePosition } from './actions/lists';
import { setActiveItem, clearActive } from './actions/active';
import { handleFinish } from "./actions/drag"
import PropTypes from 'prop-types';
import ListInfo from './lists/block';
import List from './lists/list2';
import Panel from './panel/panel';
import Filter from './panel/filter';
import Sort from './panel/sort';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {

  componentDidMount() {
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdatePosition = this.handleUpdatePosition.bind(this);
    this.props.getList();
    console.log(this.props);
  }
  handleUpdatePosition(item, position, fixed) {
    this.props.changePosition(item, position, fixed);
    this.props.handleFinish();
  }
  handleUpdate(item, position, layers) {
    console.log(this);
    //this.props.changeList(item, position, layers);
    this.props.handleFinish();
    //this.props.clearActive();
  }
  render() {
    return (
      <div className="container">
        <ListInfo name="unchecked"
          handleUpdate={this.props.handleFinish}
          dynamic={false}
        //list={ this.props.list }
        >
          <Panel>
            <Sort
              type="C"
              name="name"
              text="Sort"
              values={["ASC", "DESC"]}
              default="ASC"
              index="1"
            />
            <Filter
              type="S"
              value="name"
            />
          </Panel>
          <List />
        </ListInfo>
        <div className="info">
          {/* this.props.active !== null ? this.props.active.name : ""*/}
        </div>
        <ListInfo name="checked"
          handleUpdate={this.props.handleFinish}
          handleUpdatePosition={this.handleUpdatePosition}
          dynamic={true}
        >
          <Panel>
            <Filter
              type="L"
              name="flags"
              values={["flower", "heart", "sun", "flash"]}
              default={["heart", "sun", "flower"]}
            />
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
      //list: state.list,
      finish: state.dragFinish
      //active: state.active
    }
  },
  {
    changeList,
    changePosition,
    handleFinish,
    getList,
    clearActive
  }
)(App);
