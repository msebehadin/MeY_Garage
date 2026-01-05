export const requiredRole=(...roles:any)=>{
  return (req:any,res:any,next:any)=>{
    const user=req.user;
    if(!user){
      return res.status(401).json({message:'unauthorized'})
    }
    if(!roles.includes(user.role)){
      return res.status(403).json({
        message:'forbidden:insufficient role'
      })
    }
    next()
  }
}