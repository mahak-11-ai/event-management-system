const multer = require('multer')


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      console.log("Destination called");
      console.log(file);
      cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;
