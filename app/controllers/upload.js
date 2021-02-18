var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require('path');

router.use(express.static(__dirname+"./public"));

var storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  var upload = multer({
    storage : storage
  }).single('file');

module.exports.controller = function(app) {
  //route for signup
  router.post('/file' , (req, res) => {
    console.log('file upload -->', req.data);

    upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }else{
        if(req.file != null){  
          var result = {
                message : req.body.myMsg,
                replymsgId : req.body.repMsgId,
                file : req.file.filename,
              }
        res.json(result);
        }else{
            var result = {
                message : req.body.myMsg,
                replymsgId : req.body.repMsgId,
                file : "",
              }

        res.json(result);
        }
      }

    });

    })



  app.use("/upload", router);
}; //signup controller end
