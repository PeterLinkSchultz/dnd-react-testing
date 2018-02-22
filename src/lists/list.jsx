import React, { Component } from 'react';
import Item from './item';

import DragLayer from '../dragndrop/layer';
import DragItem from '../dragndrop/item';

import { changeShow } from '../actions/lists';

import { connect } from 'react-redux';
const R = require('ramda');

class List extends Component {
    constructor(props) {
        super(props);

        this.blockLayer = this.blockLayer.bind(this);
        this.state = {
            flag: false
        }
    }
    blockLayer(flag) {
        if ( this.state !== flag )
            this.setState({ flag });
    }
    
    render() {
        //const list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        if ( this.props.list !== undefined ) 
        return (
            <DragLayer
                handleUpdate={this.props.handleUpdate}
                addItemList={this.props.addItemList}
                removeItemList={this.props.removeItemList}
                id={this.props.id}
                block={this.state.flag}
                classNames="list_items"
            >
                {
                   R.map((item, key) => {
                        return <DragItem
                            id={item.id} 
                            key={key}
                            item={item}
                            draggable={item.draggable ? true : false }
                            handleDragStart={this.props.setDragItemList}
                            handleDragEndList={this.props.clearDragItem}
                            handleClick={this.props.handleClick}
                            handleOnDrop={this.props.changeShow}
                            >
                            <Item
                                name={`Item${item.name}`}
                                active={item.active}
                                cat={item.cat}
                                id={item.id}
                            />
                        </DragItem>
                    }, this.props.list)
                }
            </DragLayer>
        ); else
        return <div></div>;
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