import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../../d3/models';

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.scss'],
})
export class NodeVisualComponent implements OnInit {
  @Input('nodeVisual') node: Node;
  constructor() {}

  ngOnInit(): void {}
}
