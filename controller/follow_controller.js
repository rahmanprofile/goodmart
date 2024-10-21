const { where } = require('sequelize');
const followModel = require('../model/follow');
const UserModel = require('../model/users');


const following = async (req, res) => {
    const { followerId, followingId } = req.body;
    try {
        const existingFollow = await followModel.findOne({
            where: { followerId, followingId }
        });
        if (existingFollow) {
            return res.status(400).json({ message: 'Already following or request is pending' });
        }
        const follow = await followModel.create({ followerId, followingId });
        return res.status(200).json({ message: 'Follow request sent', follow });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending follow request', error });
    }
};


const follower = async (req, res) => {
    const { followId, status } = req.body;
    try {
        const follow = await followModel.findOne({ where: { id: followId } });
        if (!follow) {
            return res.status(404).json({ message: 'Follow request not found' });
        }
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ message: 'Invalid status' });
        }
        follow.status = status;
        await follow.save();
        return res.status(200).json({ message: `Follow request ${status}`, follow });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating follow request', error });
    }
};


const deletefollower = async (req, res) => {
    const { followingId } = req.params;
    try {
        const follow = await followModel.findOne({ where: { followingId: followingId } });
        if (!follow) {
            return res.status(404).json({ message: 'Follow record not found' });
        }
        await follow.destroy();
        return res.status(200).json({ message: 'Unfollowed or follow request cancelled' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting follow record', error });
    }
};

const getFollowers = async (req, res) => {
    const { followerId } = req.params;
    const { status } = req.body; 
    try {
        const whereCondition = { followerId: followerId };
        if (status) {
            whereCondition.status = status;  
        } else {
            whereCondition.status = 'accepted'; 
        }
        const followers = await followModel.findAll({
            where: whereCondition,
            include: [{
                model: UserModel,
                as: 'follower',
                attributes: ['id', 'name', 'email']
            }]
        });
        return res.status(200).json({ followers });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching followers', error });
    }
};


const getFollowing = async (req, res) => {
    const { followingId } = req.params;
    const { status } = req.body; 
    try {
        const whereCondition = { followingId: followingId };
        if (status) {
            whereCondition.status = status; 
        } else {
            whereCondition.status = 'accepted';
        }
        const following = await followModel.findAll({
            where: whereCondition,
            include: [{
                model: UserModel,
                as: 'following',
                attributes: ['id', 'name', 'email']
            }]
        });

        return res.status(200).json({ following });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching following', error });
    }
};


const getPendingFollowRequests = async (req, res) => {
    const { userId } = req.params;
    try {
        const pendingRequests = await followModel.findAll({
            where: { followingId: userId, status: 'pending' },
            include: [{
                model: UserModel,
                as: 'follower',
                attributes: ['id', 'name', 'email']
            }]
        });
        return res.status(200).json({ pendingRequests });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching pending follow requests', error });
    }
};

const handleFollowRequest = async (req, res) => {
    const { followId, status } = req.body;

    try {
        const follow = await followModel.findOne({ where: { id: followId } });
        if (!follow) {
            return res.status(404).json({ message: 'Follow request not found' });
        }
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ message: 'Invalid status. Must be "accepted" or "rejected".' });
        }
        if (follow.status !== 'pending') {
            return res.status(400).json({ message: `Cannot change follow request, already ${follow.status}` });
        }

        follow.status = status;
        await follow.save();

        return res.status(200).json({ message: `Follow request ${status}`, follow });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating follow request', error });
    }
};


const followlist = async (req, res, next) => {
    try {
        const follows = await followModel.findAll();
        if (follows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No followers found',
                data: []
            });
        }

        const followDetails = [];
        for (let follow of follows) {
            const followerUser = await UserModel.findOne({
                where: { id: follow.followerId },
                attributes: ['id', 'name', 'email'] 
            });
            const followingUser = await UserModel.findOne({
                where: { id: follow.followingId },
                attributes: ['id', 'name', 'email']
            });
            followDetails.push({
                id: follow.id,
                followerId: follow.followerId,
                followingId: follow.followingId,
                status: follow.status,
                data: {
                    followerUser, 
                    followingUser 
                }
            });
        }
        return res.status(200).json(followDetails);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed due to ${error.message}`
        });
    }
};

module.exports = { following, follower, deletefollower, getFollowers, getFollowing, getPendingFollowRequests, handleFollowRequest, followlist };