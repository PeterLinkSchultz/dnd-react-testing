import React from 'react';

import Checker from './checker';
import Input from './input';
import SortChecker from './sortChecker';
const Sort = (props) => {
    const renderSort = () => {
        if ( props.type === "C" ) {
            return <SortChecker 
                name={props.name}
                default={props.default}
                values={props.values}
                default={props.default}
                index={props.index}
                handleChange={props.handleChange}
            />;
        }
        if ( props.type === "S" ) {
            return <Input 
                text="name"
                handleChange={props.handleChange}
            />
        }
    }
    return(
        <div>
        {props.text}
        {renderSort()}
        </div>
    );
}

export default Sort;