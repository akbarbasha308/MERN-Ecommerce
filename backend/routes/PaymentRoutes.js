import express from 'express'
const router =express.Router()
import { getAPIKey } from '../controllers/paymentController.js'
import { paymentProcess } from '../controllers/paymentController.js'
import { paymentVerification } from '../controllers/paymentController.js'
import { verifyUserAuth } from '../middleware/userAuth.js'

router.route('/getKey').get(verifyUserAuth,getAPIKey)
router.route('/payment/process').post(verifyUserAuth,paymentProcess)
router.route('/paymentVerification').post(paymentVerification)



export default router