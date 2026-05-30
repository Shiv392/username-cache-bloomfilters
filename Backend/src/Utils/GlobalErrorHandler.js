const GlobalErrorHandler = (err, req, res, next)=>{
    console.log("Global error handler called", err);

    res.status(500).json({
        success : false,
        message : "An error occurred on the server",
    })
}

module.exports = GlobalErrorHandler;