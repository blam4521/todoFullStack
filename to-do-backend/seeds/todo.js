
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      return Promise.all([         
         knex('todo').insert({tasks: 'woof woof'}),
         knex('todo').insert({tasks: 'meow meow'}),
         knex('todo').insert({tasks: 'oink oink'})      
      ]);  
    });
};
