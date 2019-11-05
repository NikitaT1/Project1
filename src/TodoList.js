import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import connect from "react-redux/lib/connect/connect";
import {addTaskAC, changeTaskAC, delTaskCallAC} from "./reducer";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    };

    nextTaskId = 0;

    state = {
        filterValue: "All"
    };

    onTaskAdded = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(newTask, this.props.id)
    }

    onFilterChanged = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        } );
    }

    onTaskStatusChanged = (isDone, taskId) => {
        this.changeTask({isDone:isDone}, taskId)
    };

    onTaskTitleChanged = (title, taskId) => {
        this.changeTask({title:title}, taskId)
    };

    changeTask = (obj, taskId) => {
        this.props.changeTask (obj, taskId, this.props.id)
    };

    delTaskCall = (todolistId, taskId) => {
        this.props.delTaskCall (todolistId, taskId)
    }




    render = () => {

        return (
            <div className="todoList">
                <TodoListHeader onTaskAdded={this.onTaskAdded} title={this.props.title} id={this.props.id} />
                <TodoListTasks id={this.props.id} onTaskStatusChanged={this.onTaskStatusChanged}
                               onTaskTitleChanged={this.onTaskTitleChanged} delTaskCall={this.delTaskCall}
                               tasks={this.props.tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.isDone === false;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.isDone === true;
                                   }
                               })}/>
                <TodoListFooter onFilterChanged={this.onFilterChanged} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask (newTask, todolistId) {
            const action = addTaskAC (newTask, todolistId);
            dispatch(action);
        },
        changeTask (obj, taskId, todolistId) {
            const action = changeTaskAC (obj, taskId, todolistId);
            dispatch(action);
        },
        delTaskCall (todolistId, taskId) {
            const action = delTaskCallAC (todolistId, taskId)
            dispatch(action);
        }

    }
}



const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoList)

export default ConnectedTodoList;