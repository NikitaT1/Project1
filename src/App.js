import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import connect from "react-redux/lib/connect/connect";
import {addTodoAC, setTodoListsAC} from "./reducer";
import axios from "axios";

class App extends React.Component {

    nextTaskId = 5;

    state = {
        todolists: []
    }


    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: title}, {withCredentials: true,
                headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"}})
            .then(res => {
                let newTodoList = res.data.data.item;
                this.props.addTodoList(newTodoList)});
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true})
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

