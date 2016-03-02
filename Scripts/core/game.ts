/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var cube1:Mesh;
    var cube2:Mesh;
    var cube3:Mesh;
    var cube4:Mesh;
    var cube5:Mesh;

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera

        // add helper axis
        var axis = new AxisHelper(30);
        scene.add(axis);

        /* ENTER CODE HERE */
        //CODE
        
        //add cube1
        var geometry = new CubeGeometry(10, 1, 10);
        var material = new LambertMaterial({ color: Math.random() * 0xffffff });
        material.map = THREE.ImageUtils.loadTexture('../content/stone.jpg');
        cube1 = new gameObject(geometry, material,0,0.5,0);
        scene.add(cube1);
        
        //add cube2
        var geometry = new CubeGeometry(8, 1, 8);
        var material = new LambertMaterial({ color: Math.random() * 0xffffff });
        material.map = THREE.ImageUtils.loadTexture('../content/stone.jpg');
        cube2 = new gameObject(geometry, material,0,1.5,0);
        scene.add(cube2);
        
        //add cube3
        var geometry = new CubeGeometry(6, 1, 6);
        var material = new LambertMaterial({ color: Math.random() * 0xffffff });
        material.map = THREE.ImageUtils.loadTexture('../content/stone.jpg');
        cube3 = new gameObject(geometry, material,0,2.5,0);
        scene.add(cube3);
        
        //add cube4
        var geometry = new CubeGeometry(4, 1, 4);
        var material = new LambertMaterial({ color: Math.random() * 0xffffff });
        material.map = THREE.ImageUtils.loadTexture('../content/stone.jpg');
        cube4 = new gameObject(geometry, material,0,3.5,0);
        scene.add(cube4);
        
        //add cube5
        var geometry = new CubeGeometry(2, 1, 2);
        var material = new LambertMaterial({ color: Math.random() * 0xffffff });
        material.map = THREE.ImageUtils.loadTexture('../content/stone.jpg');
        cube5 = new gameObject(geometry, material,0,4.5,0);
        scene.add(cube5);
        
        //add a plane
        var planeGeo = new PlaneGeometry(20, 20);
        var material = new LambertMaterial();
        var plane = new gameObject(planeGeo, material,0,0,0);
        plane.rotation.x = -0.5 * Math.PI;
        scene.add(plane);
        
        //add ambient light
        var ambientLight = new AmbientLight(0x444444);
        scene.add(ambientLight);
        
        //add spotlight
        var spotlight = new SpotLight(0xffffff, 2);
        spotlight.position.set(-10, 10, -10);
        spotlight.target;
        spotlight.castShadow = true;
        spotlight.shadowCameraNear = 1;
        spotlight.shadowMapWidth = 2048;
        spotlight.shadowMapHeight = 2048;
        scene.add(spotlight);
        
        //Add a skyBox for a background
        var skyGeometry = new SphereGeometry(100,20,20);
        var skyMat = new THREE.MeshBasicMaterial();
        skyMat.map = THREE.ImageUtils.loadTexture('../content/sky.jpg');
        var skyBox = new Mesh(skyGeometry, skyMat);
        skyBox.material.side = THREE.BackSide;
        scene.add(skyBox);
 
        // add controls
        gui = new GUI();
        control = new Control(0,0,0,0,0);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'cube1',-10,10);
        gui.add(controlObject, 'cube2',-10,10);
        gui.add(controlObject, 'cube3',-10,10);
        gui.add(controlObject, 'cube4',-10,10);
        gui.add(controlObject, 'cube5',-10,10);
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
    function gameLoop(): void {
        stats.update();
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        
        //set rotation speed of objects
        cube1.rotation.y += control.cube1 / 1000;
        cube2.rotation.y += control.cube2 / 1000;
        cube3.rotation.y += control.cube3 / 1000;
        cube4.rotation.y += control.cube4 / 1000;
        cube5.rotation.y += control.cube5 / 1000;
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 1000);
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
    }

})();

