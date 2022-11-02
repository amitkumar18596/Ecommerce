const db = require('../models')
const Cart = db.cart
/**
 * Handler for creating cart
 */
exports.create = async(req, res) =>{
    const cartObj = {
        userId : req.userId,

    }
    // check if the user also provides items ids while creating cart
    //const items = 

    try{
        const cart = await Cart.create(cartObj)
        res.status(201).send(cart)
    }catch(err){
        console.log("error while creating cart ", err.message);
        res.status(500).send("Internal server error")
    }
}

/**
 * handler for updating cart
 */

/**
 * search cart based on id
 */