import React, { Component } from 'react';
import Item from './item';

import DragLayer from '../dragndrop/target';
import DragItem from '../dragndrop/item';

import { changeList } from '../actions/lists';
import { DropTarget } from 'react-dnd';


import { connect } from 'react-redux';
const R = require('ramda');


class List extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        //const list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        return (
            <div>
                <DragLayer
                    list={this.props.list}
                    id={this.props.id}
                    changeList={this.props.changeList}
                    handleUpdate={this.props.handleUpdate}
                    addItemList={this.props.addItemList}
                    removeItemList={this.props.removeItemList}
                    handleMove={this.props.handleMove}
                    handleLeave={this.props.handleLeave}
                    isDrag={this.props.isDrag}
                />
                {/*
                    R.map((item, key) => {
                        return <Item
                            key={key}
                            name={`Item${item.name}`}
                            active={item.active}
                            cat={item.cat}
                            id={item.id}
                        />
                    }, this.props.list)
                */ }
            </div>
        );
    }
}
export default List;
/*
export default connect(
    null,
    (dispatch) => ({
        changeShow
    })
)(List);*/