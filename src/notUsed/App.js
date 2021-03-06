import React from 'react';
import '../css/App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./notUsed/AddNewItemForm";
import {connect} from "react-redux"
import {addTodoAC, addTodoTC, setTodoListsAC, setTodoListsTC} from "./reducer";
// import Login from "./Login";
import LoginApp from "./LoginApp";
import TodoListFunctional from "./TodoListFunctional";
import AddNewItemFormFunction from "./AddNewItemFormFunction";

class App extends React.Component {

    nextTaskId = 5;

    state = {
        todolists: []
    }
    
    addTodoList = (title) => {
        this.props.addTodoList(title);
    }

    componentDidMount() {
        this.restoreState();
    }

    

    componentDidUpdate(prevProps, prevState) {
        let prevIsAuth = prevProps.isAuth
        let isAuth = this.props.isAuth
        if (this.props.isAuth !== prevIsAuth) {
            this.props.setTodoLists();
        }
    }

    restoreState = () => {
        this.props.setTodoLists();
    }


    render = () => {
      /*  if (!this.props.isAuth) {
            return <div>
            <LoginApp />
            </div>
        }*/
        const todoLists = this.props.todoLists.map(t => <TodoListFunctional id={t.id} title={t.title} tasks={t.tasks}/>)
        return (
            <>
                <div>
                    <AddNewItemFormFunction addItem={this.addTodoList}/>
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

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

