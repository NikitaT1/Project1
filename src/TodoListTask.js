import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    onDoneIsChanged = (e) => {
        this.props.changeStatus (this.props.task.id, e.currentTarget.checked)
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode:false})
    };

    onTitleChanged = (e) => {
        debugger;
        this.props.changeTitle (e.currentTarget.value, this.props.task.id)
    };


    render = () => {
        const newOne = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        return (
            <div className={newOne}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onDoneIsChanged}/>
                { this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged}
                             autoFocus={true} value={this.props.task.title} />
                        : <span onClick={this.activateEditMode} className={this.newOne}> {this.props.task.id}
                     - {this.props.task.title}  {this.props.task.priority} </span>
                }
            </div>


        );
    }
}

export default TodoListTask;

