import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/lib/connect/connect";

class App extends React.Component {

    nextTaskId = 0;


    onTitleAdded = (newText) => {
        let newTodolist = {
            id: this.nextTaskId,
            title: newText,
            tasks: []
        };
        this.props.addTodo(newTodolist)
        this.nextTaskId++
    }


    render = () => {

        const todoLists = this.props.todoLists.map (t => <TodoList id={t.id} title={t.title} tasks={t.tasks}/>)

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
            const action = {
                type: "ADD-TODOLIST",
                newTodolist: newTodolist
            };

            dispatch(action)
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

