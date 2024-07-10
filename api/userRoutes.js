const router = require('express').Router();
const { signup, login } = require('./userController');

router.post('/signup', signup);
router.post('/', login);

module.exports = router;
