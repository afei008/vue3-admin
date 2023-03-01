/** @format */

import { create, type ScaleLinear } from 'd3';

interface OptionsType {
  data: number[];
  width: number;
  height: number;
  padding: Record<string, number>;
  xScale: any;
  yScale: ScaleLinear<number, number>;
}

export default function useDraw(options: OptionsType) {
  const { data, width, height, padding, xScale, yScale } = options;

  const svg = create('svg').attr('width', width).attr('height', height);
  const bar = svg
    .selectAll('g')
    .data(data)
    .join('g')
    .attr(
      'transform',
      (d, i) => `translate(${xScale(i)}, ${yScale(d) + padding.top})`
    );

  bar
    .append('rect')
    .attr('fill', '#e14e6f')
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => height - padding.bottom - padding.top - yScale(d));

  bar
    .append('text')
    .attr('fill', 'white')
    .attr('x', '0.5em')
    .attr('y', '1.5em')
    .attr('dx', '0')
    .attr('dy', '0')
    .text((d) => d);

  return {
    svg,
  };
}
