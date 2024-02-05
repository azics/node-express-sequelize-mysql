exports.fileUpload = async (req, res) => {
    try {
      res.status(201).json({ status: 'ok', message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ status: 'nok', error: 'Internal Server Error' });
    }
  };