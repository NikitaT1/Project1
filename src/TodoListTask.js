import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    render = () => {
        return (
                    <div className="todoList-tasks">
                        <div className="todoList-task">
                            <input type="checkbox" checked={this.props.isDone}/>
                            <span>{this.props.title}</span>
                        </div>
                    </div>

        );
    }
}

export default TodoListTask;

