const express = require('express');

const shoppingListController = require('../controllers/shopping-list-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//router.get('/user/:uid', shoppingListController.getShoppingListByUserId);

//Middleware for authenticating
router.use(checkAuth);

router.post('/', shoppingListController.updateShoppingList);

router.get('/', shoppingListController.getShoppingList);

//router.delete('/:puid', shoppingListController.deleteShoppingList);

module.exports = router;
