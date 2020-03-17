
// module.exports = ((req, res, next) => {
//     const error = new Error("not found");
//     error.status = 404;
//     next(error);
// })

module.exports = ((error, req, res, next) => {
    res.status(error.status || 500);
    if (error.errors) {
        res.json({
            error: {
                // message:error.message
                message: error.errors
            }
        })
    } else {
        // next(error)

        res.json({
            error: {
                // message:error.message
                message: error.message
            }
        })
    }
})