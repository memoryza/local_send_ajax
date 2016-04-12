import React, { Component } from 'react';
import Components from './Components';
import Settings from './Settings';
import '../../css/sideMenuView.css';

class SideMenuView extends Component {

    constructor (props) {
        super(props);
        this.state = {
            tab: 'components'
        };
    }

    tabChange (type, e) {
        e.preventDefault();
        this.setState({tab: type});
    }

    render () {
        const menuTab = this.state.tab;
        const { actions, components, selectedComponents, pageHeight, currComponentIndex } = this.props;
        return (
            <div className="side-menu-container" style={{height: `${pageHeight}px`}}>
                <div className="side-menu">
                    <a className="menu-item menu-component" href="##" onClick={this.tabChange.bind(this, 'components')}></a>
                    <a className="menu-item menu-set" href="##" onClick={this.tabChange.bind(this, 'settings')}></a>
                </div>
                {menuTab === 'components' &&
                    <Components
                        components={components}
                        doAdd={actions.addComponent}
                        doDelete={actions.deleteComponent}
                        onDoSelect={actions.setCurrComponent}
                        doCheck={actions.selectComponent}
                        toggleEdit={actions.toggleEdit}
                        toggleSideMenu={actions.toggleSideMenu}
                        emptySelectComponent={actions.emptySelectComponent}
                        selectedComponents={selectedComponents}
                        pageHeight={pageHeight}
                        currComponentIndex={currComponentIndex} />
                }
                {menuTab === 'settings' &&
                    <Settings />
                }
            </div>
        );
    }
}

export default SideMenuView;