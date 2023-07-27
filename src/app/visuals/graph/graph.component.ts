import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { D3Service } from 'src/app/d3/d3.service';
import { ForceDirectedGraph } from 'src/app/d3/models';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  private _options: { width; height } = { width: 800, height: 600 };
  get options() {
    return (this._options = {
      width: window.innerWidth,
      height: 800,
    });
  }

  @Input('data') nodes;
  @Input('links') links;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.graph.initSimulation(this.options);
  }

  graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.graph = this.d3Service.getForceDirectedGraph(
      this.nodes,
      this.options
    );

    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }
}
