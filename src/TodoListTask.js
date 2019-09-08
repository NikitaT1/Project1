import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onDoneIsChanged = (e) => {
        this.props.changeStatus (this.props.task, e.currentTarget.checked)
    }


    render = () => {
        const newOne = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={newOne}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onDoneIsChanged}/>
                <span className={this.newOne}>{this.props.task.title} {this.props.task.priority}</span>
            </div>


        );
    }
}

export default TodoListTask;

