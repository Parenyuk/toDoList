import React, {Component} from 'react';


class AddNewItemForm extends Component {


    onAddItemClick = () => {
        let newTitle = this.state.title;
        this.setState({title: ''})
        if (newTitle === "") {
            this.setState({error: true})
            // сетаем в стейт {error: true}
        } else {
            this.setState({error: false})
            // сетаем в стейт {error: false}
            // отправляем родителю название таски
        }

        this.props.addItem(newTitle);
    };

    state = {
        error: false,
        title: ''
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick()
        }
    }

    render = () => {
        let classNameForInput = this.state.error ? "error" : "";
        return (
            <div className="todoList-newTaskForm">
                <input type="text" placeholder="New item name"
                       className={classNameForInput}
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>

        )
    }
}

export default AddNewItemForm;
/*
this.state.error ? 'error' : '';
 let inputError =  this.state.error  ? 'error' : ''
 */