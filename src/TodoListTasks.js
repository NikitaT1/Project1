import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        return (

                    <div className="todoList-tasks">
                        <TodoListTask title="JS" isDone={true}/>
                        <TodoListTask title="React" isDone={true}/>
                        <TodoListTask title="HTML" isDone={true}/>
                        <TodoListTask title="CSS" isDone={true}/>
                    </div>

        );
    }
}

export default TodoListTasks;

