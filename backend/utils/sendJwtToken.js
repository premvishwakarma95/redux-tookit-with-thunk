const sendJwtToken = (message,statusCode,user,res) => {
    console.log("yes");
    const token = user.generateJWTToken();
    console.log("no");
    const cookieOptions = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,cookieOptions).json({
                            success:true,
                            message,
                            user,
                            token
                          });
}

export default sendJwtToken;