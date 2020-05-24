import axios from "axios"


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/todo-lists`,
    withCredentials: true,
    headers: {"API-KEY": "560e0ced-9b74-42d5-a2a9-b5428df05bfc"}

})

export const api = {
    createTask (todoListId, newText) {
        return instance.post(`/${todoListId}/tasks`,  {title: newText})
    },
    createTodoList (title) {
        return instance.post(`/`,{title: title})
            .then(res => res.data)
    },

    uploadTodolists () {
        return instance.get(`/`)
            .then(res => res.data)
    },

    deleteTodoList (id) {
        return instance.delete(`/${id}`)
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`${todolistId}/tasks/${taskId}`)
    },

    getTasks(id) {
        return instance.get(`/${id}/tasks`)
    },

    updateTasks(newTask) {
        return instance.put(`/tasks/`, newTask,
            {withCredentials: true,
                headers: {"API-KEY": "560e0ced-9b74-42d5-a2a9-b5428df05bfc"}})
    },
    updateTodoList(todolistId, todolistNewTitle){
        return instance.put( `/${todolistId}`,{title: todolistNewTitle})
    }
}

export const loginAPI = {
    login (email, password, rememberMe, captcha = null) {
        return axios.post(`https://social-network.samuraijs.com/api/1.0/auth/login`,
            {email, password, rememberMe, captcha},
            {withCredentials: true, headers: {"API-KEY": "560e0ced-9b74-42d5-a2a9-b5428df05bfc"}})
    }
};

export const authAPI = {
    me() {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true, headers: {"API-KEY": "560e0ced-9b74-42d5-a2a9-b5428df05bfc"}})
    }
};

export const SecurityAPI = {
    getCaptchaUrl () {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/security/get-captcha-url`,
            {withCredentials: true})
    },
};


