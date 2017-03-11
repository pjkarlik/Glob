import React from 'react';
import { resolve } from '../styles';
import dat from 'dat-gui';

export default class ContentBlock extends React.Component {
  static displayName = 'ContentBlock';
  static propTypes = {
    classes: React.PropTypes.object,
    config: React.PropTypes.object,
    modifier: React.PropTypes.string,
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
    const { classes, sectionHeight, modifier } = this.props;
    const heightStyle = { height: sectionHeight };
    return (
      <div {...resolve(this.props, 'section', modifier)} style = {heightStyle}>
        <div className = {classes.content} style = {heightStyle}>
          <div className = {classes.datcontainer} ref={(ref) => { this.datwindow = ref; }} />
          <div {...resolve(this.props, 'datinfo')}>
            <h4 className = {classes.subheader}>p5.js sketch</h4>
              <p className = {classes.description}>
                You can interact with simplex waveform by editing the dat.gui. Code for this demo at&nbsp;
                <a href="https://github.com/pjkarlik/p5js" target="_blank">github.com/pjkarlik/p5js</a>.
              </p>
            </div>
        </div>
      </div>
    );
  }
}
