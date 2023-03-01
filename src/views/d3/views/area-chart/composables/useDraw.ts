/** @format */

import { create, area, type DSVParsedArray, type ScaleLinear } from 'd3';

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
  xScale: any;
  yScale: ScaleLinear<number, number>;
}

export default function useDraw(options: OptionsType) {
  const { data, width, height, padding, xScale, yScale } = options;

  const svg = create('svg').attr('width', width).attr('height', height);

  const areaUpper = area()
    .x((d: any) => xScale(d.date))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.upper)) as any;

  const areaClose = area()
    .x((d: any) => xScale(d.date))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.close)) as any;

  const areaLower = area()
    .x((d: any) => xScale(d.date))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.lower)) as any;

  svg
    .append('g')
    .append('path')
    .attr('d', areaUpper(data))
    .attr('fill', 'red')
    .attr('stroke', 'none')
    .attr('opacity', '.3');
  svg
    .append('g')
    .append('path')
    .attr('d', areaClose(data))
    .attr('fill', 'blue')
    .attr('stroke', 'none')
    .attr('opacity', '.3');
  svg
    .append('g')
    .append('path')
    .attr('d', areaLower(data))
    .attr('fill', 'green')
    .attr('stroke', 'none')
    .attr('opacity', '0.5');

  return {
    svg,
  };
}
