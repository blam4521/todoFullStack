import React from 'react';
import TodoDisplay from './TodoDisplay'

class TodoList extends React.Component {
    
    render(){
        
        // Array from App.js
        let todoArray = this.props.todo
        console.log('this is todo list in TodoComponent', this.props.todo)
        let taskDisplayJSX = []

        todoArray.map((todo, index) => { 
            return taskDisplayJSX.push(<TodoDisplay 
                                        key={index}
                                        index={index} 
                                        handleClick={this.props.handleClick}
                                        task={todo.tasks}
                                        done={todo.done} 
                                        visible={todo.visible} />)
                
        })

        return(
            <div>
                <ul className="list-group">
                    {taskDisplayJSX}
                </ul>

                {/* THis is the delete button */}
                <button onClick = { () => this.props.deleteHandler(this.props.index) } className="pull-right btn btn-default">Clear Complete</button>


                {/* THis is the swap between active */}
                <select onChange = { (e) => this.props.doneHandler(e.target.value) }>
                    <option value="all">all</option>
                    <option value="active">active</option>
                    <option value="complete">complete</option>
                </select>
            </div>

            
        )
    }
}

export default TodoList;