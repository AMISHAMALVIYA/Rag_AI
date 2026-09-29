const express = require("express");

const adminrouter = express.Router();


const {
    sendAdminMessage
} = require("../Controller/adminController");



// Admin send message to particular client
adminrouter.post(
    "/send-message",
    sendAdminMessage
);



module.exports = adminrouter;
