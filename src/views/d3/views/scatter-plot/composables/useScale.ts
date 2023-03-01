/** @format */

import { extent, scaleLinear } from 'd3';

interface OptionsType {
  data: number[][];
  width: number;
  height: number;
  padding: Record<string, number>;
}

export default function useScale(options: OptionsType) {
  const { width, height, data, padding } = options;

  const xRange = extent(data, (d) => d[0]);
  const yRange = extent(data, (d) => d[1]);
  const xDomain = [0, xRange[1]] as number[];
  const yDomain = [0, yRange[1]] as number[];

  const xScale = scaleLinear()
    .domain(xDomain)
    .range([padding.left, width - padding.right]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([height - padding.bottom, padding.top]);

  return {
    xScale,
    yScale,
  };
}
