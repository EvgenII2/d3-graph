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

  data = {
    name: '1',
    children: [
      {
        name: '2',
        children: [
          {
            name: '16',
            children: [
              {
                name: '17',
                children: [],
                value: 17,
              },
              {
                name: '18',
                children: [],
                value: 18,
              },
              {
                name: '19',
                children: [],
                value: 19,
              },
              {
                name: '20',
                children: [],
                value: 20,
              },
            ],
          },
        ],
      },
      {
        name: '3',
        children: [],
      },
      {
        name: '4',
        children: [
          {
            name: '21',
            children: [
              {
                name: '22',
                children: [],
                value: 22,
              },
              {
                name: '23',
                children: [],
                value: 23,
              },
              {
                name: '24',
                children: [],
                value: 24,
              },
              {
                name: '25',
                children: [],
                value: 25,
              },
            ],
          },
        ],
      },
      {
        name: '5',
        children: [
          {
            name: '26',
            children: [
              {
                name: '27',
                children: [],
                value: 27,
              },
              {
                name: '28',
                children: [],
                value: 28,
              },
            ],
          },
        ],
      },
      {
        name: '6',
        children: [
          {
            name: '7',
            children: [
              {
                name: '8',
                children: [],
                value: 8,
              },
              {
                name: '9',
                children: [
                  {
                    name: '14',
                    children: [],
                    value: 14,
                  },
                  {
                    name: '15',
                    children: [],
                    value: 15,
                  },
                ],
              },
              {
                name: '10',
                children: [],
                value: 10,
              },
              {
                name: '11',
                children: [],
                value: 11,
              },
              {
                name: '12',
                children: [],
                value: 12,
              },
              {
                name: '13',
                children: [],
                value: 13,
              },
            ],
          },
        ],
      },
    ],
  };

  constructor() {}
}
