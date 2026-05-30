const Signup = (req, res)=>{
    res.status(200).json({
        success : true,
        message : "Signup service is working",
    });
}

module.exports = Signup;
