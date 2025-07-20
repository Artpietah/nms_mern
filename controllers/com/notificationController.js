const Notification = require('../models/notificationModel');

const sendNotification = async (req, res) => {
    try {
        const { workspaceId, recipientId, title, message, type } = req.body;

        if (!workspaceId || !recipientId || !title || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const notification = new Notification({
            workspaceId,
            recipientId,
            title,
            message,
            type
        });

        await notification.save();
        res.status(201).json({ message: 'Notification sent successfully', notification });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getNotifications = async (req, res) => {
    try {
        const { recipientId } = req.query;

        if (!workspaceId || !recipientId) {
            return res.status(400).json({ error: 'Workspace ID and Recipient ID are required' });
        }

        const notifications = await Notification.find({recipientId }).sort({ dateCreated: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        if (!notificationId) {
            return res.status(400).json({ error: 'Notification ID is required' });
        }

        const notification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        if (!notificationId) {
            return res.status(400).json({ error: 'Notification ID is required' });
        }

        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    sendNotification,
    getNotifications,
    markAsRead,
    deleteNotification
};