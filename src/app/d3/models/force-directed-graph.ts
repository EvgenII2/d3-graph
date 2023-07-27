// path : d3/models/force-directed-graph.ts
import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1,
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public data;

  constructor(data, options: { width; height }) {
    this.data = data;
    this.initSimulation(options);
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const root = d3.hierarchy(this.data);
      const links =
        root.links() as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[];
      const nodes = root.descendants() as d3.SimulationNodeDatum[];

      const drag = (simulation) => {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended);
      };

      this.simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            // .id((d) => d.id)
            // .distance(0)
            .strength(0.5)
        )
        .force(
          'charge',
          d3.forceManyBody().strength((d) => -1000)
        )
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      const svg = d3
        .select('svg')
        .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;');

      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line');

      const node = svg
        .append('g')
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('fill', (d: Node) => (d.children ? 'blue' : 'green'))
        // .attr('stroke', (d: Node) => (d.children ? null : '#fff'))
        .attr('r', (d: Node) => (d.children ? 20 : 15))
        .call(drag(this.simulation));

      var label = svg
        .selectAll('.mytext')
        .data(nodes)
        .enter()
        .append('text')
        .text(function (d) {
          // @ts-ignore
          return d.data.name;
        })
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .style('font-family', 'Arial')
        .style('font-size', 12);

      this.simulation.on('tick', () => {
        link
          // @ts-ignore
          .attr('x1', (d) => d.source.x)
          // @ts-ignore
          .attr('y1', (d) => d.source.y)
          // @ts-ignore
          .attr('x2', (d) => d.target.x)
          // @ts-ignore
          .attr('y2', (d) => d.target.y);

        // @ts-ignore
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

        label
          .attr('x', function (d) {
            return d.x;
          })
          .attr('y', function (d) {
            return d.y + 5;
          });
      });
    }

    /** Updating the central force of the simulation */
    this.simulation.force(
      'centers',
      d3.forceCenter(options.width / 2, options.height / 2)
    );

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
