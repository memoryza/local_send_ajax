
import React, { Component } from 'react';

class ActionButton extends Component {
    actionButtonClick (tag, e) {
        e.preventDefault();
        this.props.execActionButtonCallback(tag);
    }

    render () {

        var opts = this.props.opts;

        return (
            <a
                href="##"
                className={`action-btn action-btn-${opts.icon}`}
                id={`action-btn-${opts.tag}`}
                onClick={this.actionButtonClick.bind(this, opts.tag)}>
            </a>
        );
    }
}

export default ActionButton;