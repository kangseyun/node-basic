
exports.up = function(knex) {
    return knex.schema
        .createTable('user', function(table) {
        table.increments('id').primary().notNullable();
        table.string('name', 10).notNullable();
        table.string('email', 30).notNullable();
        table.string('password', 20).notNullable();
        table.string('token');
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('user');
};