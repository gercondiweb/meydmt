exports.success = function(req, res, body = {}, status = 200){
    res.status(status).send({
        error : false,
        status,
        body

    });
}

exports.error = function(req, res, body = { message: 'Error Interno' }, status = 500){
    res.status(status).send({
        error : true,
        status,
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