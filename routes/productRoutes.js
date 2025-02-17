import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productListController, productPhotoController, productCountController, updateProductController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } from "../controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get routes
router.get('/get-product',getProductController)

//single product
router.get("/get-product/:slug",getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid",relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get('/braintree/token',braintreeTokenController);

//payment
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router;
