import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { getList, changeList } from './actions/lists';
import { setActiveItem, clearActive} from './actions/active';
import { handleFinish } from "./actions/drag"
import PropTypes from 'prop-types';
import ListInfo from './lists/listInfo';
import List from './lists/list';
import Panel from './panel/panel';
import Filter from './panel/filter';
class App extends Component {

    componentDidMount() {
        this.handleUpdate = this.handleUpdate.bind(this);
        this.props.getList();
        //console.log(this.props);
    }
    handleUpdate(item, layers) {
        this.props.changeList(item, layers);
        this.props.handleFinish();
        //console.log("UPDATE");
        //this.props.clearActive();
    }
  render() {
        //console.log("render App");
    return (
      <div className="container">
        <ListInfo name="unchecked"
                  handleUpdate={this.handleUpdate}
                  //list={ this.props.list }
                >
          <Panel>
            <Filter
              type="S"
              value="name"
            />
          </Panel>
          <List/>
        </ListInfo>
        <div className="info">
          {/* this.props.active !== null ? this.props.active.name : ""*/}
        </div>
        <ListInfo name="checked"
                  handleUpdate={this.handleUpdate}
                  //list={ this.props.list }
                    >
          <Panel>
            <Filter
              type="L"
              value={ ["flower","heart","sun", "flash" ]}
             />
          </Panel>
          <List/>
        </ListInfo>
      </div >
    );
  }
}

export default connect(
  (state) => {
      return {
          list: state.list,
          finish: state.dragFinish
          //active: state.active
      }
  },
    {
        changeList,
        handleFinish,
        getList,
        clearActive
    }
)(App);
