import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskElements = this.props.tasks.map (task => <TodoListTask title={task.title} isDone={task.isDone}/>)

        return (

                    <div className="todoList-tasks">
                        {taskElements}
                    </div>

        );
    }
}

export default TodoListTasks;

