import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let taskElements = this.props.tasks.map (m => <TodoListTask title={m.title}
                                                                       isDone={m.isDone}
                                                                       priority={m.priority}/>)

        return (
                    <div className="todoList-tasks">
                        {taskElements}
                    </div>
        );
    }
}

export default TodoListTasks;

