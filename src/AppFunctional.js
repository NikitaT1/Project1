import React, {useState, useEffect} from 'react';
import './css/App.css';
import {connect} from "react-redux"
import {addTodoTC, setTodoListsTC} from "./reducer";
import TodoListFunctional from "./todoLists/TodoListFunctional";
import ListOfTodoLists from "./listOfTodoLists/ListOftodoLists";
import AddNewItemFormFunction from "./AddNewItemFormFunction";

const AppFunctional = (props) => {

    let nextTaskId = 5;

    // const [todolists, setTitle] = useState(null)


    useEffect(() => {
        props.setTodoLists();
        // if(props.isAuth) {
        //     props.setTodoLists();
        // }
    }, [])

    const addTodoList = (title) => {
        props.addTodoList(title);
    }


    // if (!props.isAuth) {
    //     return <div>
    //         <LoginApp/>
    //     </div>
    // }

    const todoLists = props.todoLists.map(t => <TodoListFunctional id={t.id} title={t.title} tasks={t.tasks}/>)
    const listOftodoLists = props.todoLists.map(m => <ListOfTodoLists id={m.id} title={m.title} tasks={m.tasks}/>)
    return (
        <div className="App">
            <div className="Header">
                <AddNewItemFormFunction addItem={addTodoList}/>
            </div>
            <div className="Main">
                <div className="ListOftodoLists">
                    {listOftodoLists}
                </div>
                <div className="todoLists">
                    {todoLists}
                </div>
            </div>
        </div>
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

