const express = require('express');
const { register, login, filterUsers } = require('../controller/auth_controller');
const { userlist, userdetail } = require('../controller/users_controller');
const { addAddress, listAddress, updateAddress, detailAddress, allAddress } = require('../controller/address_controller');
const { createSubcategory, deleteSubcategory, fetchSubslist, updateSubs } = require('../controller/subcategory_controller');
const { addCategory, categorylist, deleteCategory } = require('../controller/category_controller');
const { addrole, deleterole, rolelist, updaterole } = require('../controller/roles_controller');
const { shopregister, shopdetail, shopdelete, shoplist, shopverification } = require('../controller/shop_controller');
const { following, follower, deletefollower, getFollowers, getFollowing, getPendingFollowRequests, handleFollowRequest, followlist } = require('../controller/follow_controller');
const router = express.Router();

router.post('/addrole', addrole)
router.delete('/deleterole/:id', deleterole)
router.get('/rolelist', rolelist)
router.patch('/updaterole/:id', updaterole)

router.post('/register', register)
router.post('/login', login)
router.get('/userslist', userlist)
router.get('/user/:id', userdetail)
router.get('/user/filter/:roleId', filterUsers)

router.post('/addAddress', addAddress)
router.get('/allAddress', allAddress)
router.get('/addresslist/:userId', listAddress)
router.put('/updateAddress/:id', updateAddress)
router.get('/addressDetails/:id', detailAddress)

router.post('/addCategory', addCategory)
router.get('/categorylist', categorylist)
router.delete('/deleteCategory/:id', deleteCategory)

router.post('/addSubcategory', createSubcategory)
router.delete('/deleteSubs/:id', deleteSubcategory)
router.get('/subslist', fetchSubslist)
router.patch('/updateSubs/:id', updateSubs)

router.get('/shoplist', shoplist)
router.post('/register_shop', shopregister)
router.get('/shopdetail/:id', shopdetail)
router.delete('/deleteshop/:id', shopdelete)
router.patch('/shop_verification/:id', shopverification)

router.post('/follow', following);
router.post('/follow/status', follower);
router.delete('/followdelete/:followingId', deletefollower);
router.get('/followers/:followerId', getFollowers);
router.get('/following/:followingId', getFollowing);
router.get('/followers/pending/:userId', getPendingFollowRequests);
router.post('/followers/handle-request', handleFollowRequest);
router.get('/followlist', followlist)

module.exports = router;