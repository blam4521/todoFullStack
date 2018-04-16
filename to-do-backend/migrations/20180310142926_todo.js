
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todo', (table) => {
  	table.increments('id').primary();
  	table.text('tasks').notNullable();
  	table.boolean('done').defaultTo(false).notNullable();
  })
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('todo');
  
};
