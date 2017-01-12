// MouseEvent Class //
export default class MouseEvent {
  constructor(element) {
    this.element = element || window;
    this.x = ~~(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
    this.y = ~~(document.documentElement.clientHeight, window.innerHeight || 0) / 2;
    this.events = ['mouseenter', 'mousemove'];
    this.events.forEach((eventName) => {
      this.element.addEventListener(eventName, this.setPointer);
    });
  }
  setPointer = (event) => {
    event.preventDefault();
    const x = event.pageX;
    const y = event.pageY;
    this.x = x;
    this.y = y;
  };
  /* eslint arrow-body-style: 0 */
  getPointer = () => {
    return {
      x: this.x,
      y: this.y,
    };
  };
}
