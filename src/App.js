import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoList from "./TodoList";

class App extends React.Component {

    state = {
        todolists: [{
            id: 1, title: "One"},
            {id: 2, title: "Two"}]
    };

    addTodoList = (title) => {
        this.setState({todolists: [...this.state.todolists, {title: title}]
        })
    }

    render = () => {

        const todolists = this.state.todolists.map( tl => <TodoList id={tl.id} title={tl.title}/>)

        return (
            <>
            <div>
                <AddNewItemForm addItem={this.addTodoList}/>
                </div>
            <div className="App">
                {todolists}
            </div>
</>
        );
    }
}

export default App;

