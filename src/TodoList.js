import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, updateTaskAC} from "./reducer";
import axios from "axios";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    }
    restoreState = () => {

        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': '9f30f44f-419b-4bf8-bd04-721891f6ba94'}
            })
            .then(response =>  {

                    if(!response.data.error) {
                        this.props.setTasks(response.data.items, this.props.id)
                    }

                }
            )

    }


    __restoreState = () => {
        // объявляем наш стейт стартовый
        let state = this.state;
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
    }

    // nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {

        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                title: newText,

            },
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '9f30f44f-419b-4bf8-bd04-721891f6ba94'
                }
            }
        )
            .then( response => {

                    if(response.data.resultCode === 0) {
                        let newTask = response.data.data.item
                        this.props.addTask(newTask);
                    }
                }
            )
        // let newTask = {
        //     id: this.nextTaskId,
        //     title: newText,
        //     isDone: false,
        //     priority: "low"
        // };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше
        this.nextTaskId++;
        /* let newTasks = [...this.state.tasks, newTask];
         this.setState( {
             tasks: newTasks
         }, () => { this.saveState(); });*/
        // this.props.addTask(newTask, this.props.id);

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    }

    changeTask = (task, obj) => {
        let newTask = {...task, ...obj}

        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            newTask,
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '9f30f44f-419b-4bf8-bd04-721891f6ba94'
                }
            }
        )
            .then(response => {

                if(response.data.resultCode === 0) {
                    this.props.updateTask(response.data.data.item);
                }
            })

    }

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title});
    }

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '9f30f44f-419b-4bf8-bd04-721891f6ba94'
                }
            }
        )
            .then(response => {

                if (response.data.resultCode === 0) {

                    this.props.deleteTodolist(this.props.id);
                }
            })

    }

    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '9f30f44f-419b-4bf8-bd04-721891f6ba94'
                }
            }  )
            .then(response => {
                debugger
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(taskId, this.props.id);
                }
            })

    }

    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist}/>
                    <AddNewItemForm addItem={this.addTask}/>

                </div>

                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   if (this.state.filterValue === "All") {
                                       return true;
                                   }
                                   if (this.state.filterValue === "Active") {
                                       return t.status === 0;
                                   }
                                   if (this.state.filterValue === "Completed") {
                                       return t.status === 2;
                                   }
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask) {

            //const action = addTaskAC(newTask, todolistId);
            dispatch(addTaskAC(newTask));
        },
        updateTask(task) {

            const action = updateTaskAC(task);
            dispatch(action);
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTaskAC(todolistId, taskId);
            dispatch(action)
        },
        setTasks(tasks, todoListId)  {

            dispatch(setTasksAC(tasks, todoListId))
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

