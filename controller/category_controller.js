const CategoryModel = require('../model/category')


const addCategory = async (req, res, next) => { 
    const { name, imageUrl } = req.body;
    const failed = { name, imageUrl };
    const emptyFields = Object.entries(failed).filter(([key, value]) => !value).map(([key]) => key);
    if (emptyFields.length > 0) {
        return res.status(400).json({ message: `Please enter a value for: ${emptyFields.join(', ')}` });
    }
    try {
        const category = await CategoryModel.create({ name: name, imageUrl: imageUrl });
    if (!category) {
        return res.status(400).json({
            message: 'failed to create category'
        });
    }
    return res.status(200).json(category);
    } catch (__) {
        return res.status(500).json({
            message: `failed due to ${__.message}`
        });
    }
}

const categorylist = async (req, res, next) => { 
    try {
        const items = await CategoryModel.findAll();
        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Emptry category list',
                data: [],
            });
        }
        return res.status(200).json(items);
    } catch (__) {
        return res.status(500).json({
            message: `failed to fetch list`
        });
    }
}

const deleteCategory = async (req, res, next) => { 
    const { id } = req.params;
    try {
        const category = await CategoryModel.findOne({ where: { id: id } });
        if (!category) { 
            return res.status(404).json({
                success: false,
                message: 'failed to fetch items',
            });
        }
        const data = await CategoryModel.destroy({ where: { id: id } });
        return res.status(200).json({
            success: false,
            message: 'Item delete successfully',
            data: data,
        });
    } catch (__) {
        return res.status(500).json({
            message: 'failed to delete items'
        });
    }
}

const updateCategory = async (req, res, next) => { }


module.exports = {addCategory, categorylist, deleteCategory, updateCategory};