// routes/cart.js

const express = require("express");
const router = express.Router();
const Wishlist = require("../Models/WishlistDataModel");
const User = require("../Models/userRegistration"); // Import your User model

const authenticateToken = require("../MiddleWare/authMiddleware"); // Import the authenticateToken middleware

// Add item to cart
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const { email } = req.user; // Corrected line

    // Find the user based on the email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the userId from the user document
    const userId = user._id;

    // Find or create a cart for the user
    let wishlist= await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [productId] });
    } else {
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
      }
    }

    // Save the cart
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove item from cart
router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const {email}=req.user;


    const user=await User.findOne({email});
    const userId = user._id;
    console.log(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Filter out the productId from the cart items
    wishlist.items = wishlist.items.filter((item) => item !== productId);

    // Save the updated cart
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
    try {
      const { email } = req.user;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userId = user._id;
  
      let wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      res.json(wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  module.exports = router;