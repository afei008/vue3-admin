/** @format */

import { range, max, scaleBand, scaleLinear } from 'd3';

interface OptionsType {
  data: number[];
  width: number;
  height: number;
  padding: Record<string, number>;
}

export default function useScale(options: OptionsType) {
  const { data, width, height, padding } = options;
  const xDomain = range(data.length) as unknown as string[];
  const yDomain = [0, max(data)] as number[];

  const xScale = scaleBand()
    .domain(xDomain)
    .rangeRound([padding.left, width - padding.right])
    .padding(0.1) as any;

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([height - padding.bottom, padding.top]);

  return {
    xScale,
    yScale,
  };
}
