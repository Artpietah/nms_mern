const apiRequest = require('../api/requestController');
const WorkSpace = require('../../models/workspaceModel');


const sendSMS = async (contacts, message) => {
    const contactList = Array.isArray(contacts) ? contacts : [contacts];
    const normalLength = 160;
    const extraLength = 67;
    const length = message.length;
    // Calculate cost
    const cost = length <= normalLength ? 1 : Math.ceil((length - normalLength) / extraLength) + 1;

    var balance = 100;
    var sent=[];

    for (const contact of contactList) {
        // Send SMS logic here
        
        if (balance > cost) {
             await apiRequest.sendSMS(contact, message);
             balance -= cost;
        }else{

        }
         
        // Optionally, charge the workspace or user here using the cost
    }
    // return cost;
};
