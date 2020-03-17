import {api, loginAPI, authAPI, SecurityAPI} from "./api";

export const ADD_TODOLIST = "Todolist/Reducer/ADD-TODOLIST";
export const ADD_TASK = "Todolist/Reducer/ADD-TASK";
export const CHANGE_TASK = "Todolist/Reducer/CHANGE-TASK";
export const DEL_TODOLIST = "Todolist/Reducer/DEL-TODOLIST";
export const DEL_TASK = "Todolist/Reducer/DEL_TASK";
export const SET_TODOLIST = "Todolist/Reducer/SET_TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const LOGIN_FREE = "LOGIN_FREE";
export const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"


const initialState = {
    todoLists: [],
    tasks: [],
    isAuth: false,
    captchaUrl: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLIST:
            return {
                ...state, todoLists: action.todolists.map(tl => ({...tl, tasks: []}))

            }
        case SET_TASKS:
            return {
                ... state, todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl, tasks: action.allTasks
                        }
                    } else {
                        return tl
                    }
                })
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
                        return {...tl, tasks: [action.newTask, ...tl.tasks]}
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
            return {
                ...state,
                todoLists: state.todoLists.filter(t => {
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
        case LOGIN_FREE: {
            return {
                ... state, isAuth: true
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return{...state, ...action.data}
        }
        default: return state
    }
}

export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId}
};

export const changeTaskAC = (taskId, obj, todolistId) => {
    return {type: CHANGE_TASK, taskId, obj, todolistId}
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

export const setTasksAC = (allTasks, todoListId) => {
    return {type: SET_TASKS, allTasks, todoListId}
};

export const loginFreeAC = () => {
    return {type: LOGIN_FREE}
}

export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}})




export const setTodoListsTC = () => (dispatch) => {
    api.uploadTodolists()
        .then(res => {
            const action = setTodoListsAC(res.data);
            dispatch(action)
        });
};

export const delTodoListTC = (todolistId) => (dispatch) => {
    api.deleteTodoList(todolistId)
        .then((res) => {
           dispatch(delTodoListAC(todolistId))
        })
}

export const addTodoTC = (title) => (dispatch) => {
    api.createTodoList(title)
        .then(res => {
            let newTodoList = res.data.data.item;
            dispatch(addTodoAC(newTodoList))
        })
}

export const delTaskCallTC = (todolistId, taskId) => (dispatch) => {
    api.deleteTask(taskId)
        .then(res => {
            dispatch(delTaskCallAC(todolistId, taskId))
        });
}

/*export const changeTaskTC = (taskId, obj, todolistId, newTask) => (dispatch) => {
    api.updateTasks(newTask)
        .then( (res) => {
            dispatch(changeTaskAC(taskId, obj, todolistId, newTask))
        })
}*/

export const addTaskTC = (todoListId, newText) => (dispatch) => {
    api.createTask(todoListId, newText)
        .then(res => {
            let newTask = res.data.data.item;
            dispatch(addTaskAC(newTask, todoListId))
        });

}

export const setTasksTC = (tasksId) => (dispatch) => {
    debugger
    api.getTasks(tasksId)
        .then(res => {
            let allTasks = res.data.items;
            dispatch(setTasksAC(allTasks, tasksId))
        });
}

export const LoginThunk = (email, password, rememberMe, captcha) => (dispatch) => {
    loginAPI.login(email, password, rememberMe, captcha)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthThunk())
            }
            else {
                if (response.data.resultCode === 10){
                    dispatch(getCaptchaUrlThunk())
                }
            }
        });
};

export const getAuthThunk = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
       /* let {id, email, login} = response.data.data;*/
        dispatch(loginFreeAC())
    }
};

export const getCaptchaUrlThunk = () => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    debugger
    dispatch(getCaptchaUrlSuccess(captchaUrl))

};



export default reducer;