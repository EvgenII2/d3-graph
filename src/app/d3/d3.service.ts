import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ForceDirectedGraph, Link, Node } from './models';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
  constructor() {}

  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = (event) => {
      const transform = event.transform;
      container.attr(
        'transform',
        'translate(' +
          transform.x +
          ',' +
          transform.y +
          ') scale(' +
          transform.k +
          ')'
      );
    };

    zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started(event) {
      /** Preventing propagation of dragstart to parent elements */
      event.sourceEvent.stopPropagation();

      if (!event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      event.on('drag', dragged).on('end', ended);

      function dragged(event) {
        node.fx = event.x;
        node.fy = event.y;
      }

      function ended(event) {
        if (!event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag().on('start', started));
  }

  getForceDirectedGraph(
    nodes: Node[],
    links: Link[],
    options: { width; height }
  ) {
    let graph = new ForceDirectedGraph(nodes, links, options);
    return graph;
  }
}
