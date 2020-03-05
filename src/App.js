import React from 'react';
import './App.css';
import TodoListFooter from './TodoListFooter';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks />
                    <TodoListFooter />
                </div>
            </div>
        );
    }
}

export default App;

