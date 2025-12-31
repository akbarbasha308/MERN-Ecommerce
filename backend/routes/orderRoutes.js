import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, sampleOrder, totalOrders, updateOrderStatus } from '../controllers/orderController.js'
const router=express.Router()


router.route("/new/create").post(verifyUserAuth,createOrder)

router.route("/order/:id").get(verifyUserAuth,getSingleOrder)

router.route("/order/sample/check").get(verifyUserAuth,sampleOrder)

router.route("/admin/order/total").get(verifyUserAuth,totalOrders)

router.route("/admin/orders").get(verifyUserAuth,roleBasedAccess('admin'),getAllOrders)

router.route('/admin/order/:id').put(verifyUserAuth,roleBasedAccess('admin'),updateOrderStatus)
.delete(verifyUserAuth,roleBasedAccess('admin'),deleteOrder)


export default router

