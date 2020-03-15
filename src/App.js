import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux"
import {addTodoAC, addTodoTC, setTodoListsAC, setTodoListsTC} from "./reducer";
// import Login from "./Login";
import LoginApp from "./LoginApp";

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


    restoreState = () => {
        this.props.setTodoLists();
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
                <div>
                    <LoginApp />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoReducer.todoLists,
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

