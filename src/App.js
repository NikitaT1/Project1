import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoList from "./TodoList";

class App extends React.Component {

    state = {
        TodoList: [
            {id: 1, title: "One"},
            {id: 2, title: "Two"}
        ]
    };

    render = () => {

        const todolists = this.state.TodoList.map( tl => <TodoList id={tl.id} title={tl.title}/>)

        return (
            <div>
                <input />
                <button onClick={this.addTodoList}>Add </button>

            <div className="App">
                {todolists}
            </div>
            </div>
        );
    }
}

export default App;

