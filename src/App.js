import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from "./AddNewItemForm";
import TodoList from "./TodoList";

class App extends React.Component {

    state = {
        todolists: [{
            id: 1, title: "What to learn"
        },
            {id:2, title: "List 2"}]
    };

    nextItemId = 0;

    addTodolist = (title) => {
        let newItem = {
            id: this.nextItemId,
            title: title,
        };
        this.nextItemId++;


        this.setState ({
            todolists: [...this.state.todolists, newItem]
        }, () => {
            this.saveState();
        });
    };
    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todoLists", stateAsString);
    }

    restoreState = () => {
        let stateAsString = localStorage.getItem("todoLists");
        if (stateAsString) {
            let state = JSON.parse(stateAsString);

            state.todolists.forEach(t => {
                if (t.id >= this.nextItemId) {
                    this.nextItemId = t.id + 1;
                }
            });
            this.setState(state);
        }
    }

    render = () => {

        let todolists = this.state.todolists.map(tl=> <TodoList id={tl.id} title={tl.title}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodolist} />
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

export default App;

