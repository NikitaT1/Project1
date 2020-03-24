import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

const TodoListTasks = (props) => {


        let tasksElements = props.tasks.map( task => <TodoListTask task={task} id={props.id}
                                                                        onTaskStatusChanged={props.onTaskStatusChanged}
                                                                        onTaskTitleChanged={props.onTaskTitleChanged}
                                                                        delTaskCall={props.delTaskCall}
        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );

}

export default TodoListTasks;

