import express from 'express'
import { verifyUserAuth } from '../middleware/userAuth.js'
import { roleBasedAccess } from '../middleware/userAuth.js'
const router =express.Router()
import { adminProducts, createProduct, deleteProduct, deleteReview, getAllProduct, getReviews, getSingleProduct, reviews, updateProduct } from '../controllers/productController.js'

router.route('/products').get(getAllProduct)
router.route('/admin/products/create').post(verifyUserAuth,roleBasedAccess("admin"),createProduct)

router.route("/admin/product/:id").put(verifyUserAuth,roleBasedAccess("admin"),updateProduct).delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct)
router.route("/product/:id").get(getSingleProduct)

//admin routes
router.route('/admin/products').get(verifyUserAuth,roleBasedAccess("admin"),adminProducts)
//create and update review
router.route('/review').put(verifyUserAuth,reviews)

router.route("/admin/reviews").get(verifyUserAuth,roleBasedAccess('admin'),getReviews)
router.route("/admin/reviews").delete(verifyUserAuth,roleBasedAccess('admin'),deleteReview)
export default router