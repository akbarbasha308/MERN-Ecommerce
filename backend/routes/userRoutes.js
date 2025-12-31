import express from 'express'
const router=express.Router()
import { adminGetAllUsers, adminGetSingleUser, deleteUser, loginUser, logout, profile, requestResetPassword, resetPassword, updatePassword, updateUserRole, updatingProfile, userRegister } from '../controllers/userController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
router.route('/register').post(userRegister)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)
router.route('/reset/forgot').post(requestResetPassword)
router.route('/reset/:token').post(resetPassword)
router.route('/profile').get(verifyUserAuth,profile)
router.route('/password/update').put(verifyUserAuth,updatePassword)
router.route('/profile/update').put(verifyUserAuth,updatingProfile)

// admin routes
router.route('/admin/users').get(verifyUserAuth,roleBasedAccess("admin"),adminGetAllUsers)
router.route('/admin/user/:id').get(verifyUserAuth,roleBasedAccess("admin"),adminGetSingleUser)
router.route('/admin/user/:id').put(verifyUserAuth,roleBasedAccess("admin"),updateUserRole)
router.route('/admin/user/:id').delete(verifyUserAuth,roleBasedAccess("admin"),deleteUser)
export default router