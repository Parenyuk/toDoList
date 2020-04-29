import {createStore} from "redux";


const initialState = {
    todolists: [
        {id: 0, title: 'Monday', tasks: [] },
        {id: 1, title: 'Tuesday', tasks: [] },
    ]
}

const reducer = (state = initialState, action) => {
    let newTodolists;
    switch (action.type) {
        case 'ADD-TODOLIST':
            newTodolists = [...state.todolists, action.newTodoList]
            return {...state, todolists: newTodolists}

        case 'ADD-TASK':
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {
                        ...todo, tasks: [...todo.tasks, action.newTask]
                    }
                }
            })
            debugger
            return {...state, todolists: newTodolists}
        case 'CHANGE-TASK':
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {
                        ...todo, task: [...todo.tasks.map(task => {
                            if (task.id !== action.taskId) {
                                return task
                            }
                            else {
                                return {...task, ...action.obj}
                            }
                        })]
                    }
                }
            })

            return {...state, todolists: newTodolists}
        case 'DELETE-TODOLIST':
            return {...state,
                todolists: state.todolists.filter(todolist =>
                todolist.id != action.todolistId)}
    },
    case 'DELETE-TASK':
        return {
            ...state,
            todolists: : state.todolists.map(todo => {
                if (todo.id !==action.todolistId ){
                    return todo
                } else {
                    return {...todo, tasks: todo.tasks.filter(task=> task.id)}
                }
    })
        }
    return state;
}
const store = createStore(reducer);
export default store;