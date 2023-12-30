
const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
    const { name, email, subjects, massage } = req.body;

    // console.log({ name, email, subjects, massage })

    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mtankmtank265@gmail.com',
            pass: 'slvc hsck iugg rfqm'
        }
    });
    var mailOption = {
        from: "mtankmtank265@gmail.com",
        to: name,
        cc: email,
        subject: subjects,
        text: massage
    }

    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json({
                data: "Success",
                success: true
            })
            console.log('email sent successfully')
        }
    });

}

module.exports = { sendMail }