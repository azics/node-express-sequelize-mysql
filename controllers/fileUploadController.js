const multer = require('multer');

exports.fileUpload = async (req, res) => {
    
    try {
        const storage = multer.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        });
        const upload = multer({ storage: storage });
        const file = req.file;

        res.status(201).json({ status: 'ok', message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
            
    }
  };