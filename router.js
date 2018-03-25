const router = require('express').Router()
const { authBasic, profile, register } = require('./app/controller/auth')
const { boardWrite ,boardAll, boardPager, boardDelete, board, replyWrite, replyDelete } = require('./app/controller/board')
const { apiKey } = require('./app/middleware/apiKey')

router.post('/basicAuth', authBasic);
router.post('/register', register);
router.post('/board', apiKey, boardWrite);
router.post('/replyWrite/:id', apiKey, replyWrite);

router.get('/board', apiKey, boardAll);
router.get('/board/page/:id', apiKey, boardPager);
router.get('/board/:id', apiKey, board);

router.delete('/board/:id', apiKey, boardDelete); //글삭제
router.delete('/reply/:id', apiKey, replyDelete); //
module.exports = router