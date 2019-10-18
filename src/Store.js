import {createStore} from "redux";

const initialState = {
    todoLists: [{id: 0, title: "React", tasks: [{id: 0, title: "new", isDone: false, priority: "low"}]},
        {id: 1, title: "Redux", tasks: [{id: 1, title: "newOne", isDone: false, priority: "low"}]},
        {id: 2, title: "JS", tasks: []}]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodolist]
            }
        case "ADD-TASK": {
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        }
        case "CHANGE-TASK": {
            return {
                ... state,
                todoLists: state.todoLists.map (todolist => {
                    if (todolist.id === action.taskId) {
                        return{... todolist,
                            tasks: todolist.tasks.map(task=> {
                                if (task.id === action.taskId) {
                                    return {... task, ...action.obj}
                                }else {
                                    return task
                                }
                            })}
                    } else {
                        return todolist
                    }
                })

                /*    ...state,
                    todoLists: state.todoLists.map(t => {
                        if (t.id != action.taskId) {
                            return t;
                        } else {
                            return {...t, tasks.map(t=> {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return [...t.tasks, ...action.obj]
                                }
                                })
                        }
                    })*/


            }
        }

        default: return state
    }
}



const store = createStore(reducer);
export default store;