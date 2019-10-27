var express = require('express');
var router = express.Router();
var Expense=require('../Model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('expenseform');
});


router.post('/add',function(req,res){
  var expense=new Expense();
  expense.medicine=req.body.medicine;
  expense.cost=req.body.cost;

  expense.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/list');
  })
})
  router.get('/list',function(req,res){
    Expense.find(function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.render('expensetable',{expense:rtn});
    })
  })

  router.get('/updateRec/:id',function(req,res){
    Expense.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);
      res.render('updateexpense',{expense:rtn});
    })
  })

  router.get('/delete/:id',function(req,res){

    Expense.findByIdAndRemove(req.params.id,function(err,rtn){
      if(err)throw err;
      res.redirect('/list');
    })

  })

  router.post('/update',function(req,res){
    var updateData={
      medicne:req.body.medicine,
      cost:req.body.cost
}
   Expense.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.redirect('/list');
    })
  })
module.exports = router;
