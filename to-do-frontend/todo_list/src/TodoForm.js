import React from 'react';


class TodoForm extends React.Component {
    constructor() {
        super();

        // this.state= {
        //     task: 'add a task'
        // }
        
        // Bind some buttons
        this.collectFormData = this.collectFormData.bind(this);
    }

    /*------------------------------*/ 
    collectFormData(event) {
        // Prevents the page from refreshing? removes default behaviour
        event.preventDefault();

        // First collect the task 
        let task = this.refs.taskName.value;
        
        // Force empty string. 
        this.refs.taskName.value =''
        
        // console.log('what is this task', task);
        
        // then call this.props.formSubmit(this calls the Add handler function)
        this.props.formSubmit(task);
            
    }
    
    render() {
        return(
            <form onSubmit={this.collectFormData}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </span>
                    <input className="form-control" ref="taskName" placeholder="add a todo" />
                </div>
            </form>
            
        )
    }
}

export default TodoForm;