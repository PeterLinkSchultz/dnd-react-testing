import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            name: props.name,
            info: props.info
        };
    }

    renderInfo() {
        let info = this.state.info;
        let item = this.props.item;
        if (item !== null) {
            return info.map( ( prop, key ) => {
                if (item[prop].length > 0) {
                    return <div key={key} className="info_detail panel_item">
                        <p className="panel_title info_title">{prop}:</p>
                        <div className="panel_item">
                            {item[prop].map( (val, key) => {
                                return <div key={key} className={`info_icon icon icon-${val}`}></div>
                            })}
                        </div>
                    </div>
                }
            });
        }
    }
    renderName() {
        let item = this.props.item;
        if (item !== null) {
            return <div className="panel_item info_detail">
                <p className="panel_title info_title">{this.state.name}:</p>
                <p className="panel_title">{item.name}</p>
            </div>
        }

    }
    render() {
        return (
            <div className="info">
                <div className="info_head info_detail">
                    {this.state.title}
                </div>
                {this.renderName()}
                {this.renderInfo()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            item: state.active
        }
    }
)(Info);