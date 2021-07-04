var express = require('express');
var router = express.Router();
const authController = require('../controller/authController')
const userController = require('../controller/userController')
// const accountController = require('../controller/accountController')
const path = require('path');
const AuthToken = require('./../middleware/auth')
// const roleController = require('../controller/roleController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/register',  async function (req, res, next) {
  let data = await authController.register(req, res);
  res.send(data)
})

router.get('/verify', async function (req, res, next) {
  let data = await authController.conformmail(req, res);
  res.send(data);
})

router.post('/login', async function (req, res, next) {
  let data = await authController.login(req, res);
  res.send(data);
})



router.put('/update', AuthToken, async function (req, res, next) {
  let data = await userController.updateUser(req, res)
  res.send(data)
})
router.get('/profile/:id', AuthToken, async function (req, res, next) {
  const id = req.params.id;
  let data = await userController.getUser(id)
  res.send(data)
})
router.delete('/profile/:id', AuthToken, async function (req, res, next) {
  const id = req.params.id;
  let data = await userController.deleteUser(id)
  res.send(data)
})
router.get('/fogotpassword', async function (req, res) {
  res.sendFile(path.resolve('./views/forgotpassword.html'))
})

router.post('/forgotpasswordrequest', async function (req, res) {
  let data = await authController.forgotpasswordrequest(req, res)
  res.send(data)
})

router.post('/forgotpage', async function (req, res) {
  let data = await authController.forgotpassword(req, res)
  res.send(data)
})

router.post('/logout', AuthToken, async function (req, res) {
  let data = await authController.logOut(req, res)
  res.send(data)
})

router.get('/', AuthToken, async function (req, res, next) {
  let data = await userController.getUsers(req, res);
  res.send(data);
})
router.get('/:id', AuthToken, async function (req, res, next) {
  const id = req.params.id;
  let data = await userController.getUserByID(req, id);
  res.send(data);
})

module.exports = router;
