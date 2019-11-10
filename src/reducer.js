export const ADD_TODOLIST = "Todolist/Reducer/ADD-TODOLIST";
export const ADD_TASK = "Todolist/Reducer/ADD-TASK";
export const CHANGE_TASK = "Todolist/Reducer/CHANGE-TASK";
export const DEL_TODOLIST = "Todolist/Reducer/DEL-TODOLIST";
export const DEL_TASK = "Todolist/Reducer/DEL_TASK";
export const SET_TODOLIST = "Todolist/Reducer/SET_TODOLIST";



const initialState = {
    todoLists: [],
}

const reducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case SET_TODOLIST:
            return {
                ...state, todoLists: action.todolists

            }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodolist]
            }
        case ADD_TASK: {
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
        case CHANGE_TASK: {
            return {
                ... state,
                todoLists: state.todoLists.map (todolist => {
                    if (todolist.id === action.todolistId) {
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
            }
        }
        case DEL_TODOLIST: {
            debugger
            return {
                ...state,
                todoLists: state.todoLists.filter(t => {
                    debugger
                    return t.id !== action.todolistId
                })
            }
        }
        case DEL_TASK: {
            return {
                ... state,
                todoLists: state.todoLists.map (t => {
                    if (t.id === action.todolistId) {
                        return {...t,
                            tasks: t.tasks.filter (task => task.id !== action.taskId)
                        }
                    }
                    else {
                        return t
                    }
                })

            }
        }

        default: return state
    }
}

export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId}
};

export const changeTaskAC = (obj, taskId, todolistId) => {
    return {type: CHANGE_TASK, obj, taskId, todolistId}
};

export const delTaskCallAC = (todolistId, taskId) => {
    return {type: DEL_TASK, todolistId, taskId}
};

export const addTodoAC = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist}
};

export const delTodoListAC = (todolistId) => {
    return {type: DEL_TODOLIST, todolistId}
};

export const setTodoListsAC = (todolists) => {
    return {type: SET_TODOLIST, todolists}
};



export default reducer;