/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// Jake Parnell
// Comp392 - MidTerm
// Last Modified by: Jake Parnell
// Date Last Modified Mar 2nd 2016
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var pointLight;
    var ambientLight;
    //Ground
    var ground;
    var groundGeometry;
    var groundMaterial;
    var cube1;
    var cube2;
    var cube3;
    var cube4;
    var cube5;
    var cubeGeometry;
    var cubeMaterial;
    var axes;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        //Code
        // add an axis helper to the scene
        axes = new AxisHelper(10);
        scene.add(axes);
        console.log("Added Axis Helper to scene...");
        //Add PointLight to Scene
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        scene.add(pointLight);
        pointLight.castShadow = true;
        pointLight.intensity = 2;
        pointLight.distance = 200;
        pointLight.shadowCameraNear = 1;
        pointLight.shadowMapHeight = 2048;
        pointLight.shadowMapWidth = 2048;
        console.log("Added pointLight to scene");
        //Add Ground to Scene
        groundGeometry = new PlaneGeometry(16, 16);
        groundMaterial = new LambertMaterial({ color: 0xf4a460 });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        ground.receiveShadow = true;
        scene.add(ground);
        console.log("Added ground object to scene");
        //Add Base Cube
        cubeGeometry = new CubeGeometry(4, 2, 4);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube1 = new Mesh(cubeGeometry, cubeMaterial);
        cube1.position.setY(1);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        scene.add(cube1);
        console.log("Added base object to scene");
        //Cube #2
        cubeGeometry = new CubeGeometry(3, 2, 3);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube2 = new Mesh(cubeGeometry, cubeMaterial);
        cube2.position.setY(3);
        cube2.receiveShadow = true;
        cube2.castShadow = true;
        scene.add(cube2);
        console.log("Added 2nd object to scene");
        //Cube #3
        cubeGeometry = new CubeGeometry(2, 2, 2);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube3 = new Mesh(cubeGeometry, cubeMaterial);
        cube3.position.setY(5);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        scene.add(cube3);
        console.log("Added 2nd object to scene");
        //Cube #4
        cubeGeometry = new CubeGeometry(1, 1, 1);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube4 = new Mesh(cubeGeometry, cubeMaterial);
        cube4.position.setY(6.5);
        cube4.receiveShadow = true;
        cube4.castShadow = true;
        scene.add(cube4);
        console.log("Added 2nd object to scene");
        //Cube #5
        cubeGeometry = new CubeGeometry(0.5, 0.5, 0.5);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xffffff });
        cube5 = new Mesh(cubeGeometry, cubeMaterial);
        cube5.position.setY(7.3);
        cube5.receiveShadow = true;
        cube5.castShadow = true;
        scene.add(cube5);
        console.log("Added 2nd object to scene");
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x090909);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // add controls
        gui = new GUI();
        control = new Control(0.01, 0.01, 0.01, 0.01, 0.01);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'rotation1', -0.5, 0.5);
        gui.add(controlObject, 'rotation2', -0.5, 0.5);
        gui.add(controlObject, 'rotation3', -0.5, 0.5);
        gui.add(controlObject, 'rotation4', -0.5, 0.5);
        gui.add(controlObject, 'rotation5', -0.5, 0.5);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        cube1.rotation.y += control.rotation1;
        cube2.rotation.y += control.rotation2;
        cube3.rotation.y += control.rotation3;
        cube4.rotation.y += control.rotation4;
        cube5.rotation.y += control.rotation5;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
