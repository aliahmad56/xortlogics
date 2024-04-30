
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.post('/createuser', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/update/:userId', userController.updateUserById);
router.get('/search', userController.searchUsers);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
