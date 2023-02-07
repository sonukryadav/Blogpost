import jwt from "jsonwebtoken"


const auth = async (req, _, next) => {
    try {
        const secret = process.env.SECRET_KEY;
        const token = req.headers.authorization?.split(" ")[1]
        const isCustomAuth = token?.length < 500

        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret)
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        console.log("Secret key in try : " + secret);


        next()
    } catch (error) {
        console.log(error.message)
    }
}

export default auth
