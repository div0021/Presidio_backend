
const requireUser = (req,res,next) => {

    const userId = res.locals.userId;

    if(!userId){
        return res.sendStatus(403)
    }
    return next()


}

export default requireUser;