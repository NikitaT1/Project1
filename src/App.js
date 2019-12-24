import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/lib/connect/connect";
import {addTodoAC, setTodoListsAC} from "./reducer";
import axios from "axios";
import {api} from "./api";

class App extends React.Component {

    nextTaskId = 5;

    state = {
        todolists: []
    }


    addTodoList = (title) => {
        api.createTodoList(title)
            .then(res => {
                let newTodoList = res.data.data.item;
                this.props.addTodoList(newTodoList)});
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.uploadTodolists()
            .then(res => {
                this.props.setTodoLists(res.data);
            });
    }



    render = () => {

        const todoLists = this.props.todoLists.map(t => <TodoList id={t.id} title={t.title} tasks={t.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
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
        addTodoList: (newTodolist) => {
            const action = addTodoAC(newTodolist);
            dispatch(action)
        },
        setTodoLists: (todolists) => {
            const action = setTodoListsAC(todolists);
            dispatch(action)
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

