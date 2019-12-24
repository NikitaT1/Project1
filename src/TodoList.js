import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import connect from "react-redux/lib/connect/connect";
import {addTaskAC, changeTaskAC, delTaskCallAC, setTasksAC} from "./reducer";
import axios from "axios"
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
        api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id)});
    };

    nextTaskId = 0;

    state = {
        filterValue: "All"
    };


    onTaskAdded = (newText) => {
       api.createTask(this.props.id, newText)
            .then(res => {
                let newTask = res.data.data.item;
                this.props.addTask(newTask, this.props.id)
            });

    }

    onFilterChanged = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        } );
    }

    onTaskStatusChanged = (taskId, status) => {
        this.changeTask(taskId, {status:status})
    };

    onTaskTitleChanged = (title, taskId) => {
        this.changeTask({title:title}, taskId)
    };

        changeTask = (taskId, obj) => {
        let task = this.props.tasks.find((task) => {
            return task.id === taskId
        })
        let newTask = {...task, ...obj}
        axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/`, newTask,
            {withCredentials: true,
            headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"}})
            .then( (res) => {
        this.props.updateTask (obj, taskId, this.props.id)
            })
    };

  /*  changeTask = (taskId, obj) => {
        this.props.tasks.forEach(task => {
            if (task.id === taskId) {
                let newTask = {...task, ...obj}
                axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/`, newTask,
                    {withCredentials: true,
                        headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"}})
                    .then( (res) => {
                this.props.updateTask(taskId, obj, this.props.id)
            })
        })
    }*/



    delTaskCall = (todolistId, taskId) => {
        api.deleteTask(taskId)
            .then(res => {
        this.props.delTaskCall (todolistId, taskId)
            });
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
        updateTask (taskId, obj, todolistId) {
            const action = changeTaskAC (taskId, obj, todolistId);
            dispatch(action);
        },
        delTaskCall (todolistId, taskId) {
            const action = delTaskCallAC (todolistId, taskId)
            dispatch(action);
        },
        setTasks (allTasks, tasksId) {
            const action = setTasksAC (allTasks, tasksId);
            dispatch(action);
        }

    }
}



const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoList)

export default ConnectedTodoList;