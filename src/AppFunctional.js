import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux"
import {addTodoAC, addTodoTC, setTodoListsAC, setTodoListsTC} from "./reducer";
// import Login from "./Login";
import LoginApp from "./LoginApp";
import TodoListFunctional from "./TodoListFunctional";
import AddNewItemFormFunction from "./AddNewItemFormFunction";

const AppFunctional = (props) => {

    let nextTaskId = 5;

   /* state = {
        todolists: []
    }
*/
    //const [todolists, setTitle] = useState(null)

    /*componentDidMount() {
        this.restoreState();
    }*/

    useEffect(() => {
        restoreState()})

/*    componentDidUpdate(prevProps, prevState) {
        let prevIsAuth = prevProps.isAuth
        let isAuth = this.props.isAuth
        if (this.props.isAuth !== prevIsAuth) {
            this.props.setTodoLists();
        }
    }*/

    const restoreState = () => {
        props.setTodoLists();
    }

    const addTodoList = (title) => {
        props.addTodoList(title);
    }

/*
        if (!props.isAuth) {
            return <div>
            <LoginApp />
            </div>
        }*/
        const todoLists = props.todoLists.map(t => <TodoList id={t.id} title={t.title} tasks={t.tasks}/>)
        return (
            <>
                <div>
                    <AddNewItemFormFunction addItem={addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoReducer.todoLists,
        isAuth: state.todoReducer.isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodolist) => {
            const action = addTodoTC(newTodolist);
            dispatch(action)
        },
        setTodoLists: () => {
            dispatch(setTodoListsTC())
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppFunctional);
export default ConnectedApp;

