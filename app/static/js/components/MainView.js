
import React, { Component } from 'react';
import '../../css/appView.css';

class AppView extends Component {

    render () {

        var appViewStyle = {
            height: `${this.props.pageHeight}px`
        };

        const { component, timeStamp } = this.props;
        let url = '';
        if (component) {
            url = component.url;
            url += url.indexOf('?') === -1 ? '?' : '&';
        }

        return (
            <div style={appViewStyle} className="app-view" id="app-view">
                <div style={appViewStyle} className="frame-container">
                    {url &&
                        <iframe
                            style={appViewStyle}
                            ref="appContainer"
                            className="app-container"
                            src={`${url}bnjs_simulator=1&_t=${timeStamp}`}>
                        </iframe>    
                    }
                </div>
            </div>
        );
    }
}

export default AppView;