
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
    nextTaskId = 0;

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [
            // {id: 0,  title: 'JS', isDone: true, priority: "low" },
            // {id: 1,  title: 'CSS', isDone: false, priority: "low" },
            // {id: 2,  title: 'React', isDone: false, priority: "low"},
            // {id: 3,  title: 'Redux', isDone: true, priority: "low"},
            // {id: 4,  title: 'NodeJS', isDone: false,priority: "low"},
            // {id: 5,  title: 'AngularJS', isDone: false, priority: "medium"}
        ],
        filterValue: 'All'
    };
    saveState = () => {
      localStorage.setItem('our-state', JSON.stringify(this.state))
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
      let stateAsString =  localStorage.getItem('our-state')
        if(stateAsString) {
            state = JSON.parse(stateAsString);
        }
      this.setState(state, ()=> {
          this.state.tasks.forEach(task => {
          if(task.id >= this.nextTaskId){
              this.nextTaskId = task.id + 1;
          }
      })
      })
    }


    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone:  false,
            priority: "low"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask]
        this.setState({
            tasks: newTasks
        },  this.saveState)

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        },  this.saveState)
    }
    changeTask = (taskId, newPropsObj) => {
        let newTasks = this.state.tasks.map( t => {
            if (t.id !== taskId){
                return t;
            }
            else {
                return {...t, ...newPropsObj}
            }
        });
        this.setState({
            tasks: newTasks
        },  this.saveState)
    }
    changeStatus = (taskId, isDone) => {
      this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
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
                                   changeTitle={this.changeTitle}
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
                    <TodoListFooter changeFilter={this.changeFilter}     filterValue={this.state.filterValue}/>

                </div>
            </div>
        );
    }
}

export default App;

