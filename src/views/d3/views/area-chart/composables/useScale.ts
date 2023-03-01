/** @format */

import { extent, max, scaleUtc, scaleLinear, type DSVParsedArray } from 'd3';

interface OptionsType {
  data: DSVParsedArray<{
    date: Date | null;
    close: number;
    lower: number;
    middle: number;
    upper: number;
  }>;
  width: number;
  height: number;
  padding: Record<string, number>;
}

export default function useScale(options: OptionsType) {
  const { data, width, height, padding } = options;
  const xDomain = extent(data, (d) => d.date) as unknown as Date[];
  const yDomain = [0, max(data, (d) => d.upper)] as number[];

  const xScale = scaleUtc()
    .domain(xDomain)
    .rangeRound([padding.left, width - padding.right]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([height - padding.bottom, padding.top]);

  return {
    xScale,
    yScale,
  };
}
