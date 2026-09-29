const  sendMessage = require("../../socketio");


const sendAdminMessage = (req, res) => {

    try {

        const {
            clientId,
            message
        } = req.body;


        if (!clientId || !message) {

            return res.status(400).json({
                success: false,
                message: "clientId and message required"
            });

        }


        sendMessage(
            clientId,
            message
        );


        res.json({
            success: true,
            message: "Message sent successfully"
        });


    } catch (error) {

        res.status(500).json({
            success:false,
            error:error.message
        });

    }

};


module.exports = {
    sendAdminMessage
};



