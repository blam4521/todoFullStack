// Boiler plate imports
const cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS")
    // res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const knex = require('knex')({
	client: 'postgres',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'postgres',
		database: 'todo',
		charset: 'utf8'
	}
});

const bookshelf = require('bookshelf')(knex);

//Make a model for todo
const Todo = bookshelf.Model.extend({
	tableName: 'todo'
})

// Reading back all rows from a table
app.get('/', (req, res) => {
    Todo.fetchAll()
        .then(todos => {
            todos = todos.models.map(todo => {
                return todo.attributes;
            });
        // once we have todos
        // send em back using the res object
        // ( we are using res.json bc we 
        // are sending js data)
        console.log("TODOS:" ,todos);

        // save back javascript data
        res.json(todos);
    })
    .catch(error => {
        console.log(error)
    })
});

// Post back to server
app.post('/todos', (req, res)=>{
    console.log('request body returns this:', req.body)
    const addTodo = new Todo(req.body);
    
    addTodo.save()
    	.then(savedTodo => {
    		console.log(savedTodo)
            res.json(savedTodo)
    	})
    	.catch(error=> {
    		console.log(error)
    	})
    
})

// Update the item on the server
app.put('/:id', (req, res) => {
    
    // console.log('req is: ', req)    
    // let updateData = {
    //     id : req.params.id,
    //     done: true
    // }

    
    const todo_id = req.params.id,
            todo_done = req.body.done;

    new Todo({id: todo_id, done: todo_done  })
        .save()
        .then(result => {
            console.log('RESULTS for this are: ', result);
            res.json(result)
        })

        .catch(error => {
            console.log(error);
        });
    
})

// Delete the item from server
app.delete('/:id', (req, res) => {
	const todo_id = req.params.id
	
    new Todo({id: todo_id })
        .destroy()
        .then(result => {
            console.log(result);
            res.json(result);
        })
        
        .catch(error => {
            console.log(error);
        });
        
        
})


app.listen(8080, () => {
    console.log('i am listening on 8080');
})