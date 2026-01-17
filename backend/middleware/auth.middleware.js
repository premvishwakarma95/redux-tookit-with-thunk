import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
   try {
     const {token} = req.cookies;
    //  console.log("token",token);
     if(!token){
         return res.status(400).json({
             success:false,
             message:"user is not authenticated"
         })
     }
     const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
     if (!decodedToken) {
        return res.status(400).json({
            success:false,
            message:"user are not authenticated"
        })
      }
     req.user = decodedToken;
     next();
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

export default isAuthenticated;

