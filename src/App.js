import React from 'react';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";



class App extends React.Component{

    componentDidMount() {
        this.restoreState();
    }

    nextTodoListId = 0;

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("todolists-", stateAsString);
    }
    restoreState = () => {
        // объявляем наш стейт стартовый
        let state = this.state;

        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem("todolists-" );
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.todoLists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        });
    }

    addTodoList = (newTodoListName) => {
        let newTodoList = {
            title: newTodoListName,
            id: this.nextTodoListId,
            tasks: []
        }
        this.props.addTodoList(newTodoList)
        this.nextTodoListId++;
        // this.setState({
        //     todoLists: [...this.state.todoLists, newTodoList]},
        //      this.saveState)
    }
    render() {
debugger
        const todoLists =
            this.props
                .todolists
                .map(t=> <TodoList key={t.id} id={t.id} title={t.title}
                                   tasks={t.tasks} /> )

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>

            <div className='App'>
                {todoLists}
            </div>
                </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            const action = {
                type: 'ADD-TODOLIST',
                newTodoList: newTodoList
            };
            dispatch(action)
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;





