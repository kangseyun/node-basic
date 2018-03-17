// const Bookshelf = require('./')
var config = require('../../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'user'
});
  
module.exports = User;