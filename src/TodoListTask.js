import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onDoneIsChanged = (e) => {
        this.props.changeStatus (this.props.task, e.currentTarget.checked)
    }

    render = () => {
        debugger
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onDoneIsChanged}/>
                <span>{this.props.task.title}</span>, {this.props.task.priority}
            </div>


        );
    }
}

export default TodoListTask;

