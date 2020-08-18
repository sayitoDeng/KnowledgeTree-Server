const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tree', {
  useNewUrlParser: true , useUnifiedTopology: true
} , err => {
  if( err ){
    console.log( "db error..." );
    process.exit();
  }else{
    console.log("db success")
  } 
});


module.exports = mongoose;