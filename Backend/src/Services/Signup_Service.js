const SignupService = (req, res)=>{
    return res.status(200).json({
        success : true,
        message : "Signup service is working",
    });
}

module.exports = SignupService;
