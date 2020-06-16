import React, {useState, useEffect} from 'react';
import '../css/TodoList.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import {connect} from "react-redux"
import {addTaskTC, changeTaskAC, delTaskCallTC, setTasksTC} from "../reducer";
import {api} from "../api";
import TodoListFooterFunctional from "./TodoListFooterFunctional";
import TodoListTitle from "./TodoListTitle";


const TodoListFunctional = (props) => {

    useEffect(() => {
        if (props.id){
            props.setTasks(props.id)
        }
    }, [props.id])

    const nextTaskId = 0;

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
        return props.updateTask (taskId, obj, props.id)
            })
            .catch((err)=> console.log(err))
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