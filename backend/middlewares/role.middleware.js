const isAdmin = (req, res, next) => {
    if(req.userModel !== "Admin"){
        return res.status(403).json({
            message: "Access denied: Admins only"
        });
    }
    next()
};

const isUser = (req,res,next)=>{
    if(req.userModel !== "User"){
        return res.status(403).json({message: "Access denied: Users only"});
    }
    next();
}

export {isAdmin}