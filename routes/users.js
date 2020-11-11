var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{
    id : 1,
    title : 'Audi' ,
    description : 'Latest model with fast speed and is great'
    },
    {
    id : 2,
    title : 'BMW' ,
    description : 'Latest model with fast speed and is great'
    },
    {
        id : 3,
        title : 'Audi-a8' ,
        description : 'Latest model with fast speed and is great'
        },
        {
        id : 4,
        title : 'BMW- s' ,
        description : 'Latest model with fast speed and is great'
        },]);
});

module.exports = router;
