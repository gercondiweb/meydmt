exports.success = function(req, res, body = {}, status = 200, message){
    res.status(status).send({
        error : false,
        status,
        message,
        body
    });
}

exports.error = function(req, res, body , status = 500, message = 'Error Interno'){
    res.status(status).send({
        error : true,
        status,
        message,
        body
        
    });
}

exports.toClient = function (
    message = undefined,
    data = {},
    error = undefined
) {
    return {
        message,
        data,
        error
    }
}