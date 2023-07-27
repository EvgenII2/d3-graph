import { Component } from '@angular/core';
import { Link, Node } from './d3/models';
import APP_CONFIG from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'd3-graph-example';
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = APP_CONFIG.N,
      getIndex = (number) => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    this.links.push(new Link(1, 2));
    this.links.push(new Link(1, 3));
    this.links.push(new Link(1, 4));
    this.links.push(new Link(1, 5));
    this.links.push(new Link(1, 6));
    this.links.push(new Link(2, 16));
    this.links.push(new Link(4, 21));
    this.links.push(new Link(5, 26));
    this.links.push(new Link(6, 7));
    this.links.push(new Link(7, 8));
    this.links.push(new Link(7, 9));
    this.links.push(new Link(7, 10));
    this.links.push(new Link(7, 11));
    this.links.push(new Link(7, 12));
    this.links.push(new Link(7, 13));
    this.links.push(new Link(9, 14));
    this.links.push(new Link(9, 15));
    this.links.push(new Link(16, 17));
    this.links.push(new Link(16, 18));
    this.links.push(new Link(16, 19));
    this.links.push(new Link(16, 20));
    this.links.push(new Link(21, 22));
    this.links.push(new Link(21, 23));
    this.links.push(new Link(21, 24));
    this.links.push(new Link(21, 25));
    this.links.push(new Link(26, 27));
    this.links.push(new Link(26, 28));

    for (let i = 1; i <= N; i++) {
      this.links.forEach((link) => {
        if (+link.source === i || +link.target === i) {
          this.nodes[getIndex(i)].linkCount++;
        }
      });
    }
    this.nodes[0].x = 0;
    this.nodes[0].y = 0;
    for (let i = 1; i < N; i++) {
      this.nodes[i].x = this.nodes[i - 1].x + 10;
      this.nodes[i].y = this.nodes[i - 1].y;
    }
  }
}
