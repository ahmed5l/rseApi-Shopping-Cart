
const express=require('express');
const { route } = require('express/lib/application');
const router=express.Router();
const mainController=require('../controllers/main.controller')
const productController=require("../controllers/product.controller")
const orderController=require('../controllers/order.controller')
const checkAuth=require('../middleware/check-auth')
router.post("/signup",mainController.signUp)
router.get("/signin",mainController.signIn)
router.patch("/updateuser/:id",mainController.updateUser)
router.delete('/deleteuser/:id',mainController.deleteUser)

///////////////////////////////////////////Product//////////////////////

router.post("/addproduct" ,checkAuth,productController.upload.single('productImage'),productController.addProduct)
router.get("/product" ,productController.product)
router.get("/addproduct/:productID",productController.getOneProduct)
router.patch("/addproduct/:productID",productController.updateProduct)
router.delete("/addproduct/:productID",productController.deleteProduct)

////////////////////////////////////////////////////Order////////////////////

router.post("/addorder" ,orderController.addOrder)
router.get("/getOrder",orderController.getOrder)
router.patch("/addorder/:orderId",orderController.updaetOrder)
router.delete("/addorder/:orderId",orderController.deleteProduct)
module.exports=router;