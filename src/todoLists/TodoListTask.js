import React from 'react';



class TodoListTask extends React.Component {

    state = {
        editMode: false,
        taskTitle: this.props.task.title
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.onTaskStatusChanged(this.props.task.id, status);
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.onTaskTitleChanged(this.props.task.id, this.state.taskTitle)
    };

    onTitleChanged = (e) => {
        this.setState({taskTitle: e.currentTarget.value})
        //this.props.onTaskTitleChanged(e.currentTarget.value, this.props.task.id)
    };

    delTask = () => {
        this.props.delTaskCall(this.props.id, this.props.task.id)
    }

     // {this.props.task.priority}


    render = () => {

        let checked = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";

        return (
            <div className="listOfTasks">
            <div className={checked}>
                <input type="checkbox" checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}/>
                {this.state.editMode ? <input onBlur={this.deactivateEditMode}
                                              autoFocus={true} value={this.state.taskTitle}
                                              onChange={this.onTitleChanged}/> :
                    <span onClick={this.activateEditMode}>
                   {this.props.task.title}</span>}
               </div>
        <button id="delTask" onClick={this.delTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

