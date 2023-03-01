/** @format */

import { create, line, scaleOrdinal, schemeSet2, select } from 'd3';

interface OptionsType {
  data: Array<{ label: string; value: number[] }>;
  width: number;
  height: number;
  padding: Record<string, number>;
  points: string[];
}

export default function useBar(options: OptionsType) {
  const { data, width, height, points } = options;

  const svg = create('svg').attr('width', width).attr('height', height);

  const axes = svg
    .append('g')
    .attr('class', 'axes')
    .attr('transform', 'translate(600, 300)');

  axes
    .append('g')
    .selectAll()
    .data(points)
    .join('polygon')
    .attr('class', 'axis')
    .attr('points', (d) => d)
    .attr('fill', (d, i) => (i % 2 === 0 ? 'white' : '#ddd'))
    .attr('stroke', 'gray');

  // 获取顶层多边形顶点
  const pointsTop = points[0].split(' ').map((d) => d.split(','));
  const lineFn = line() as any;
  axes
    .append('g')
    .selectAll()
    .data(pointsTop)
    .join('path')
    .attr('class', 'line')
    .attr('d', (d) =>
      lineFn([
        [0, 0],
        [d[0], d[1]],
      ])
    )
    .attr('stroke', 'gray');

  // 绘制标签
  const computeTextAnchor = (num: number, i: number) => {
    const angle = (i * 360) / num;
    if (angle === 0 || Math.abs(angle - 180) < 0.01) {
      return 'middle';
    }
    if (angle > 180) {
      return 'end';
    }
    return 'start';
  };
  axes
    .append('g')
    .selectAll()
    .data(data)
    .join('text')
    .attr('fill', '#e14e6f')
    .attr('x', (d, i) => Math.sin((i * Math.PI * 2) / data.length) * 220)
    .attr('y', (d, i) => Math.cos((i * Math.PI * 2) / data.length) * 220)
    .attr('text-anchor', (d, i) => computeTextAnchor(data.length, i))
    .attr('dy', 6.5)
    .text((d) => d.label);

  // 绘制数据
  const newData = [
    data.map((item) => item.value[0]),
    data.map((item) => item.value[1]),
  ];
  const colorScale = scaleOrdinal(schemeSet2) as any;
  function generatePolygons(d: any, index: number) {
    const pois: string[] = [];
    const anglePiece = (Math.PI * 2) / d.length;
    d.forEach((item: any, i: number) => {
      const x = Math.sin(i * anglePiece) * item;
      const y = Math.cos(i * anglePiece) * item;

      // 添加交点圆圈
      axes
        .append('circle')
        .attr('fill', 'white')
        .attr('stroke', colorScale(index))
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 3)
        .transition()
        .duration(1000)
        .attr('cx', x)
        .attr('cy', y);

      pois.push(`${x},${y}`);
    });
    return pois.join(' ');
  }

  axes
    .selectAll()
    .data(newData)
    .join('polygon')
    .attr('class', 'polygon')
    .attr('fill', 'none')
    .attr('stroke', (d, i) => colorScale(i))
    .attr('stroke-white', '2')
    .on('mouseover', (e) => {
      select(e.target).attr('stroke-width', '5');
    })
    .on('mouseleave', (e) => {
      select(e.target).attr('stroke-width', '2');
    })
    .attr('points', (d) => {
      const miniPolygon: string[] = [];
      d.forEach(() => {
        miniPolygon.push('0,0');
      });
      return miniPolygon.join(' ');
    })
    .transition()
    .duration(1000)
    .attr('points', generatePolygons);

  return {
    svg,
  };
}
