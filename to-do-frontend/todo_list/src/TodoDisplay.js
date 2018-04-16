import React from 'react';
import './App.css';

class TodoDisplay extends React.Component {
    
    render() {
        
        return(
            <div className={'visible-' + this.props.visible}>
                <li className="list-group-item">
                    <input type="checkbox" onChange={ () => this.props.handleClick(this.props.index) } checked={this.props.done} value="on" />
                    <label className={ this.props.done === true ? "done" : ""}>{this.props.task}</label>
                </li>
            </div>

        )
    }
}

export default TodoDisplay;