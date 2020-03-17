import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {connect} from "react-redux"
import {addTaskAC, addTaskTC, changeTaskAC, delTaskCallAC, delTaskCallTC, setTasksAC, setTasksTC} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        this.props.setTasks(this.props.id)
    };

    nextTaskId = 0;

    state = {
        filterValue: "All"
    };

    onTaskAdded = (newText) => {
        this.props.addTask(this.props.id, newText)};


    onFilterChanged = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        } );
    }

    onTaskStatusChanged = (taskId, status) => {
        this.changeTask(taskId, {status:status})
    };

    onTaskTitleChanged = (taskId, title ) => {
        this.changeTask(taskId, {title:title})
    };

        changeTask = (taskId, obj) => {
        let task = this.props.tasks.find((task) => {
            return task.id === taskId
        })
        let newTask = {...task, ...obj}
        api.updateTasks(newTask)
            .then( (res) => {
        this.props.updateTask (taskId, obj, this.props.id)
            })
    };

    delTaskCall = (todolistId, taskId) => {
        this.props.delTaskCall (todolistId, taskId)
    }


    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <TodoListHeader onTaskAdded={this.onTaskAdded} title={this.props.title} id={this.props.id} />
                <TodoListTasks id={this.props.id} onTaskStatusChanged={this.onTaskStatusChanged}
                               onTaskTitleChanged={this.onTaskTitleChanged} delTaskCall={this.delTaskCall}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter onFilterChanged={this.onFilterChanged} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask (todoListId, newText) {
            const action = addTaskTC (todoListId, newText);
            dispatch(action);
        },
        updateTask (taskId, obj, todolistId) {
            const action = changeTaskAC (taskId, obj, todolistId);
            dispatch(action);
        },
        delTaskCall (todolistId, taskId) {
            const action = delTaskCallTC (todolistId, taskId)
            dispatch(action);
        },
        setTasks (tasksId) {
            const action = setTasksTC (tasksId);
            dispatch(action)
        }
    }
}



const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoList)

export default ConnectedTodoList;