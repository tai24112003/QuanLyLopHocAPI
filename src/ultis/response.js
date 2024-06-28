  const sendSuccessResponse = (res, data) => {
    res.status(200).json({ success: true, data });
  };
  
  const sendErrorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({ success: false, error: message });
  };
  
  const sendInternalErrorResponse = (res) => {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  };

  const sendUploadSuccess = (res, data) => {
    res.status(200).json({ success: true, data, url: data.url });
  };
  
  module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    sendInternalErrorResponse,
    sendUploadSuccess
  };
  