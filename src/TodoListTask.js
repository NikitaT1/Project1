import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        this.props.onTaskStatusChanged(e.currentTarget.checked, this.props.task.id, );
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false})
    };

    onTitleChanged = (e) => {
        this.props.onTaskTitleChanged(e.currentTarget.value, this.props.task.id)
    };

    delTask = () => {
        this.props.delTaskCall(this.props.id, this.props.task.id)
    }




    render = () => {

        let checked = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={checked}>
                <input type="checkbox" checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}/>
                {this.state.editMode ? <input onBlur={this.deactivateEditMode}
                                              autoFocus={true} value={this.props.task.title} onChange={this.onTitleChanged}/> :
                    <span onClick={this.activateEditMode}>
                    {this.props.task.id} - {this.props.task.title}</span>},
                priority: {this.props.task.priority} <button onClick={this.delTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

