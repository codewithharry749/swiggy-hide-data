const { User } = require('../model/userSchema')


const getdata = async (req, res, next) => {
    try {
        const response = await User.find({});
        res.status(200).json({
            success: true,
            data: response,
            massage: "lolin data found successFully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            massage: "Some issue are arising to found the data"
        })
    }

}

module.exports = { getdata }