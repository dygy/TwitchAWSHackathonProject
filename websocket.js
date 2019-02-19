const d = require('domain').create();
const twitch = require ('./twitch/twitch');
module.exports =(messages,command,WebSocketServer,server)=> {
    let wss;

    d.on('error', (er) => {
        // The error won't crash the process, but what it does is worse!
        // Though we've prevented abrupt process restarting, we are leaking
        // resources like crazy if this ever happens.
        // This is no better than process.on('uncaughtException')!
        console.log( er.message);
    });
    d.run(() => {
       wss = new WebSocketServer({server: server});
    });
    wss.on('connection', function (ws) {
        ws.onmessage = response => {
            if (/\#([Aa-zZ]|\_|\d)+/gmi.test(response.data)){
                let channel = response.data;
                twitch(messages,channel);
            }
            console.log('received: %s', response.data)
                };

        setInterval(
            readMessages,
            2000
        );
        setInterval(
            () => {
                if (command.status) {
                    if (command.func === 'switch_camera') {
                        ws.send('switch_camera');
                        command.status = false;
                    } else if (command.func === 'add_cube') {
                        ws.send('add_cube');
                        command.status = false;
                    } else if (command.func === 'remove_cube') {
                        ws.send('remove_cube');
                        command.status = false;
                    } else if (command.func === 'fog_no') {
                        ws.send('fog_no');
                        command.status = false;
                    } else if (command.func === 'fog_easy') {
                        ws.send('fog_easy');
                        command.status = false;
                    } else if (command.func === 'fog_hard') {
                        ws.send('fog_hard');
                        command.status = false;
                    } else if (command.func === 'speed_bust') {
                        ws.send('speed_bust');
                        command.status = false;
                    } else if (command.func === 'speed_down') {
                        ws.send('speed_down');
                        command.status = false;
                    }
                    else if (command.func === 'MOVE_D') {
                        ws.send('MOVE_D');
                        command.status = false;
                    } else if (command.func === 'MOVE_A') {
                        ws.send('MOVE_A');
                        command.status = false;
                    } else if (command.func === 'MOVE_S') {
                        ws.send('MOVE_S');
                        command.status = false;
                    } else if (command.func === 'MOVE_W') {
                        ws.send('MOVE_W');
                        command.status = false;
                    } else if (command.func === 'MOVE_WD') {
                        ws.send('MOVE_WD');
                        command.status = false;
                    } else if (command.func === 'MOVE_WA') {
                        ws.send('MOVE_WA');
                        command.status = false;
                    } else if (command.func === 'MOVE_SA') {
                        ws.send('MOVE_SA');
                        command.status = false;
                    } else if (command.func === 'MOVE_SD') {
                        ws.send('MOVE_SD');
                        command.status = false;
                    } else if (command.func === 'CUBE_SMALLER') {
                        ws.send('CUBE_SMALLER');
                        command.status = false;
                    } else if (command.func === 'CUBE_BIGGER') {
                        ws.send('CUBE_BIGGER');
                        command.status = false;
                    }

                    else if (command.func === 'NEW_TARGET') {
                        ws.send('NEW_TARGET');
                        command.status = false;
                    }
                    else if (command.func === 'STRIKE') {
                        ws.send('STRIKE');
                        command.status = false;
                    }
                }
            },
            2000
        );

    });

    function readMessages() {
//            console.log(messages);
        if (messages.length>0){
            const x=0;
            command.status = true;
            command.func=messages[x].toString();
            messages.splice(x);
        }
    }
};