const Choice = require('../models/choice');
const { sendSuccessResponse, sendErrorResponse } = require('../ultis/response');


let remove = async (req, res, next) => {
    try{
        let choiceId = req.params.id;
        let choice = await Choice.findByPk(choiceId);

    await choice.destroy();
    return sendSuccessResponse(res,[]);
    }catch(e){
        return sendErrorResponse(res,'Can not delete');
    }
}
module.exports = {
    remove
};
