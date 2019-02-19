const host = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(host);
alert('This scene is only about twitch plays. Please, visit https://dygy.github.io/ThreeJsExamples/examples/2/index.html for dat gui and no twitch game play');
    // event emmited when connected
    ws.onopen = () =>{
        console.log('websocket is connected ...');
        // sending a send event to websocket server
        ws.send('connected')
    };
    // event emmited when receiving message


    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create a render and set the size
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled= true;

    // create the ground plane
    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow  = true;

    // rotate and position the plane
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x=0;
    plane.position.y=0;
    plane.position.z=0;

    // add the plane to the scene
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    // add the output of the renderer to the html element
    document.body.appendChild( renderer.domElement );

    // call the render function
    let step = 0;
    let near=100;
    let far=1000;

    let controls = new function () {
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;
        this.fog= "fog_no";

        this.removeCube = function () {
            let allChildren = scene.children;
            let lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };

        this.addCube = function () {

            let cubeSize = Math.ceil((Math.random() * 3));
            let cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            let cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = false;
            cube.name = "cube-" + scene.children.length;


            // position the cube randomly in the scene
            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.height));

            // add the cube to the scene
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        scene.fog = new THREE.Fog(0xffffff, near, far);

        this.switchCamera = function() {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, -200, 500 );
                camera.position.x = 2;
                camera.position.y = 1;
                camera.position.z = 3;
                camera.lookAt(scene.position);
                if (controls.fog === 'fog_no'){
                    near= 100;
                    far= 100;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
                else if (controls.fog === 'fog_easy') {
                    far = 2;
                    near = -1;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
                else if (controls.fog === 'fog_hard') {
                    far = 1;
                    near = -2;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

                camera.position.x = -30;
                camera.position.y = 40;
                camera.position.z = 30;
                camera.lookAt(scene.position);
                if (controls.fog === 'fog_no'){
                    near=100;
                    far=1000;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
                else if (controls.fog === 'fog_easy') {
                    far = 200;
                    near = 30;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
                else if (controls.fog === 'fog_hard') {
                    far = 100;
                    near = 20;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
            }

        };
        this.fogChange = function(regim) {
            //console.log(controls.fog);
            if (camera instanceof THREE.PerspectiveCamera) {
                if (regim === 'fog_no') {
                    near = 100;
                    far = 1000;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                } else if (regim === 'fog_easy') {
                    far = 150;
                    near = 25;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                } else if (regim === 'fog_hard') {
                    far = 100;
                    near = 20;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
            }
            else {
                if (regim === 'fog_no') {
                    near = 100;
                    far = 100;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                } else if (regim === 'fog_easy') {
                    far = 2;
                    near = -1;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                } else if (regim === 'fog_hard') {
                    far = 1;
                    near = -2;
                    scene.fog = new THREE.Fog(0xffffff, near, far);
                }
            }
        }

    };

    let gui = new dat.GUI();
    //   gui.add(controls, 'rotationSpeed',0,0.5);
    //   gui.add(controls, 'addCube');
    //   gui.add(controls, 'removeCube');
    //   gui.add(controls, 'switchCamera');
    gui.add(controls, 'numberOfObjects').listen();
    //   gui.add(controls, 'fog', ['fog_no', 'fog_easy', 'fog_hard']).onChange(controls.fogChange(controls.fog));


    render();

    function render() {

        // rotate the cubes around its axes
        scene.traverse(function(e) {
            if (e instanceof THREE.Mesh && e !== plane ) {

                e.rotation.x+=controls.rotationSpeed;
                e.rotation.y+=controls.rotationSpeed;
                e.rotation.z+=controls.rotationSpeed;
            }
        });

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }


    ws.onmessage = response => {
        let message =response.data;
        if (message===('add_cube')) {
            controls.addCube();
        }
        else if (message==='fog_hard'||message==='fog_no'||message==='fog_easy'){
            controls.fogChange(message);
            controls.fog=message;
        }
        else if (message ==='switch_camera'){
            controls.switchCamera();
        }
        else if (message ==='remove_cube'){
            controls.removeCube();
        }
        else if (message ==='speed_bust'){
            controls.rotationSpeed =controls.rotationSpeed+ 0.100;
        }
        else if (message ==='speed_down'){
            controls.rotationSpeed =controls.rotationSpeed- 0.100;
        }
        console.log('Server sends you a " '+ response.data +' " command');
    };
