var express = require('express');
var router = express.Router();
const Note = require( "../model/Note" );

router.post('/list', async ( req , res , next )=>
{
    if( !req.body.parent_node ) throw( new Error('知识树节点不能为空') ) ;

    const notes = await Note.find({'parent_node':req.body.parent_node}).select({"title":1,"parent_node":1,"created_at":1});
    res.json(notes);
});

router.post('/search', async ( req , res , next )=>
{
    let s = req.body.text ? {content:{$regex:new RegExp(req.body.text, 'i')}} :{};
    
    const notes = await Note.find(s).select({"title":1,"parent_node":1,"created_at":1});
    res.json(notes);
});

router.post('/detail', async ( req , res , next )=>
{
    if( !req.body.id ) throw( new Error('ID不能为空') ) ;

    const note = await Note.findOne({'_id':req.body.id});
    res.json(note);
});

router.post('/remove', async ( req , res , next )=>
{
    if( !req.body.id ) throw( new Error('ID不能为空') ) ;

    const note = await Note.findOne({'_id':req.body.id});
    if( note )
        await note.deleteOne();
    
    res.json(note);
});

router.post( '/save' , async ( req , res , next )=>
{
    if( !req.body.parent_node ) throw( new Error('知识树节点不能为空') ) ;
    if( !req.body.title ) throw( new Error('标题不能为空') ) ;
    if( !req.body.content ) throw( new Error('内容不能为空') ) ;

    // 修改
    if( req.body.id != 0 )
    {
        const note = await Note.findOne({"_id":req.body.id});
        
        if( note )
        {
            note.title = req.body.title;
            note.content = req.body.content;
            note.parent_node = req.body.parent_node;
            note.updated_at = Date.now() ;

            await note.save();

            res.json( note );
        }
        else
        {
            res.end("not found");
        }
        
    }
    else
    {
        const note = new Note(
        {
            parent_node:req.body.parent_node,
            title:req.body.title,
            content:req.body.content,
            created_at:Date.now(),
            updated_at: Date.now()
        });
    
        await note.save();
        res.json( note );
    }
    res.end();

});


module.exports = router;