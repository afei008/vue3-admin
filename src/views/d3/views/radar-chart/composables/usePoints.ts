/**
 * @format
 * @param vertexNum 顶点数
 * @param radius 图半径
 * @param tickNum 层级数
 */

export default function usePoints(
  vertexNum: number,
  radius: number,
  tickNum: number
) {
  const points = []; // 点数组
  let polygon = []; // 多边形

  // 计算顶点间的弧度
  const anglePiece = (Math.PI * 2) / vertexNum;
  // 每个层级高度
  const radiusReduce = radius / tickNum;

  for (let r = radius; r > 0; r -= radiusReduce) {
    polygon = [];
    // 获取每个层顶点位置
    for (let i = 0; i < vertexNum; i += 1) {
      polygon.push(
        `${Math.sin(i * anglePiece) * r},${Math.cos(i * anglePiece) * r}`
      );
    }

    points.push(polygon.join(' '));
  }

  return { points };
}
