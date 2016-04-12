import React, { Component } from 'react';
import cx from 'classnames';
import AddComponent from './AddComponent';
import '../../css/historyView.css';

class Components extends Component {
    constructor (props) {
        super(props);

        this.state = {
            showAddComponent: false,
            isEdit: false
        }; 

    }

    showAdd (e) {
        e.preventDefault();
        this.setState({showAddComponent: true});
    }

    cancelAdd (e) {
        e.preventDefault();
        this.setState({showAddComponent: false});
    }

    doAdd (obj) {
        this.setState({showAddComponent: false});
        this.props.doAdd(obj);
        this.props.toggleSideMenu(false);
    }

    doDelete (index, e) {
        e.preventDefault();
        if (!confirm('确定删除？')) return;
        this.props.doDelete(index);
    }

    doSelect (index) {
        const { onDoSelect, toggleSideMenu, emptySelectComponent, selectedComponents } = this.props;
        if (selectedComponents.length > 0) {
            emptySelectComponent();
        }
        onDoSelect(index);
        toggleSideMenu(false);
    }

    toggleIsEdit () {
        this.setState({isEdit: !this.state.isEdit});
    }

    toggleEdit (e) {
        e.preventDefault();
        const { selectedComponents, doDelete, doCheck, components } = this.props;
        if (!components.length) return;
        const selectedLength = selectedComponents.length;
        
        if (selectedLength > 0) {
            if (confirm('确定删除选中的组件？')) {
                this.toggleIsEdit();
                selectedComponents.forEach((item, index) => {
                    doDelete(item - index, selectedLength - 1 === index);
                    doCheck(item, false);
                });
            }
        } else {
            this.toggleIsEdit();
        }
    }

    render () {

        const { components, selectedComponents, doCheck, pageHeight, currComponentIndex } = this.props;
        const { isEdit, showAddComponent } = this.state;

        let componentsNodes = components.map((item, index) => {
            return (
                <li key={index}>
                    {isEdit &&
                        <div
                            className={cx('checkbox', {'checked': selectedComponents.indexOf(index) > -1})}
                            onClick={doCheck.bind(null, index, selectedComponents.indexOf(index) === -1)}>
                            <i></i>
                        </div>
                    }
                    <div className="wp" onClick={this.doSelect.bind(this, index)}>
                        <div className={cx('name', {selected: index === currComponentIndex})}>{item.name}</div>
                        <div className="url">{item.url}</div>
                    </div>
                    <a href="##" className="delete" onClick={this.doDelete.bind(this, index)}><i></i></a>
                </li>
            );
        });

        const listStyle = {
            height: `${pageHeight - 31}px`
        };

        return (
            <div className="side-menu-content" style={{height: `${pageHeight}px`}}>
                <header>
                    <span>组件</span>
                    {components.length > 0 && !showAddComponent &&
                        <a href="#" className={cx('edit-component-icon', {'complete': isEdit})} onClick={this.toggleEdit.bind(this)}></a>
                    }
                    {components.length > 0 && !showAddComponent &&
                        <a href="#" className="add-history-icon" onClick={this.showAdd.bind(this)}></a>
                    }
                </header>
                {components.length === 0 && !showAddComponent &&
                    <div className="add-history-tip">
                        <p>现在还没有任何组件，赶快去添加一个吧</p>
                        <div className="btn">
                            <a href="#" onClick={this.showAdd.bind(this)}>添加</a>
                        </div>
                    </div>
                }
                {!showAddComponent && components.length > 0 &&
                    <ul className="components-list" style={listStyle}>
                        {componentsNodes}
                    </ul>
                }
                {showAddComponent &&
                    <AddComponent
                        cancelAdd={this.cancelAdd.bind(this)}
                        doAdd={this.doAdd.bind(this)} />
                }
            </div>
        );
    }
}

export default Components;