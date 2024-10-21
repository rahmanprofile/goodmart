const Users = require('../model/users')

const userlist = async (req, res, next) => {
    try {
        const users = await Users.findAll({ attributes: { exclude: ['password'] } });
        if (users.length === 0) {
            return res.status(200).json({
                message: 'No users found',
                data: []
            })
        }
        return res.status(200).json(users)
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
}

const userdetail = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await Users.findOne({ where: { id: id } ,attributes: {exclude: ['password']}});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not found'
            });
        }
        return res.status(200).json(user);
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch details due to ${__.message}`
        });
    }
}



module.exports = { userdetail, userlist }