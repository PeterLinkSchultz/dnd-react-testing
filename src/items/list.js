import React, { Component } from 'react';
import DragLayer from '../dragndrop/target';

class List extends Component {
    render() {
        return (
            <div className="list_container">
                <DragLayer
                    list={this.props.list}
                    id={this.props.id}
                    dragItem={this.props.dragItem}
                    addItemList={this.props.addItemList}
                    removeItemList={this.props.removeItemList}
                    handleMove={this.props.handleMove}
                    handleLeave={this.props.handleLeave}
                    handleDragStart={this.props.handleDragStart}
                    handleDragEnd={this.props.handleDragEnd}
                    handleUpdate={this.props.handleUpdate}
                />
            </div>
        );
    }
}
List.prototype.getName = () => {
    return "list";
}
export default List;