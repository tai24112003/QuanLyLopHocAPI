const { sendErrorResponse, sendSuccessResponse, sendUploadSuccess } = require('../ultis/response');
require('dotenv').config();

let upload = async (req, res) => {
    if(!req.file)  {
        return sendErrorResponse(res,'Upload failed: No file uploaded.',400);
    }
    const filePath = req.file.path.replace('src/public', 'static');
    return sendUploadSuccess(res,{url: `${process.env.DOMAIN}${filePath}`});
}

module.exports = {
    upload
};
