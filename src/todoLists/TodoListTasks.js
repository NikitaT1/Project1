import React from 'react';
import TodoListTask from "./TodoListTask";

const TodoListTasks = (props) => {


        let tasksElements = props.tasks.map( task => <TodoListTask task={task} id={props.id}
                                                                        onTaskStatusChanged={props.onTaskStatusChanged}
                                                                        onTaskTitleChanged={props.onTaskTitleChanged}
                                                                        delTaskCall={props.delTaskCall}
        />);

        return (
            <div>
                {tasksElements}
            </div>
        );

}

export default TodoListTasks;

