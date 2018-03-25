var { User, Board, Reply } = require('../model');

exports.boardWrite = async (req, res) => {
  const { type, title, content } = req.body
  const user = req['api'];
  
  var board = new Board({
      id: null,
      title: title, 
      content: content, 
      type: type,
      author: user.get('id')
  });

  try {
      var obj = await board.save(null, { method: 'insert'});
      res.send(200, obj)  
  } catch (error) {
      res.send(400, error);  
  }
}

exports.boardDelete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const board = await Board.where({id: id}).destroy();
    res.send(200, "{code: 200}"); 
  } catch (error) {
    res.send(400, error); 
  }
}

exports.replyDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const reply = await Reply.where({id: id}).destroy();
    res.send(200, "{code: 200}"); 
  } catch (error) {
    res.send(400, "error"); 
  }
}

exports.boardAll = async (req, res) => {
  var board = await Board.fetchAll();
  res.send(200, board);  
}

exports.boardPager = async (req, res) => {
  const id = req.params.id;
  const user = req['api'];
  const type = req.query.type || 1;
  const search = req.query.search;

  if(search) {
    var board = await Board.where({type:type}).where('title', 'LIKE', '%'+search).orderBy('id', 'DESC').fetchAll();
  }
  else {
    var board = await Board.where({type:type}).orderBy('id', 'DESC').fetchAll();
  }



  const start = (id-1) * 10;
  const end = id * 10;
  var result = board.slice(start, end)

  for(var i = 0;i<result.length; i++) {
    const response_user = await User.where({id:result[i].get('author')}).fetch();
    result[i].set({user:response_user});
    if(result[i].get('author') == user.id) {
      result[i].set({check: 1})
    } else {
      result[i].set({check: 2})
    }
  }

  const obj = {
    count: board.length,
    result
  }

  res.send(200, obj);  
}

exports.board = async (req, res) => {
  const id = req.params.id;
  const board = await Board.where({id: id}).fetch();
  const user = req['api'];

  if(!board) {
    res.send(400);
  }
  
  const response_user = await User.where({id:user.get('id')}).fetch();
  board.set({user: response_user})
  if(board.get('author') == user.get('id')) {
    board.set({check:1})
  } else {
    board.set({check:2})
  }

  const reply = await Reply.where({board: board.get('id')}).fetchAll();
  
  for(var i = 0;i<reply.length; i++) {
    const response_user = await User.where({id:reply.models[i].get('user')}).fetch();
    reply.models[i].set({user:response_user});
    console.log(user.get('id'));
    if(reply.models[i].get('user').get('id') == user.get('id')) {
      reply.models[i].set({check: 1})
    } else {
      reply.models[i].set({check: 2})
    }
  }
 
  var obj = {
    board: board,
    reply: reply
  }

  res.send(200, obj); 
}

exports.replyWrite = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body
  const board = await Board.where({id: id}).fetch();
  const user = req['api'];

  if(!board) {
    res.send(400);
  }

  var reply = new Reply({
    id: null,
    content: content, 
    board: board.get('id'),
    user: user.get('id')
  });

  try {
    const obj = await reply.save(null, { method: 'insert'});
    res.send(200, obj); 
  } catch(error) {
    res.send(400, error); 
  }
}