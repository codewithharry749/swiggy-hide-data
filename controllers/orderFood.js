const { Order } = require("../model/orderSchema");


const orderFood = async (req, res, next) => {
    try {

        const { name, email, phone, address, citys, area, cart, totalamount } = req.body;
        console.log({ name, email, phone, address, citys, area, cart })
        if (!name || !email || !phone || !address || !citys || !area || !cart, !totalamount) {

            res.status(500).json({
                Error: 'Plz fill all the entry currectly'
            })
        }

        const orderData = await Order.create({ name, email, phone, address, citys, area, cart, totalamount });

        await orderData.save().then(() => {
            res.status(200).json({
                data: orderData,
                massage: 'Form signup Successfull',
                success: true
            })
        }).catch(() => {
            res.status(500).json({
                Error: 'plz enter currect detail'
            })
        })

    } catch (error) {
        console.log('Order cancells due to some technical issue')
        next()
    }
}

module.exports = { orderFood }