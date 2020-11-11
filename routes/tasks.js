var express = require('express');
var router = express.Router();

// reference tasks model

const Task = require('../models/task');

// use the task model to fetch a list of tasks and pass these to the view to display.

/* GET tasks index view. */
router.get('/', (req, res, next) => {

  Task.find((err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('tasks/index', { result: result })
    }
  }
  )
});

/* GET tasks index view. */
router.get('/form', (req, res, next) => {

  res.render('tasks/form', { title: "Add the tasks for form" })
})

/* post tasks index view. */
router.post('/form', (req, res, next) => {
  Task.create({
    name: req.body.name,
    priority: req.body.priority
  }, (err, task) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/tasks');
    }
  })
})

/* delete tasks index view. */
router.get('/delete/:_id', (req, res, next) => {
  console.log(`id=>${req.params._id}`);
  _id=req.params._id;
  Task.deleteOne({
    _id: _id
  }, (err, task) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/tasks');
    }
  })
})

/* edit tasks index view. */
router.get('/edit/:_id', (req, res, next) => {
  //res.render('/tasks/edit',{title:'edit'});
  
let _id = req.params._id;

  // if (Task.findById({
  //   _id:_id
  // }
  // )) {
  //   console.log("Found a pers0n"); 
  // }
  
   Task.findById(_id, (err,tasks) => {
     if (err){
       console.log(err);
       res.end(err);
     }
     
     else{
      res.render('tasks/edit',
      { 
        title: "edit the tasks for form", tasks: tasks })
     }

   })

 
  // Task.deleteOne({
  //   name: req.params.name
  // }, (err, task) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/tasks');
  //   }
  // })
})

module.exports = router;