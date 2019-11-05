import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/lib/connect/connect";
import {addTodoAC} from "./reducer";

class App extends React.Component {

    nextTaskId = 5;

    state = {
        todolists: []
    }


    onTitleAdded = (newText) => {
        let newTodolist = {
            id: this.nextTaskId,
            title: newText,
            tasks: []
        };
        this.props.addTodo(newTodolist)
        this.nextTaskId++
    }

    componentDidMount() {
        this.restoreState();
    }


    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem("todolists-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        });
    }


    render = () => {

        const todoLists = this.props.todoLists.map(t => <TodoList id={t.id} title={t.title} tasks={t.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.onTitleAdded}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (newTodolist) => {
            const action = addTodoAC(newTodolist);
            dispatch(action)
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

