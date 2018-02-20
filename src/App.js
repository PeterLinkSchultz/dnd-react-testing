import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { setActiveItem } from './actions/active';
import PropTypes from 'prop-types';
import ListInfo from './lists/listInfo';
import List from './lists/list';
import Panel from './panel/panel';
import Filter from './panel/filter';
class App extends Component {
  render() {
    return (
      <div className="container">
        <ListInfo name="U">
          <Panel>
            <Filter
              type="S"
              value="name"
            />
          </Panel>
          <List id="U"/>
        </ListInfo>
        <div className="info">
          { this.props.active !== null ? this.props.active.name : ""}
        </div>
        <ListInfo name="C">
          <Panel>
            <Filter
              type="L"
              value={ ["flower","heart","sun", "flash" ]}
             />
          </Panel>
          <List id="C"/>
        </ListInfo>
      </div >
    );
  }
}

export default connect(
  (state) => {
      return {
        active: state.active
      }
  },
  null
)(App);
