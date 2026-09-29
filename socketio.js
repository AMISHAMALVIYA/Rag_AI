const { Server } = require("socket.io");

const clients = new Map();

let io;


function initSocket(httpServer) {

    io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });


    io.on("connection", (socket) => {

        console.log(
            "Socket connected:",
            socket.id
        );


        // client register
        socket.on("register", (clientId) => {

            clients.set(
                clientId,
                socket.id
            );

            console.log(
                "Client registered:",
                clientId
            );

        });


        // admin message
        socket.on(
            "admin_message",
            ({ clientId, message }) => {

                sendMessage(
                    clientId,
                    message
                );

            }
        );


        socket.on("disconnect", () => {

            for (const [clientId, socketId] of clients) {

                if (socketId === socket.id) {

                    clients.delete(clientId);
                    break;

                }

            }


            console.log(
                "Socket disconnected:",
                socket.id
            );

        });

    });

}



function sendMessage(clientId, message) {

    const socketId = clients.get(clientId);


    if (socketId && io) {

        io.to(socketId).emit(
            "receive_message",
            {
                message
            }
        );

        console.log(
            "Message sent to:",
            clientId
        );

    } else {

        console.log(
            "Client offline:",
            clientId
        );

    }

}



module.exports = {
    initSocket,
    sendMessage
};
