
import React from 'react';
import './App.css';
import TodoListFooter from './TodoListFooter';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();

    }

    state = {
        tasks: [
            {title: 'JS', isDone: true, priority: "low" },
            {title: 'CSS', isDone: false, priority: "low" },
            {title: 'React', isDone: false, priority: "low"},
            {title: 'Redux', isDone: true, priority: "low"},
            {title: 'NodeJS', isDone: false,priority: "low"},
            {title: 'AngularJS', isDone: false, priority: "medium"}
        ],
        filterValue: 'All'
    };

    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone:  false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: newTasks
        })
    }
    /*
    onAddTaskClick = () => {

         let newTitle = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = '';





    let newTasks = [...this.state.tasks, newTask]
    this.setState({
        tasks: newTasks
    })
}
*/
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map( t => {
            if (t != task){
                return t;
            }
            else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({
            tasks: newTasks
        })
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    {/*
                        <div className="todoList-header">
                            <h3 className="todoList-header__title">What to Learn</h3>
                            <div className="todoList-newTaskForm">
                                <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                                <button onClick={this.onAddTaskClick}>Add
                                </button>
                            </div>
                        </div>
                    */}
                    <TodoListTasks changeStatus={this.changeStatus}
                                   tasks={this.state.tasks.filter(t => {
                                       switch (this.state.filterValue) {
                                           case "All":
                                               return true;
                                           case 'Active':
                                               return !t.isDone;
                                           case 'Completed':
                                               return t.isDone;
                                               break;

                                       }

                                   })}/>
                    {/*
                        <TodoListTasks tasks={this.state.tasks.filter(t => {
                            if (this.state.filterValue == 'All') {
                                return true;
                            }
                            if (this.state.filterValue == 'Active') {
                                return !t.isDone
                            }
                            if (this.state.filterValue == 'Completed') {
                                return t.isDone
                            }
                        })}
                        />
                    */}
                    <TodoListFooter changeFilter={this.changeFilter}     filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

