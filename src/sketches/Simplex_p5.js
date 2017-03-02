import { Generator } from './simplexNoise';

/* eslint-disable */
export default function sketch (p) {
  var generator;
  generator = new Generator(10);
  // setting screen vars
  var viewSize = window.innerWidth || document.documentElement.clientWidth;
  var width = 600, height = 338; // 16:9 Movie Ratio
  var width_half = width / 2;
  var height_half = height / 2;
  var grid = viewSize < 640 ? 70 : 40;
  var spacing = ~~(width / grid);
  var spacer = 0;
  // setting items for render
  var time = 0, timeNoise = 0;
  var iteration = 0.05;
  var strength = 40;
  var speed = 13;
  var waveSpeed = 0.004;
  var shaderType = 'isClose';
  // setting color vars
  var r = 0, g = 0, b = 0, op = 0;
  var colorset = [0, 0, 0];
  var background = [0, 0, 0];
  // setting items for movement
  var timeout = false;
  var zOffset = 0, offsetX = 0, offsetY = 0;
  var zoom = -50;
  var camX = width_half, camY = height_half;
  var tempX = width_half, tempY = height_half;
  var thisX = width_half, thisY = height_half;
  var lastHigh = 0;
  // building arrays
  var vertices = new Array(spacing);
  for (var i = 0; i < spacing; i++) {
    vertices[i] = new Array(spacing * 2);
  }

  // p5.js setup function
  p.setup = function() {
    console.log('setup');
    p.createCanvas(640, 640, p.WEBGL);
    p.frameRate(60);

    var fov = 60 / 180 * p.PI;
    var cameraZ = height_half / p.tan(fov/2.0);
    p.perspective(60 / 180 * p.PI, width/height, cameraZ * 0.1, cameraZ * 20);
    p.lighting();
  // simplex noise function
  };

  p.setOptions = function(config) {
    shaderType = config.shaderType || shaderType;
    grid = config.grid || grid;
    iteration = config.iteration || iteration;
    speed = config.speed || speed;
  }

  p.draw = function() {
    // advance time and tick draw loop for time segment
    var size = ~~(width / spacing);
    var length = ~~(size * 1.5);
    spacer = spacer + speed;
    if (spacer > length) {
      // the time phase of the noise wave moves
      // once the cubes moved one space
      time += 1;
      spacer = 0;
    }

    p.generateMesh();
    p.viewPort();

    // move to center to start drawing grid
    p.translate(-width_half, -height * 2, 0);

    for (var j = 0; j < spacing * 2; j++) {
      for (var i = 0; i < spacing; i++) {
        // generate noise values and shader colors
        var noiseValue = (vertices[i][j].n) * 0.3;
        var colorset = p.shader(vertices[i][j].n, i, j);
        if (vertices[i][j].n > lastHigh && j % 20 == 0) {
          lastHigh = vertices[i][j].n;
        }
        // push and move 3D object into place
        p.push();
        p.translate(i * size, j * length - spacer, -(noiseValue * 2));
        p.ambientMaterial(colorset.r, colorset.g, colorset.b, colorset.op);
        p.box(size, length, length);
        p.pop();
      }
    }
  };

  p.generateMesh = function() {
    timeNoise += 1;
    const timeStop = time * iteration;
    for (var j = 0; j < spacing * 2; j++) {
      for (var i = 0; i < spacing; i++) {
        var nPoint = Math.abs(
          generator.simplex3(iteration * i,
            iteration * j + timeStop, timeNoise * waveSpeed)
          ) * strength;
        var zVector = nPoint * 10;
        vertices[i][j] = {
          n: zVector
        };
      }
    }
  };

  p.pauseChange = function() {
    timeout = true;
    setTimeout(() => {
      timeout = false;
    }, 6000);
  };

  p.viewPort = function() {
    p.background(background);
    p.translate((width / 2) - (spacing * grid / 2), 0, zoom);
    p.checkForChange();
    p.moveVectors();
    p.rotateX(90 + camY);
    p.rotateZ(camX);
  };

  p.checkForChange = function() {
    if (p.random(1,255) > 252 && !timeout) {
      tempX = width_half - (width - p.random(1, width * 2)) * .8;
      p.pauseChange();
    }
    if (p.random(1,255) > 250 && !timeout) {
      tempY = height_half - (lastHigh / 8) - (60 - p.random(1, 120));
      p.pauseChange();
    }
  };

  p.moveVectors = function(){
    thisX = thisX - (thisX - tempX) * 0.006;
    thisY = thisY - (thisY - tempY) * 0.006;
    camX = (width_half - thisX) * 0.006;
    camY = (height_half - thisY) * 0.008;
  };

  p.mouseWheel = function(event) {
    zoom += event.delta;
    return false;
  };

  p.lighting = function()  {
    p.directionalLight(250, 250, 250, 255, 1, 0, -1);
    p.directionalLight(160, 160, 160, 255, -1, 1, 0);
    p.directionalLight(160, 160, 160, 255, 0, -1, 1);
  };

  p.shader = function(noise, i, j){
    switch(shaderType) {
      case 'isOpen':
        r = 55 + Math.cos(noise * 2 * Math.PI / 180 - (time * 0.005)) * 155;
        b = r;
        g = b;
        op = 255;
        break;
      case 'isClose':
        b = Math.cos(noise * Math.PI / 180 + (time * 0.02)) * 255;
        r = 255 - Math.sin(1 + noise * Math.PI / 180 - (time * 0.01)) * 255;
        g = 255 - Math.cos(2 + noise * 2 * Math.PI / 360) * 255;
        op = 255;
        break;
    }

    return {
      r,
      g,
      b,
      op
    };
  };
  // end of sketch
};
