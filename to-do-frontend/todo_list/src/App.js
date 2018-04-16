import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//Import Custom Components
import TodoForm from './TodoForm' 
import TodoList from './TodoList'

// state lives in this fucking file App.js
// state has to changes
// 1. add todo (function onSubmit)
// 2. toggle done value (function, onClick)
// 3. clear the ones that are done (function onClear)


class App extends Component {
  constructor() {
    super();

    // Set up dummy data.
    this.state = {
      todo: [ 
        // {
        //   task: "whatever",
        //   done: false, 
        //   visible: true
        // },
        
        // {
        //   task: "meow",
        //   done: false,
        //   visible: true
        // },
        
        // {
        //   task: "woof",
        //   done: false,
        //   visible: true
        // }
      ]
    }
    // hook up bind buttons
    // console.log(this.state.todo)
    this.addTaskHandler = this.addTaskHandler.bind(this);
    this.removeCompleteHandler = this.removeCompleteHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleDoneHandler = this.toggleDoneHandler.bind(this);
  }

  componentDidMount(){
    console.log('start of this componentDidMount method')    
    axios.get('http://localhost:8080/')
    .then(results =>{
      console.log(results.data, 'success');
      this.setState( 
        {todo: results.data} 
      );
    })
    .catch(error =>{
      console.log(error);
    })
    console.log('end of this componentDidMount method')  
  }

  /*------------------------------*/ 
  componentDidUpdate(prevProps, prevState){
    console.log('start of this componentDidUpdate method')
    if(prevState.todo !== this.state.todo) {
      console.log('this is now', this.state.todo)
      console.log('this is before', prevState.todo)
      
      }
    console.log('end of this componentDidUpdate method')  
    }
    
  /*------------------------------*/ 
  addTaskHandler(newTask) {
    
    const brandNewTask = {
      tasks: newTask,
      done: false
      // visible: true
    };
    
    // Make a copy of the dummy data
    const tasksCopy = Array.from(this.state.todo);
    // console.log("this copy",tasksCopy)
    
    tasksCopy.push(brandNewTask);
    // console.log("This is",brandNewTask)
    
    // Sending the data all the way back there in the server
    axios.post('http://localhost:8080/todos', brandNewTask )
      .then(res => {
        
        console.log('RESULTS IS:', res)
        console.log('adding task', res.data)
      })

      .catch((err)=> {
        console.log(err);
      })
    console.log('end of axios', this.state.todo)
    
    // Magic happens here to change the state.
    this.setState( 
      {todo: tasksCopy} 
      );
    
    }
  
  /*------------------------------*/ 
  handleClick(id) {
    const tasksCopy = Array.from(this.state.todo);
    console.log('The task before changes is', tasksCopy[id])

    tasksCopy[id].done = !tasksCopy[id].done
    let done = tasksCopy[id].done;
    this.setState( 
      {
        todo: tasksCopy
    })
    console.log('this is the click list after transform', this.state.todo)
  
    //Update the server done attribute
    axios.put("http://localhost:8080/" + id, {done: done}) 
    .then(res => {
      
      console.log('RESULTS IS:', res)
      console.log('Task', !res.data.done)
    })

    .catch((err)=> {
      console.log(err);
    })
  
  }
  
  /*------------------------------*/ 
  removeCompleteHandler(event) {
    
    const tasksCopy = Array.from(this.state.todo);
    console.log('this is the list BEFORE removing', tasksCopy)
    
    let incompleteTasks = [];
    let completeTasks = [];

    for(let i=0; i<tasksCopy.length; i++){
      if( tasksCopy[i].done === false){
        incompleteTasks.push(tasksCopy[i]);
      }
      else {
        completeTasks.push(tasksCopy[i]);
      }
    }
    
    // Set state on the ones that are not done 
    this.setState({
      todo: incompleteTasks
    })

    // Update the server done attribute
    for(let i = 0; i < completeTasks.length; i++ ){
      axios.delete("http://localhost:8080/" + i) 
      .then(res => {
        
        console.log('RESULTS IS:', res)
        console.log('adding task', res.data)
      })

      .catch((err)=> {
        console.log(err);
      })
    }
    console.log('this is the list after removing', incompleteTasks)
  }

   /*------------------------------*/ 
   toggleDoneHandler(value) {
    
    const tasksCopy = Array.from(this.state.todo);
    
    // Filtering would work here
    if (value==='all') {
      for(let i=0; i<tasksCopy.length; i++){
        tasksCopy[i].visible = true;
      }    
    }  
    
    else if (value==='active') {  
      for(let i=0; i<tasksCopy.length; i++){
        if (tasksCopy[i].done !== true){
          tasksCopy[i].visible = true;
        } 
        else {
          tasksCopy[i].visible = false;
        } 
      }
    } 
    
    else {
      for(let i=0; i<tasksCopy.length; i++){
        if (tasksCopy[i].done){
          tasksCopy[i].visible = true;
        } 
        else {
          tasksCopy[i].visible = false;
        } 
    } 
        
  }
  this.setState( {
    todo: tasksCopy
  })
}

  render() {
    return (
      <div className="App">
        {/* Not sure if this is the correct way of putting in JSX with bootstrap */}
        <div className="container">
          <h1 className="text-center">todos</h1>

          {/* Need a form for the add button that should be its own component */}
          <TodoForm formSubmit={this.addTaskHandler}/>

          {/* Display the list of Todo Components */}
          <TodoList 
            handleClick={this.handleClick}
            todo={this.state.todo} 
            deleteHandler={this.removeCompleteHandler} 
            doneHandler={ this.toggleDoneHandler }/>    
        </div>
      </div>
    );
  }
}

export default App;
