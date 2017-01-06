
/** Parent Render Class */
export default class Render {
  constructor(element, width, height) {
    // Screen Set Up //
    this.element = element;
    this.width = width;
    this.height = height;
    // Set Up canvas and surface object //
    this.perlinCanvas = this.createCanvas('perlin');
    this.surface = this.perlinCanvas.getContext('2d');
    this.surface.scale(1, 1);
    // Bind Stuff //
    this.renderLoop = this.renderLoop.bind(this);
    // run function //
    this.renderLoop();
  }

  createCanvas(name) {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    this.element.appendChild(canvasElement);
    return canvasElement;
  }

  renderLoop() {
    // window.requestAnimationFrame(this.renderLoop);
  }
}
