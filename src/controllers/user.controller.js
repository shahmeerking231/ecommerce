const User = require("../models/user.model");
const Product = require("../models/product.model");
const { redisClient } = require("../services/cache.service");

const profile = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("./common/profileDetails", { user });
};

const saveProfile = async (req, res) => {
  const { username, email, location } = req.body;
  const userId = req.user._id;

  if (!username || !email || !location) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, location },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const ratingProductById = async (req, res) => {
  let { rating, productId } = req.body;
  try {
    let prevRating = await Product.findById(productId).select("rating");
    if (Number(prevRating) !== 0) {
      rating = Number((prevRating.rating + rating) / 2);
    }
    let product = await Product.findByIdAndUpdate(productId, {
      rating
    })
    User.findByIdAndUpdate(req.user._id, {
      $set: { "purchaseHistory.$[elem].rated": true }
    }, {
      arrayFilters: [{ "elem.product": productId }]
    }).exec();
    if (product) {
      return res.status(200).json({ success: true, product });
    } else {
      return res.status(404).json({ success: false, message: "Product Not Found!" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal Server Error a raha ha?" });
  }
};

const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate("wishlist");
    return res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user._id;
  const cacheKey = `wishlist_${userId}`;
  try {
    let wishlist;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      wishlist = JSON.parse(cachedData);
    } else {
      wishlist = await User.findById(userId).populate("wishlist").select("wishlist");
      if (wishlist) {
        await redisClient.set(cacheKey, JSON.stringify(wishlist), {
          EX: 3600, // Cache for 1 hour
        });
      }
    }
    return res.status(200).render("./user/wishlist", {
      wishlist: wishlist.wishlist,
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render("./user/wishlist", {
      wishlist: [],
      user: req.user
    });
  }
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate("wishlist");
    return res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  profile,
  saveProfile,
  ratingProductById,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
