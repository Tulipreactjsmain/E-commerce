import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import {
  sendProductsToDB,
  getProductsByCondition,
  getAllProducts,
  getProductsCategory,
  getOneProduct,
  searchProducts,
  likeProduct,
  dislikeProduct,
  getIsFeaturedProducts,
  getSavedProducts,
} from "../controllers/product.js";

const router = express.Router();

//post request
router.post("/sendproducts", sendProductsToDB);
router.get("/condition", getProductsByCondition);
router.get("/:category", getProductsCategory);
router.get("/title/:slugTitle", getOneProduct);
router.get("/featured/product", getIsFeaturedProducts);
router.get("/", getAllProducts);
router.get("/search/product", searchProducts);
router.put("/:productId/like", verifyToken, likeProduct);
router.put("/:productId/dislike", verifyToken, dislikeProduct);
router.get("/usersaved/:username", verifyToken, getSavedProducts);

export default router;
