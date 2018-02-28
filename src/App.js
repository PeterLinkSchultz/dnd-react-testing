import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './styles/main.css';

import { getList } from './actions/items';
import { handleFinish } from "./actions/drag"
import ListInfo from './items/block';
import List from './items/list';
import Info from './items/info';
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
              default="" />
          </Panel>
          <List />
        </ListInfo>
        <Info
        title="Info"
        name="Name"
          info={['status']}
        />
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
