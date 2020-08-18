var express = require('express');
var router = express.Router();
const Node = require( "../model/Node" );

// router.get('/', function(req, res, next) {
//     res.send('nodes');
    
//   });
//   router.post('/test', function(req, res, next) {
//     res.send('nodes/test');
    
//   });
router.post('/', async ( req , res , next )=>
{
    let rootnode = await Node.findOne({'module':'root'});
    console.log(rootnode)
    if( !rootnode )
    {
        const root = new Node(
        {
            module:'root',
            children:[],
            collapsed:false,
            created_at:Date.now() 
        });

        await root.save();
    }

    rootnode = await Node.findOne({'module':'root'});

    res.json(rootnode);
});
router.post( '/update' , async ( req , res , next )=>
{
    const tree_json = req.body.tree;
    if( !tree_json ) throw( new Error('新的知识树不能为空') ) ;

    const tree_data = JSON.parse( tree_json );
    if( !tree_data ) throw( new Error('新的知识树结构错误') ) ;

    const rootnode = await Node.findOne({'module':'root'});
    if( !rootnode )  throw( new Error('根节点不存在') ) ;

    rootnode.children = tree_data;
    await rootnode.save();

    res.json( rootnode );

});

module.exports = router;