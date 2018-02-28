import React from 'react';
import Input from './input';
import SortChecker from './sortChecker';


const Sort = (props) => {
    const renderSort = () => {
        if (props.type === "C") {
            return <SortChecker
                name={props.name}
                default={props.default}
                values={props.values}
                value={props.value}
                index={props.index}
                handleChange={props.handleChange}
            />;
        }
        if (props.type === "S") {
            return <Input
                text="name"
                handleChange={props.handleChange}
            />
        }
    }
    return (
        <div className="panel_item">
            <p className="panel_title">{props.text}</p>
            {renderSort()}
        </div>
    );
}
Sort.prototype.getName = () => {
    return "sort";
}
export default Sort;