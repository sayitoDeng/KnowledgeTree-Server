var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',function(req,res,next){
  if(!req.body.nickname) throw(new Error("用户名不为空"));
  if(!req.body.password) throw(new Error('密码不能为空'));

  if( req.body.nickname != process.env.NICKNAME || req.body.password != process.env.PASSWORD ) throw ( new Error('用户名或密码错误') ) ;

  const jwt = require('jsonwebtoken');
  const token = jwt.sign( { is_admin:true } , process.env.SECRET );

  res.json({token});
})
module.exports = router;
