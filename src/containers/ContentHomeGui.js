import React from 'react';
import { resolve } from '../styles';
import dat from 'dat-gui';

export default class ContentBlock extends React.Component {
  static displayName = 'ContentBlock';
  static propTypes = {
    classes: React.PropTypes.object,
    config: React.PropTypes.object,
    sectionHeight: React.PropTypes.number,
    setOptions: React.PropTypes.func,
  };
  componentDidMount() {
    this.createGUI();
  }
  setOptions = (options) => {
    this.props.setOptions(options);
  }
  createGUI = () => {
    this.config = {
      ...this.props.config,
    };
    this.gui = new dat.GUI({ autoPlace: false });
    const guiWindow = this.datwindow;
    guiWindow.appendChild(this.gui.domElement);
    const folderRender = this.gui.addFolder('Render Options');
    folderRender.add(this.config, 'iteration', 0.1, 10).step(0.1)
      .onFinishChange((value) => {
        this.config.iteration = value;
        this.setOptions({ iteration: value });
      });
    folderRender.add(this.config, 'strength', 10, 80).step(1)
      .onFinishChange((value) => {
        this.config.strength = value;
        this.setOptions({ strength: value });
      });
    folderRender.add(this.config, 'speed', 0, 100).step(1)
      .onFinishChange((value) => {
        this.config.speed = value;
        this.setOptions({ speed: value });
      });
    folderRender.add(this.config, 'waveSpeed', 50, 600).step(1)
      .onFinishChange((value) => {
        this.config.waveSpeed = value;
        this.setOptions({ waveSpeed: value });
      });
    folderRender.add(this.config, 'objectType',
    ['plane', 'box'])
    .onFinishChange((value) => {
      this.config.objectType = value;
      this.setOptions({ objectType: value });
    });
    folderRender.open();
  };
  /* eslint react/jsx-no-bind: 0 */
  render() {
    const { classes, sectionHeight } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', 'accent')} style = {heightStyle}>
        <div className = {classes.content}>
          <div className = {classes.datcontainer} ref={(ref) => { this.datwindow = ref; }} />
          <div {...resolve(this.props, 'onethird')}>
            <h4>p5.js interactive sketch</h4>
              <p>
                Interact with the p5.js sketch with the attached dat.gui. These are just some of
                the properties that can effect the visual outcome of the waveform.
              </p>
            </div>
        </div>
      </div>
    );
  }
}
