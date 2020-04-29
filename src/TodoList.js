import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";



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
        // объявляем наш стейт стартовый
        // let state = {
        //     tasks: [],
        //     filterValue: "All"
        // };
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

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        // инкрементим (увеличим) id следующей таски, чтобы при следюущем добавлении, он был на 1 больше
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask)
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks
        // }, () => { this.saveState(); });

    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeTask = (taskId, obj) => {
    
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t;
            }
            else {
                return {...t, ...obj};
            }
        });


        // this.setState({
        //     tasks: newTasks
        // }, () => { this.saveState(); });
    }
    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId, {isDone: isDone});
    }
    changeTitle = (taskId, title) => {
        this.props.changeTask(this.props.id, taskId, {title: title});
    }
    deleteTodoList = () => {
this.props.deleteTodoList(this.props.id)
    }
    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    render = () => {

        return (
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle title={this.props.title} />
                        <button onClick={this.deleteItem}>X</button>
                        <AddNewItemForm addItem={this.addTask} />

                    </div>
                    <TodoListTasks changeStatus={this.changeStatus }
                                   changeTitle={this.changeTitle }
                                   deleteTask={this.deleteTask}
                                   tasks={this.props.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
        );
    }
}

const mapStateToProps = (state) => {
        return {

        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTask) => {
            const action = {
                type: 'ADD-TASK',
                todolistId: todolistId,
                newTask: newTask
            }
            dispatch(action)
        },
        changeTask: (todolistId, taskId, obj) => {
            const action = {
                type: 'CHANGE-TASK',
                todolistId: todolistId,
                taskId: taskId,
                obj: obj
            }
            dispatch(action)
        },
        deleteTodoList: (todolistId) => {
            const action = {
                type: 'DELETE-TODOLIST',
                todolistId: todolistId
            }
            dispatch(action)
        },
        deleteTask: (todolistId) => {
            const action = {
                type: 'DELETE-TASK',
                todolistId: todolistId
            }
            dispatch(action)
        },
    }
}


const TodolistConnect = connect(null, mapDispatchToProps)(TodoList)
export default TodolistConnect;

