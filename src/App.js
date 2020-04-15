import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
    state = {
        todolists: [
            // {id: '01', title: 'Victor'},
            // {id: '02', title: 'Lena'},
            // {id: '03', title: 'Sveta'},
            // {id: '04', title: 'Vika'}
        ]
    }
    nextTodoListId = 0;

    addTodolist = (newTodolistName) => {
       let newTodoList = {
           title: newTodolistName;
           id: this.nextTodoListId
       }
       this.nextTodoListId++;
       this.setState({todolists: [...this.state, todolists, newTodoList]})
    }
    render = () => {
        let todolists = this.state.todolists.map(t => {
            return <TodoList key={t.id}  title={t.title}/>
        })
        return (
            <div>
                {/*<div className='add-task'>*/}
                {/*    <input />*/}
                {/*    <button onClick={this.addTodoList}>Add</button>*/}
                {/*</div>*/}
                <AddNewItemForm addItem={addTodoList} />
                <div className='App'>
                    {todolists}
                </div>
            </div>
        )
    }
}

export default App;