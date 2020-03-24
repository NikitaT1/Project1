import React, {useState, useEffect} from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {connect} from "react-redux"
import {addTaskAC, addTaskTC, changeTaskAC, delTaskCallAC, delTaskCallTC, setTasksAC, setTasksTC} from "./reducer";
import {api} from "./api";
import TodoListFooterFunctional from "./TodoListFooterFunctional";


const TodoListFunctional = (props) => {

    /*constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    };*/

   /* componentDidMount() {
        this.restoreState();
    };*/

    useEffect(() => {
        restoreState()
    }, [])

    const restoreState = () => {
        props.setTasks(props.id)
    };

    const nextTaskId = 0;

    /*const state = {
        filterValue: "All"
    };*/

    const [filterValue, setFilter] = useState("All")

    const onTaskAdded = (newText) => {
        props.addTask(props.id, newText)};


    const onFilterChanged = (newFilterValue) => {
        setFilter(newFilterValue)
    }

    const onTaskStatusChanged = (taskId, status) => {
        changeTask(taskId, {status:status})
    };

    const onTaskTitleChanged = (taskId, title ) => {
        changeTask(taskId, {title:title})
    };

    const changeTask = (taskId, obj) => {
        let task = props.tasks.find((task) => {
            return task.id === taskId
        })
        let newTask = {...task, ...obj}
        api.updateTasks(newTask)
            .then( (res) => {
        props.updateTask (taskId, obj, props.id)
            })
    };

    const delTaskCall = (todolistId, taskId) => {
        props.delTaskCall (todolistId, taskId)
    }



        let {tasks = []} = props;
        return (
            <div className="todoList">
                <TodoListHeader onTaskAdded={onTaskAdded} title={props.title} id={props.id} />
                <TodoListTasks id={props.id} onTaskStatusChanged={onTaskStatusChanged}
                               onTaskTitleChanged={onTaskTitleChanged} delTaskCall={delTaskCall}
                               tasks={tasks.filter(t => {
                                   if (filterValue === "All") {
                                       return true;
                                   }
                                   if (filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooterFunctional onFilterChanged={onFilterChanged} filterValue={filterValue} />
            </div>
        );
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

const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoListFunctional)

export default ConnectedTodoList;