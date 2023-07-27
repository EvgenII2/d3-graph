import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: number;
  linkCount: number = 0;

  constructor(id: number) {
    this.id = id;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  };

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return 30 * this.normal() + 10 + 'px';
  }

  get color() {
    const length = APP_CONFIG.SPECTRUM.length;
    let index = Math.floor(length * this.normal());
    if (index > length - 1) {
      index = length - 1;
    }
    return APP_CONFIG.SPECTRUM[index];
  }
}
