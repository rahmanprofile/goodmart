const RolesModel = require('../model/roles');

const addrole = async (req, res, next) => {
    const { name } = req.body;
    if (name == "") {
        return res.status(400).json({ message: 'please enter role name' });
    }
    try {
        const role = await RolesModel.create({ name: name });
        if (!role) {
            return res.status(400).json({ message: 'failed to create role.' });
        }
        return res.status(200).json({
            success: true,
            message: `roled created successfully.`,
            name: role.name
        });
    } catch (__) {
        return res.status(500).json({
            message: `failed due to ${__.message}`
        });
    }
}

const deleterole = async (req, res, next) => {
    const { id } = req.params;
    try {
        const role = await RolesModel.findOne({ where: { id: id } });
        if (!role) {
            return res.status(400).json({
                message: 'does not delete'
            });
        }
        const item = await RolesModel.destroy({ where: { id: id } });
        return res.status(200).json({
            message: 'item deleted successfully',
            data: item,
        });
    } catch (__) {
        return res.status(500).json({ message: 'failed to delete item' });
    }
}

const rolelist = async (req, res, next) => {
    try {
        const itemlist = await RolesModel.findAll();
        if (itemlist.length === 0) {
            return res.status(400).json({
                message: 'data is empty',
                data: [],
            });
        }
        return res.status(200).json({
            message: 'fetch category list',
            data: itemlist,
        });

    } catch (__) {
        console.log(`failed to make request: ${__}`);
        return res.status(500).json({ message: `failed to fetch due to ${__.message}` });
    }
}

const updaterole = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: 'Please enter a valid role name' });
    }

    try {
        const role = await RolesModel.findOne({ where: { id: id } });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        await RolesModel.update({ name: name }, { where: { id: id } });
        return res.status(200).json({
            success: true,
            message: `Role updated successfully`,
            name: name
        });

    } catch (error) {
        return res.status(500).json({
            message: `Failed due to ${error.message}`
        });
    }
}



module.exports = { addrole, deleterole, updaterole, rolelist }
