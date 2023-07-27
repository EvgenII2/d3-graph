import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ForceDirectedGraph, Link, Node } from './models';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
  constructor() {}

  getForceDirectedGraph(nodes: Node[], options: { width; height }) {
    let graph = new ForceDirectedGraph(nodes, options);
    return graph;
  }
}
