/** @format */

import { create, interpolateRgb, type ScaleLinear } from 'd3';

interface OptionsType {
  data: number[][];
  width: number;
  height: number;
  padding: Record<string, number>;
  xScale: any;
  yScale: ScaleLinear<number, number>;
}

export default function useBar(options: OptionsType) {
  const { data, width, height, padding, xScale, yScale } = options;

  const svg = create('svg').attr('width', width).attr('height', height);
  const circle = svg
    .selectAll('g')
    .data(data)
    .join('g')
    .attr('transform', (d, i) => {
      return `translate(${xScale(d[0])}, ${yScale(d[1]) + padding.top})`;
    });

  circle
    .append('circle')
    .attr('fill', (d) =>
      interpolateRgb(
        'rgb(87, 178, 176)',
        'rgb(225, 78, 111)'
      )((d[0] / 100) * (d[1] / 100))
    )
    .attr('cx', 0)
    .attr('cy', 0)
    .attr(
      'r',
      (d) =>
        Math.sqrt(xScale(d[0]) * xScale(d[0]) + yScale(d[1]) * yScale(d[1])) /
        50
    );

  circle
    .append('text')
    .attr('fill', 'white')
    .attr('x', 4)
    .attr('y', 4)
    .attr('dx', '0')
    .attr('dy', '0')
    .attr('fill', 'black')
    .text((d) => `${d[0]},${d[1]}`);

  return {
    svg,
  };
}
