/** @format */

import { create, arc, pie, schemeSet3 } from 'd3';

interface OptionsType {
  data: Array<{ name: string; count: number }>;
  width: number;
  height: number;
}

function createPie(options: any) {
  const { svg, data, type, translate } = options;

  const allCount = data.reduce((pre: any, cur: any) => pre + cur.value, 0);

  let innerRadius = 0;
  let outerRadius = (d: any) => 200;
  if (type === 'arc') {
    innerRadius = 100;
  }
  if (type === 'rose') {
    outerRadius = (d) => (d.value / allCount) * 100 + 170;
  }
  const fn = arc()
    .innerRadius(innerRadius)
    .outerRadius((d) => outerRadius(d))
    .padRadius(100)
    .padAngle(2 / 100)
    .cornerRadius(8) as any;

  const group = svg
    .append('g')
    .attr('transform', translate)
    .selectAll('path')
    .data(data)
    .enter()
    .append('g');

  group
    .append('path')
    .attr('fill', (d, i) => schemeSet3[i])
    .attr('d', fn);

  group
    .append('text')
    .text((d: any) => d.data.name)
    .attr('transform', (d) => {
      const angle = (d.endAngle * 180) / Math.PI;
      const dAngle = ((d.endAngle - d.startAngle) * 180) / Math.PI;

      let tAngle = angle - dAngle / 2;

      let tx = 140;
      if (tAngle > 270) {
        tAngle -= 275;
        tx = -140;
      } else {
        tAngle -= 85;
      }
      return `rotate(${tAngle}) translate(${tx}, -10)`;
    });
}

export default function useDraw(options: OptionsType) {
  const { data, width, height } = options;

  const svg = create('svg').attr('width', width).attr('height', height);

  const pieData = pie().value((d: any) => d.count)(data as any);

  // 这三种图形的主要区别在于
  // 环形图有 innerRadius
  // 饼图没有 innerRadius
  // 玫瑰图的 outerRadius 是动态生成的

  // 环形图
  createPie({
    svg,
    data: pieData,
    type: 'arc',
    translate: 'translate(200, 300)',
  });

  // 饼图
  createPie({
    svg,
    data: pieData,
    type: 'pie',
    translate: 'translate(600, 300)',
  });

  // 玫瑰图
  createPie({
    svg,
    data: pieData,
    type: 'rose',
    translate: 'translate(1000, 300)',
  });

  return {
    svg,
  };
}
