import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { getList, changeList } from './actions/lists';
import { setActiveItem, clearActive} from './actions/active';
import PropTypes from 'prop-types';
import ListInfo from './lists/listInfo';
import List from './lists/list';
import Panel from './panel/panel';
import Filter from './panel/filter';
class App extends Component {

    componentDidMount() {
        this.handleUpdate = this.handleUpdate.bind(this);
        this.props.getList();
    }
    handleUpdate(item) {
        this.props.changeList(item);
        this.props.clearActive();
    }
  render() {
        console.log(this.props);
    return (
      <div className="container">
        <ListInfo name="unchecked"
                  list={ this.props.list.unchecked !== undefined ? this.props.list.unchecked : [] }>
          <Panel>
            <Filter
              type="S"
              value="name"
            />
          </Panel>
          <List
              handleUpdate={this.handleUpdate}/>
        </ListInfo>
        <div className="info">
          { this.props.active !== null ? this.props.active.name : ""}
        </div>
        <ListInfo name="checked"
                  list={ this.props.list.checked !== undefined ? this.props.list.checked : [] }>
          <Panel>
            <Filter
              type="L"
              value={ ["flower","heart","sun", "flash" ]}
             />
          </Panel>
          <List
              handleUpdate={this.handleUpdate}/>
        </ListInfo>
      </div >
    );
  }
}

export default connect(
  (state) => {
      return {
          list: state.list,
          active: state.active
      }
  },
    {
        changeList,
        getList,
        clearActive
    }
)(App);
