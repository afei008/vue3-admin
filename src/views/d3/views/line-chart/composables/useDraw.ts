/** @format */

import {
  create,
  easeLinear,
  format,
  interpolate,
  line,
  pairs,
  select,
  utcFormat,
  type DSVParsedArray,
  type ScaleLinear,
} from 'd3';

interface OptionsType {
  data: DSVParsedArray<{
    date: Date;
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

const reveal = (path: any) =>
  path
    .transition()
    .duration(5000)
    .ease(easeLinear)
    .attrTween('stroke-dasharray', function (this: any) {
      const length = this.getTotalLength();
      return interpolate(`0, ${length}`, `${length},${length}`);
    });

const formatDate = utcFormat('%b %-d, ’%y');
const formatClose = format('$.2f');

export default function useDraw(options: OptionsType) {
  const { data, width, height, padding, xScale, yScale } = options;

  const svg = create('svg').attr('width', width).attr('height', height);

  const lineUpper = line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.upper)) as any;

  const lineClose = line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.close)) as any;

  const lineLower = line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.lower)) as any;

  svg
    .append('g')
    .append('path')
    .attr('d', lineUpper(data))
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .call(reveal);
  svg
    .append('g')
    .append('path')
    .attr('d', lineClose(data))
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .call(reveal);
  svg
    .append('g')
    .append('path')
    .attr('d', lineLower(data))
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .call(reveal);
  svg
    .append('g')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .selectAll('rect')
    .data(pairs(data))
    .join('rect')
    .attr('x', ([a]) => xScale(a.date))
    .attr('y', padding.top)
    .attr('height', height - padding.top - padding.bottom)
    .attr('width', ([a, b]) => xScale(b.date) - xScale(a.date))
    .on('mouseover', (e, d) => {
      select(e.target).attr('fill', 'red');
      const xPos = xScale(d[0].date);
      const yPos = yScale(d[0].close);
      const tooltip = select('.tooltip').style(
        'transform',
        `translate(${xPos + 10}px, ${yPos}px)`
      );
      tooltip.select('.date').text(formatDate(d[0].date));
      tooltip.select('.close').text(formatClose(d[0].close));
      tooltip.select('.lower').text(formatClose(d[0].lower));
      tooltip.select('.middle').text(formatClose(d[0].middle));
      tooltip.select('.upper').text(formatClose(d[0].upper));
      tooltip.classed('show', true);
    })
    .on('mouseout', (e) => {
      select(e.target).attr('fill', 'none');
      select('.tooltip').classed('show', false);
    });

  return {
    svg,
  };
}
