const GlobalErrorHandler = (err, req, res, next)=>{

    return res.status(err.statusCode || 500).json({
        error : err.message || "An error occurred on the server",
    })
}

module.exports = GlobalErrorHandler;