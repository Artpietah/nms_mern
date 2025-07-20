const Customer = require('../../models/customerModel');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ workspaceId: req.workspace._id }).sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('service.serviceId');
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const createCustomer = async (req, res) => {
    // check if the request body contains the required fields
    if (!req.body || !req.body.name || !req.body.phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
    }

    try {
        const { name, phone, email} = req.body;



        if (!name ) {
            return res.status(400).json({ error: '' });
        }
        if (!phone) {
            return res.status(400).json({ error: 'Address is required' });
        }
        //check if the phone number already exists
        const existingCustomer = await Customer.findOne({ phone });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer with this phone number already exists' });
        }

        const newCustomer = new Customer({
            name,
            phone,
            email,
            workspaceId: req.workspace._id
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, phone, email },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};