

// const express = require ('express');
// const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware');

// const router = express.Router();

// // AuthRoutes

// router.post("/register", registerUser); // Register User
// router.post("/login", loginUser); //Login User
// router.get("/profile", protect, getUserProfile)  // Get User Profile
// router.put("/profile", protect, updateUserProfile) // Update Profile

// router.post("/upload-image", upload.single("image"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded"});

//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//         req.file.filename
//     }`;
//     res.status(200).json({ imageUrl });
// });

// module.exports = router;


const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configuration Multer pour upload d'image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier de destination
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nom de fichier unique
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// AuthRoutes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); //Login User
router.get("/profile", protect, getUserProfile); // Get User Profile
router.put("/profile", protect, updateUserProfile); // Update Profile

// Upload image
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;
