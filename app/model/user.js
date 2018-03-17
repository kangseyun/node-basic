// const Bookshelf = require('./')


const User = Bookshelf.Model.extend({
  tableName: 'user',
    hasTimestamps: true,
  }, 
  {
  jsonColumns: ['meta']
})
  
  
module.exports = Bookshelf.model('User', User)