const tmi = require("tmi.js");
let message =require('../../AWSChallangeTwitch — копия/models/message');
const checkUser = require('../../AWSChallangeTwitch — копия/functions/checkUser');
const deleteUsers = require('../../AWSChallangeTwitch — копия/functions/deleteUsers');
let gameSelect =require('../../AWSChallangeTwitch — копия/models/game');
const getJSON = require('get-json');
module.exports =(messages,channelName) => {

    let options = {
        options: {
            debug: true
        },
        connection: {
            reconnect: true
        },
        identity: {
            username: "",
            password: ""
        },
        channels: [channelName]
    };

    const client = new tmi.client(options);

    client.connect().then(function () {
        while (channelName==='#') {

        }
        //client.action('#staipy', "Всем привет!");
        // action - colorized, say - standard message
        client.on("chat", function (channel, message) {})
    }).catch(function (err) {
        console.log(err);
    });
    let users;
    let messageToPlay='';
    let move_x;
    let move_z;
    let cube_bigger;
    let cube_smaller;
    let move_q;
    let move_s;
    let move_a;
    let move_d;
    let move_w;
    let move_e;
    let start;
    let mods;
    client.on("chat", function (channel, userstate, msg, self) {
        let user_name = userstate["display-name"];
        let user_id = userstate["user-id"];
        users.push(user_id);
        if (msg !==messageToPlay){
            if (msg === '!start'){
                getJSON('https://tmi.twitch.tv/group/user/' + channelName.substr(1).toLowerCase() + '/chatters', function (error, response) {
                    for (let n = 0; n < response['chatters']['broadcaster'].length; n++) {
                        console.log(response['chatters']['broadcaster'][n]+' '+ user_name);
                        //  client.say(channelName,user_name ===mods[n]);
                        if (user_name.toLowerCase() === response['chatters']['broadcaster'][n]) {
                            start = true;
                        }

                    }
                })
            }
            if (msg === '!mods') {
                getJSON('https://tmi.twitch.tv/group/user/' + channelName.substr(1).toLowerCase() + '/chatters', function (error, response) {
                    for (let n = 0; n < response['chatters']['broadcaster'].length; n++) {
                        console.log(response['chatters']['broadcaster'][n] +' '+ user_name);
                        //  client.say(channelName,user_name ===mods[n]);
                        if (user_name.toLowerCase() === response['chatters']['broadcaster'][n]) {
                            mods = true;
                        }

                    }
                })

            }
            if (start) {
                if (self) return;
                let text = msg.toLowerCase();
                message['text'] = text;
                message['user_id'] = user_id;
                let strike = /\s*strike\s*/gmi.test(msg);
                let new_target = /\s*new.+target\s*|\s*target.+new\s*/gmi.test(msg);
                move_x = /\s*move_x\s*|\s*x_move\s*/gmi.test(msg);
                move_z = /\s*move_z\s*|\s*x_move\s*/gmi.test(msg);
                cube_bigger = /\s*cube.+bigger\s*|\s*bigger.+cube\s*/gmi.test(msg);
                cube_smaller = /\s*cube.+smaller\s*|\s*smaller.+cube\s*/gmi.test(msg);
                move_q = /\s*move_q\s*|\s*q_move\s*/gmi.test(msg);
                move_s = /\s*move_s\s*|\s*s_move\s*/gmi.test(msg);
                move_a = /\s*move_a\s*|\s*a_move\s*/gmi.test(msg);
                move_d = /\s*move_d\s*|\s*d_move\s*/gmi.test(msg);
                move_w = /\s*move_w\s*|\s*w_move\s*/gmi.test(msg);
                move_e = /\s*move_e\s*|\s*e_move\s*/gmi.test(msg);
                const switch_camera = /\s*switch.+camera\s*|\s*camera.+switch\s*/gmi.test(text);
                const add_cube = /\s*add.+cube\s*|\s*cube.+add\s*/gmi.test(text);
                const remove_cube = /\s*cube.+remove\s*|\s*remove.+cube\s*/gmi.test(text);
                const fog_no = /\s*fog.+no\s*|\s*no.+fog\s*/gmi.test(text);
                const fog_easy = /\s*easy.+fog\s*|\s*fog.+easy\s*/gmi.test(text);
                const fog_hard = /\s*fog.+hard\s*|\s*hard.+fog\s*/gmi.test(text);
                const speed_bust = /\s*bust.+speed\s*|\s*speed.+bust\s*/gmi.test(text);
                const speed_down = /\s*speed.+down\s*|\s*down.+speed\s*/gmi.test(text);
//        if (regex.test(msg)) {
//        client.say("#channelName","message");
//        }
                const done = 'Hi. it is a bot  for  tmree, if your channel connected by mistake, or you done with game, write "!over" ';
                function read() {
                    if (gameSelect['game'] === 'game') {
                        messageToPlay = done + 'Hello, welcome to the game. Please, use combination of words "move_x" to move down right side,"move_z" to move down left side, "move_q" to move up left side, "move_e" to move up right side, "move_d" to move  right side,"move_a" to move left side, "move_s" to move down,"move_w" to move up side and "cube bigger" and  "cube smaller" to change the cube sizes! To win you need to make your cube same, as opacity one. But be aware, dont go too far from big box that you are standing You can fall down! Write "!info" to see this message again . Have a good game!';
                    } else if (gameSelect['game'] === 'sceneOne') {
                        messageToPlay = done + 'Hello, welcome to the game. Please, use combination of words "add  cube" to add cube,"switch camera" to  switch camera,"remove  cube" to remove cube,"speed bust"to bust speed rotation of cubes,"speed down"to speed down rotation of cubes, "fog easy","fog hard" and  "fog no" to change the fog! Write "!info" to see this message again . Have a good time!';
                    } else if (gameSelect['game'] === 'shooter') {
                        messageToPlay = done + 'Hello, welcome to the game. Please, use combination of words "new target" to vote for next target if that seems imposable and "strike" to vote for strike from gun! To win, you need to shoot a ball in a target from plane. Write "!info" to see this message again . Have a good game!';
                    }
                }

                setInterval(() => {
                    read();
                    client.say(channelName, messageToPlay)
                }, 50000);

                if ('!info' === msg && messageToPlay !== msg) {
                    read();
                    client.say(channelName, messageToPlay)
                }
                if ('!over' === msg) {
                    getJSON('https://tmi.twitch.tv/group/user/' + channelName.substr(1).toLowerCase() + '/chatters', function (error, response) {
                    if (mods) {
                        for (let n = 0; n < response['chatters']['moderators'].length; n++) {
                            console.log(response['chatters']['moderators'][n] +' '+ user_name);
                            //  client.say(channelName,user_name ===mods[n]);
                            if (user_name.toLowerCase() === response['chatters']['moderators'][n]) {
                                // return when want to delete users     deleteUsers(users);
                                process.exit(22);
                                channelName = '#'
                            }

                        }

                    }
                    else{
                        for (let n = 0; n < response['chatters']['broadcaster'].length; n++) {
                            console.log(response['chatters']['broadcaster'][n] +' '+ user_name);
                            //  client.say(channelName,user_name ===mods[n]);
                            if (user_name.toLowerCase() === response['chatters']['broadcaster'][n]) {
                                // return when want to delete users     deleteUsers(users);
                                process.exit(22);
                                channelName = '#'
                            }

                        }
                    }
                    });
                }
                if (switch_camera ||
                    add_cube ||
                    remove_cube ||
                    fog_hard ||
                    fog_easy ||
                    fog_no ||
                    speed_down ||
                    speed_bust ||
                    move_x ||
                    move_z ||
                    cube_bigger ||
                    cube_smaller ||
                    move_q ||
                    move_s ||
                    move_a ||
                    move_d ||
                    move_w ||
                    move_e ||
                    strike ||
                    new_target
                ) {
                    console.log('a ' + user_name + ' message has a command');
                    checkUser(user_id, user_name);
                    if (!message['accepted']) {
                        client.say(channelName, user_name + ' please, wait some time to use your vote again!')
                        message['accepted'] = true;
                    } else {
                        console.log(user_name + ' message was accepted');

                        /* A cool story to remember regex lib JS problems
                        //DONT'T TOUCH. IT'S A MAGIC TRICK!
                        //first time this test says true, second false, third true(with same value),
                        //so i have to test 3 time
                        //it's really weird but i'm not so proud of myself to don't use it.
                        switch_camera.test(text);
                        add_cube.test(text);
                        fog_hard.test(text) ;
                        fog_easy.test(text);
                        fog_no.test(text);
                        speed_down.test(text);
                        speed_bust.test(text);
                        remove_cube.test(text);
                        */
                        if (switch_camera) {
                            messages.push('switch_camera');

                        } else if (add_cube) {
                            messages.push('add_cube');

                        } else if (remove_cube) {
                            messages.push('remove_cube');

                        } else if (fog_no) {
                            messages.push('fog_no');

                        } else if (fog_easy) {
                            messages.push('fog_easy');

                        } else if (fog_hard) {
                            messages.push('fog_hard');

                        } else if (speed_bust) {
                            messages.push('speed_bust');

                        } else if (speed_down) {
                            messages.push('speed_down');

                        } else if (cube_bigger) {
                            messages.push('CUBE_BIGGER');
                        } else if (cube_smaller) {
                            messages.push('CUBE_SMALLER');
                        } else if (move_q) {
                            messages.push('MOVE_WA');
                        } else if (move_s) {
                            messages.push('MOVE_S');
                        } else if (move_a) {
                            messages.push('MOVE_A');
                        } else if (move_d) {
                            messages.push('MOVE_D');
                        } else if (move_w) {
                            messages.push('MOVE_W');
                        } else if (move_e) {
                            messages.push('MOVE_WD');
                        } else if (move_x) {
                            messages.push('MOVE_SA');
                        } else if (move_z) {
                            messages.push('MOVE_SD');
                        }
                        if (new_target) {
                            messages.push('NEW_TARGET');
                        } else if (strike) {
                            messages.push('STRIKE');
                        }
                    }
                }
            }
    }});
};
