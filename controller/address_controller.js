const addressModel = require('../model/address');

const addAddress = async (req, res, next) => {
    const { userId, house, roadName, city, state, country, pincode } = req.body;
    const fields = { userId, house, roadName, city, state, country, pincode };
    const emptyFields = Object.entries(fields).filter(([key, value]) => !value).map(([key]) => key);
    if (emptyFields.length < 0) {
        return res.status(400).json({ message: `Please enter a value for: ${emptyFields.join(', ')}` });
    }

    try {
        const address = await addressModel.create({
            userId: userId, house: house, roadName: roadName, city: city, state: state, country: country, pincode: pincode,
        });

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'failed to register'
            });
        }
        return res.status(200).json(address);

    } catch (__) {
        return res.status(500).json({
            message: `failed to register address`,
        });
    }
}

const listAddress = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const addresses = await addressModel.findAll({ where: { userId: userId } });
        if (addAddress.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Empty address list',
                data: []
            });
        }
        return res.status(200).json(addresses);
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
}

const allAddress = async (req, res, next) => {
    try {
        const addresses = await addressModel.findAll();
        if (addAddress.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Empty address list',
                data: []
            });
        }
        return res.status(200).json(addresses);
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
}

const detailAddress = async (req, res, next) => {
    const { id } = req.params;
    try {
        const addresses = await addressModel.findOne({ where: { id: id } });
        if (!addAddress) {
            return res.status(400).json({
                success: false,
                message: 'Not found',
            });
        }
        return res.status(200).json(addresses);
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
}

const updateAddress = async (req, res, next) => { }



module.exports = { addAddress, listAddress, detailAddress, updateAddress, allAddress };