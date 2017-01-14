// import Particle from './Particle';

// Render Class //
export default class Render {
  constructor(element) {
    this.element = element;
    this.x = ~~(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
    this.y = ~~(document.documentElement.clientHeight, window.innerHeight || 0) / 2;
    this.events = ['mouseenter', 'mousemove'];
    this.events.forEach((eventName) => {
      window.addEventListener(eventName, this.setPointer);
    });
  }

  draw = (config) => {
    console.log(config);
  };

  /* eslint-disable no-nested-ternary */
  compare = (a, b) => {
    const result = (a.radius < b.radius) ? -1 : (a.radius > b.radius) ? 1 : 0;
    return result;
  };
  /* eslint-enable no-nested-ternary */
  renderLoop = () => {
    this.animation = window.requestAnimationFrame(this.renderLoop);
  };
}
