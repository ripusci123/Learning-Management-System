import multer from "multer"
import path from "path"

const __dirname = path.resolve()
const destination = path.join(__dirname, 'public', 'temp');

const storage = multer.diskStorage({ //this method will return path
    destination: function (req, file, cb) {
      return cb(null, destination)
    },
    filename: function (req, file, cb) {
    
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  export const upload = multer({ storage: storage })