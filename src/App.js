import React from 'react';
import './App.css';
import TodoListFooter from './TodoListFooter';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    tasks = [
        {title: 'JS', isDone: true, priority: "low" },
        {title: 'CSS', isDone: false, priority: "low" },
        {title: 'React', isDone: false, priority: "low"},
        {title: 'Redux', isDone: true, priority: "low"},
        {title: 'NodeJS', isDone: false,priority: "low"},
        {title: 'AngularJS', isDone: false, priority: "medium"}
    ];
    filterValue = 'All'


    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks  tasks={this.tasks} />
                    <TodoListFooter filterValue={this.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

