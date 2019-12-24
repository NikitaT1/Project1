import axios from "axios"


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/todo-lists`,
    withCredentials: true,
    headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"}

})

export const api = {
    createTask (todoListId, newText) {
        return instance.post(`/${todoListId}/tasks`,  {title: newText})
    },
    createTodoList (title) {
        return instance.post(`/`,{title: title})
    },

    uploadTodolists () {
        return instance.get()
    },

    deleteTodoList (id) {
        return instance.delete(`/${id}`)
    },
    deleteTask(id) {
        return instance.delete(`/tasks/${id}`)
    },

    getTasks(id) {
        return instance.get(`/${id}/tasks`)
    }

}