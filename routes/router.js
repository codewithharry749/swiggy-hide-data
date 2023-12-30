const router = require('express').Router();
const { deleteacount } = require('../controllers/deleacount');
const { getdata } = require('../controllers/getdata');
const { login } = require('../controllers/login');
const { sendMail } = require('../controllers/sendMail');
const { signup } = require('../controllers/signup');
const nodemailer = require('nodemailer');
const { User } = require('../model/userSchema');
const jwt = require('jsonwebtoken')
const secretKey = "gsvfwytdfgQITYDRECGYhjegggffgtnjcnceyegftecv"
const bycrypt = require('bcryptjs');
const { orderFood } = require('../controllers/orderFood');


router.get('/getdata', getdata)
router.post('/login', login)
router.post('/signup', signup)
router.delete('/deleteacount/:id', deleteacount)

router.post('/home/sendMail', sendMail)

router.post('/sells/order',orderFood)

// send email link for reset password ....

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mtankmtank265@gmail.com',
        pass: 'slvc hsck iugg rfqm'
    }
});

router.post('/sendpasswordlink', async (req, res) => {
    const { email } = req.body;
    console.log({ email })
    if (!email) {
        res.status(500).json({ Error: 'Enter you email' })
    }
    try {
        const userExist = await User.findOne({ email: email })

        // token generate for reset password
        const token = jwt.sign({ _id: userExist._id }, secretKey, {
            expiresIn: "1d"
        })

        const setusertoken = await User.findByIdAndUpdate({ _id: userExist._id }, {
            verifytoken: token
        }, { new: true })

        if (setusertoken) {
            const mailoptions = {
                from: "mtankmtank265@gmail.com",
                to: email,
                subject: "send email for password reset",
                text: `this link valid for two minutes http://localhost:3000/forgetPass/${userExist._id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    console.log(error.error)
                    res.status(500).json({ Error: "Email not send" })
                } else {
                    console.log(info.response)
                    res.status(201).json({ status: 201, Error: "Email  sent successfully" })
                }
            })

        }

    } catch (err) {
        res.status(500).json({ Error: "invalid user" })
    }
});

// verify user for forgot password 

router.get('/forgetPass/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    // console.log({ id, token })

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        // console.log(validuser)

        const varifyToken = jwt.verify(token, secretKey);

        console.log(varifyToken)

        if (validuser && varifyToken._id) {
            res.status(201).json({ status: 201, validuser });
        } else {
            res.status(500).json({ Error: "User not exist" });
        }

    } catch (err) {
        res.status(500).json({ status: 500, Error: err });
    }
});

// chnage password

router.post('/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const varifyToken = jwt.verify(token, secretKey);

        if (validuser && varifyToken._id) {

            const newpassword = await bycrypt.hash(password, 12);

            const setnewPassword = await User.findByIdAndUpdate({ _id: id }, { newpassword });

            setnewPassword.save();
            res.status(201).json({ status: 201, data: setnewPassword })

        } else {
            res.status(500).json({ Error: "User not exist" });
        }


    } catch (err) {
        res.status(500).json({ status: 500, Error: err });
    }
})


module.exports = router;