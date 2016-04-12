import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Util from '../util';
import TitleBar from './TitleBar';
import MainView from './MainView';
import SideMenu from './SideMenu';
import * as Actions from '../actions';
import '../../css/normalize.css';
import '../../css/base.css';

class App extends Component {

    execHttpRequest (options) {

        var appContainer = findDOMNode(this.refs.appView).querySelector('iframe');
        
        Util.ajax(options, (requestId, response) => {
            appContainer.contentWindow.postMessage({
                type: 'execHttpRequestCallback',
                status: 'success',
                requestId: requestId,
                responseData: response
            }, '*');
        }, (requestId) => {
            appContainer.contentWindow.postMessage({
                type: 'execHttpRequestCallback',
                status: 'fail',
                requestId: requestId
            }, '*');
        });
        
    }

    execActionButtonCallback (tag) {
        var appContainer = findDOMNode(this.refs.appView).querySelector('iframe');
        appContainer.contentWindow.postMessage({
            type: 'execActionButtonCallback',
            tag: tag
        }, '*');
    }

    setPageHeight () {
        var titleBar = findDOMNode(this.refs.titleBar);
        const { actions } = this.props;
        actions.getPageHeight();

        window.addEventListener('resize', function() {
            actions.getPageHeight();
        }.bind(this), false);
    }

    componentDidMount () {

        this.setPageHeight();

        window.addEventListener('message', function(e) {
            var type = e.data.type;
            switch (type) {
                case 'httpRequest':
                    this.execHttpRequest(e.data);
                    break;
            }
        }.bind(this), false);

    }

    render () {
        const {
            actions,
            isShowMenu,
            pageHeight,
            components,
            currComponent,
            timeStamp,
            selectedComponents,
            currComponentIndex
        } = this.props;

        let appViewHeight = pageHeight - 41;

        return (
            <div>
                <TitleBar
                    ref="titleBar"
                    execActionButtonCallback={this.execActionButtonCallback.bind(this)}
                    toggleMenu={actions.toggleSideMenu}
                    refresh={actions.getTimestamp}
                    hasComponents={components.length > 0}
                    isShowMenu={isShowMenu}
                    component={currComponent} />
                <MainView
                    ref="appView"
                    pageHeight={appViewHeight}
                    component={currComponent}
                    timeStamp={timeStamp} />
                {(isShowMenu || !currComponent) &&
                    <SideMenu
                        isShowMenu={isShowMenu}
                        components={components}
                        actions={actions}
                        selectedComponents={selectedComponents}
                        pageHeight={appViewHeight}
                        currComponentIndex={currComponentIndex} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        isShowMenu,
        pageHeight,
        components,
        currComponentIndex,
        timeStamp,
        selectedComponents
    } = state;
    return {
        isShowMenu,
        pageHeight,
        components,
        currComponent: components[currComponentIndex],
        timeStamp,
        selectedComponents,
        currComponentIndex
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
