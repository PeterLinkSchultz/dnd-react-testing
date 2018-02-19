import React, { Component } from 'react';

/*
class FilterLeft extends Component {
    constructor(props) {

    }
}
*/

const FilterLeft = function(props) {
    console.log(props);

    const setFilterValue = (e, name) => {
        e.preventDefault();
        console.log(name);
    };
    return (
        <div>
            <a href="#" onClick={ (e) => setFilterValue(e, "I")}>I</a>
        </div>
    );
    
}

export default FilterLeft;