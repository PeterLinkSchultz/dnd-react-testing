import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListInfo from './lists/listInfo';
import List from './lists/list';
import FilterLeft from './lists/filterLeft';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ListInfo name="U">
          <FilterLeft/>
          <List />
        </ListInfo>
        <div className="info">
          Info
        </div>
        <div>
          List
        </div>
      </div >
    );
  }
}

export default App;
