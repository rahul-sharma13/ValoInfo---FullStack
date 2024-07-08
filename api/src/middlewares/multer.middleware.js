import multer from "multer";

// using disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // storing files at public/temp folder
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });