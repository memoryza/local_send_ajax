
import React, { Component } from 'react';

class AddComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            errMsg: ''
        };
    }

    add (e) {
        e.preventDefault();

        var name = this.refs.name.value.trim();
        var url = this.refs.url.value.trim();

        if (!name || !url) {
            this.setState({errMsg: '名称或者URL为空'});
            return;
        }

        if (!/^http:\/\/\S+/.test(url)) {
            this.setState({errMsg: 'URL格式不正确，应以http开头'});
            return;
        }

        this.setState({errMsg: ''});
        this.props.doAdd({name, url});
    }

    render () {
        return (
            <div className="add-history">
                <div className="form-item">
                    <label>名称：</label>
                    <div className="input-wrapper">
                        <input ref="name" type="text" placeholder="merchants" />
                    </div>
                </div>
                <div className="form-item">
                    <label>URL：</label>
                    <div className="input-wrapper">
                        <input ref="url" type="text" placeholder="http://localhost:8080/index.html?id=123456" />
                    </div>
                </div>
                {this.state.errMsg &&
                    <div className="err-msg">{this.state.errMsg}</div>
                }
                <div className="btns">
                    <a href="#" className="cancel" onClick={this.props.cancelAdd}>取消</a>
                    <a href="#" className="add" onClick={this.add.bind(this)}>添加</a>
                </div>
            </div>
        );
    }
}

export default AddComponent;