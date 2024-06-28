const { sendErrorResponse, sendSuccessResponse, sendUploadSuccess } = require('../ultis/response');
require('dotenv').config();

let upload = async (req, res) => {
    if(!req.file)  {
        return sendErrorResponse(res,'Upload failed: No file uploaded.',400);
    }
    const formatPath = req.file.path.replace(/\\/g, '/');
    const filePath = formatPath.replace('src/public', 'static');
    return sendUploadSuccess(res,{url: `${process.env.DOMAIN}${filePath}`});
}

module.exports = {
    upload
};
