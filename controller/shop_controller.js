const { where } = require('sequelize');
const ShopModel = require('../model/shop')
const UserModel = require('../model/users')


const shopregister = async (req, res, next) => {
    const { name, image, area, city, postoffice, pincode, state, country, merchantId } = req.body;
    try {
        const fields = { name, image, area, city, postoffice, pincode, state, country, merchantId };
        const emptyFields = Object.entries(fields).filter(([key, value]) => !value).map(([key]) => key);
        if (emptyFields.length < 0) {
            return res.status(400).json({ message: `Please enter a value for: ${emptyFields.join(', ')}` });
        }
        const shop = await ShopModel.create({
            name: name, image: image, area: area, city: city, postoffice: postoffice, pincode: pincode, state: state, country: country, merchantId: merchantId
        });
        if (!shop) {
            return res.status(400).json({
                message: 'failed to register',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'shop register successfully',
            data: shop,
        })
    } catch (__) {
        return res.status(500).json({
            message: `failed due to ${__.message}`
        });
    }
}

const shoplist = async (req, res, next) => {
    try {
        const shops = await ShopModel.findAll();
        if (shops.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'no shops found',
                data: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: 'All shops list',
            data: shops,
        });
    } catch (__) {
        return res.status(500).json({
            message: `failed due to ${__.message}`
        });
    }
}

const shopdetail = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'failed to find detail'
            });
        }
        const shop = await ShopModel.findOne({ where: { id: id } });
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: 'No shops found relted with id'
            });
        }
        return res.status(200).json({
            success: false,
            message: 'fetch shop detail',
            data: shop
        });
    } catch (__) {
        return res.status(500).json({
            message: `failed due to ${__.message}`
        })
    }
}

const shopverification = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Please provide both shop ID and user ID"
        });
    }

    try {
        const shops = await ShopModel.findOne({ where: { id: id } });
        if (!shops) {
            return res.status(404).json({
                message: 'Failed to find shop details'
            });
        }
        const update = await ShopModel.update({ verified: true }, { where: { id: id } });
        return res.status(200).json({
            success: true,
            message: 'Shop verified successfully',
            data: update
        });
    } catch (error) {
        return res.status(500).json({
            message: `Failed due to: ${error.message}`
        });
    }
};


const shopdelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(404).json({
                message: 'please enter shopId'
            });
        }
        const shop = await ShopModel.findOne({ where: { id: id } });
        if (!shop) {
            return res.status(404).json({
                message: 'Invalid shop id'
            });
        }
        const deshop = await ShopModel.destroy({ where: { id: id } });
        return res.status(200).json({
            success: true,
            message: 'delete shop successfully',
            data: deshop
        });
    } catch (__) {
        return res.status(500).json({
            message: `failed dur to ${__.message}`
        });
    }
}


module.exports = { shopregister, shopdetail, shopverification, shopdelete, shoplist }
