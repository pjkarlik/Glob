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
  var iteration = p.random(25,65) / 1000;
  var strength = ~~(p.random(25,50));
  var speed = ~~(p.random(100,600) / grid);
  var waveSpeed = p.random(15,40) / 10000;
  var objectType = 'plane';
  var shaderType = 'isClose';
  // setting color vars
  var r = 0, g = 0, b = 0, op = 0;
  var colorset = [0, 0, 0];
  var background = [0, 0, 0];
  // setting items for movement
  var timeout = false;
  var zOffset = 0, offsetX = 0, offsetY = 0;
  var zoom = -50;
  var tempZoom = zoom;
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
    objectType = config.objectType || objectType;
    strength = config.strength || strength;
    iteration = config.iteration / 100 || iteration;
    speed = config.speed || speed;
    waveSpeed = config.waveSpeed / 10000 || waveSpeed;
    tempZoom = config.tempZoom || tempZoom;
    background = config.background || background;
  }

  p.getOptions = function(config) {
    return {
      shaderType,
      objectType,
      strength,
      iteration,
      speed,
      waveSpeed,
      tempZoom,
      background,
    };
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

    // fix into position to draw grid
    p.translate(-width_half, -(spacing * length), -100);
    lastHigh = 0;
    for (var j = 0; j < spacing * 2; j++) {
      for (var i = 0; i < spacing; i++) {
        // generate noise values and shader colors
        var noiseValue = (vertices[i][j].n) * 0.3;
        var colorset = p.shader(vertices[i][j].n, i, j);
        var translateZ = -(noiseValue * 2);
        if (vertices[i][j].n > lastHigh) {
          lastHigh = vertices[i][j].n;
        }
        // push and move 3D object into place
        p.push();
        p.translate(i * size, j * length - spacer, translateZ);
        p.ambientMaterial(colorset.r, colorset.g, colorset.b, colorset.op);
        switch (objectType) {
          case 'plane':
            p.plane(size,length);
            break;
          case 'box':
            p.box(size, length, length);
            break;
          case 'sphere':
            p.sphere((1 + (noiseValue * .25)), 6);
            break;
          default:
            p.plane(size,length);
            break;
        }
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
        var zVector = Math.round(nPoint * 10);
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
    zoom = zoom - (zoom - tempZoom) * 0.1;
    p.background(background);
    p.translate((width / 2) - (spacing * grid / 2), 0, zoom);
    p.checkForChange();
    p.moveVectors();
    p.rotateX(90 + camY);
    p.rotateZ(camX);
  };

  p.checkForChange = function() {
    if (p.random(1,255) > 245 && !timeout) {
      tempX = width_half - (width - p.random(1, width * 2)) * .65;
      p.pauseChange();
    }
    if (p.random(1,255) > 240 && !timeout) {
      tempY = (lastHigh / 3.5) + (30 - p.random(1, 60));
      p.pauseChange();
    }
  };

  p.moveVectors = function(){
    thisX = thisX - (thisX - tempX) * 0.006;
    thisY = thisY - (thisY - tempY) * 0.006;
    camX = (width_half - thisX) * 0.006;
    camY = (height_half - thisY) * 0.008;
  };

  p.lighting = function()  {
    p.directionalLight(250, 250, 250, 255, 1, 0, -1);
    p.directionalLight(160, 160, 160, 255, -1, 1, 0);
    p.directionalLight(160, 160, 160, 255, 0, -1, 1);
  };

  p.shader = function(noise, i, j){
    switch(shaderType) {
      case 'editor':
        r = Math.round(155 + Math.cos(noise * 2 * Math.PI / 180 - (time * 0.005)) * 155);
        b = r;
        g = b;
        op = objectType === 'box' ? 255 : 155;
        break;
      case 'outro':
        r = Math.cos(noise * Math.PI / 180 + (time * 0.02)) * 255;
        b = 255 - Math.cos(2 + noise * 2 * Math.PI / 360) * 255;
        g = b;
        op = objectType === 'box' ? 50 : 75;
        break;
      case 'splash':
        r = Math.cos(noise * Math.PI / 180 + (time * 0.02)) * 255;
        g = 255 - Math.sin(1 + noise * Math.PI / 180 - (time * 0.01)) * 255;
        b = Math.sin(noise * 2 * Math.PI / 180 + (time * 0.05)) * 255;
        op = objectType === 'box' ? 255 : 155;
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
