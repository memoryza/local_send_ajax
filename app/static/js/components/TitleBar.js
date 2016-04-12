import React, { Component } from 'react';
import ActionButton from './ActionButton';
import '../../css/titleBar.css';

class TitleBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            actionButtons: [],
            title: ''
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.component && this.props.component && nextProps.component.url !== this.props.component.url) {
            this.setState({actionButtons: [], title: ''});
        }
    }

    componentDidMount () {

        window.addEventListener('message', function(e) {
            var type = e.data.type;

            switch (type) {
                case 'addActionButton':
                    this.addActionButton(e.data.options);
                    break;
                case 'setTitle':
                    this.setState({title: e.data.title});
                    break;
            }
        }.bind(this), false);

    }

    addActionButton (options) {

        var actionButtons = this.state.actionButtons;

        var hasBtn = false;

        for (var i = 0, len = actionButtons.length; i < len; i++) {
            if (actionButtons[i].tag === options.tag) {
                hasBtn = true;
                break;
            }
        }

        if (hasBtn) return;

        this.setState((state) => {
            actionButtons.unshift(options);
            return {
                actionButtons: actionButtons
            };
        });
    }

    toggleMenu (e) {
        e.preventDefault();
        this.props.toggleMenu();
    }

    refresh (e) {
        e.preventDefault();
        this.props.refresh();
    }

    render () {

        const { execActionButtonCallback, hasComponents, isShowMenu } = this.props;

        var actionButtons = this.state.actionButtons.map((opts, index) => {
            return <ActionButton execActionButtonCallback={execActionButtonCallback} key={index} opts={opts} />;
        });

        return (
            <header className="title-bar" id="title-bar">
                <a href="##" className="menu-btn" onClick={this.toggleMenu.bind(this)}></a>
                {hasComponents && !isShowMenu &&
                    <a href="##" className="refresh-btn" onClick={this.refresh.bind(this)}></a>
                }
                <div className="title" id="title">{this.state.title}</div>
                <div id="btn-container" className="btn-container">{actionButtons}</div>
            </header>
        );
    }
}

export default TitleBar;