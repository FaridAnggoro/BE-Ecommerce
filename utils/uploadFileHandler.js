import multer from "multer";
import path from "path";

// format file
const FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // validasi format file
    const isValidFormat = FILE_TYPE[file.mimetype];
    let uploadError = new Error("Format gambar wajib bertipe png, jpeg, png");

    // kondisi
    if (isValidFormat) {
      uploadError = null;
    }

    // tempat penyimpanan
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    // file name harus unik
    const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFile);
  },
});

export const upload = multer({ storage: storage });
