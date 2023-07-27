import { Component, Input, OnInit } from '@angular/core';
import { Link, Node } from 'src/app/d3/models';

@Component({
  selector: '[linkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.scss'],
})
export class LinkVisualComponent implements OnInit {
  @Input('linkVisual') link: Link;

  constructor() {}

  ngOnInit(): void {}
}
