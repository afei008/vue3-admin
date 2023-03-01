/** @format */

import { create, axisBottom, axisLeft, type ScaleLinear } from 'd3';

interface OptionsType {
  width: number;
  height: number;
  padding: Record<string, number>;
  xScale: any;
  yScale: ScaleLinear<number, number>;
}

export default function useAxis(options: OptionsType) {
  const { width, height, padding, xScale, yScale } = options;

  const axis = create('svg').attr('viewBox', [0, 0, width, height]);
  axis
    .append('g')
    .attr('transform', `translate(0, ${height - padding.bottom})`)
    .call(axisBottom(xScale));
  axis
    .append('g')
    .attr('transform', `translate(${padding.left}, 0)`)
    .call(axisLeft(yScale));

  return {
    axis,
  };
}
