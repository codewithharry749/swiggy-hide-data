const { User } = require("../model/userSchema");


const signup = async (req, res, next) => {
    try {

        const { email, password, cpassword } = req.body;

        if (!email || !password || !cpassword) {
            res.status(500).json({
                Error: 'Plz fill all the entry currectly'
            })
        }

        if (password !== cpassword) {
            res.status(500).json({
                Error: 'Password not matched'
            })
        }
        else {
            const user = await User.create({ email, password, cpassword });
            await user.save().then(() => {
                res.status(200).json({
                    data: user,
                    massage: 'Form signup Successfull',
                    success: true
                })
            }).catch(() => {
                res.status(500).json({
                    Error: 'plz enter currect detail'
                })
            })
        }


    } catch (err) {
        console.log("Error occure in data entry")
    }
}

module.exports = { signup }