<template>
  <canvas id="canvasTreeDemo" height="300" width="500"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';
import { Vector2D } from '@/lib/vector-2d';

// v0起始向量，length树枝长度，thickness树枝粗细，dir树枝方向，单位是弧度，bias随机偏向因子
const drawBranch = (ctx, v0, length, thickness, dir, bias) => {
  const v = new Vector2D().rotate(dir).scale(length);
  const v1 = v0.copy().add(v);

  // 首先画树根
  ctx.lineWidth = thickness;
  // 开始一条路径
  ctx.beginPath();
  // 移动点，不创建线条
  ctx.moveTo(...v0);
  // 添加一个新点，创建从该点到画布中最后指定点的线条，不画线
  ctx.lineTo(...v1);
  // 画线
  ctx.stroke();

  if (thickness > 2) {
    // 每个树枝开两个叉
    // 旋转树枝 dir+0.2，会得到一颗对称的树
    // const left = dir + 0.2;
    // const right = dir - 0.2;
    /*
      为了更好的效果，加入随机因子 
      pi是180度，取pi/4的弧度，也就是45度
      0.2大约是11度
      Math.random-0.5 表示0到30度
      最终相当于角度在大约(50+自定义角度,80+自定义角度)
    */
    const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
    const right =
      Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
    drawBranch(ctx, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    drawBranch(ctx, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }

  if (thickness < 5 && Math.random() < 0.3) {
    // 先保存当前状态到栈中，此时只是一颗光秃秃的树
    ctx.save();
    // 然后绘制树枝上的花
    ctx.strokeStyle = '#c72c35';
    const th = Math.random() * 6 + 3;
    ctx.lineWidth = th;
    ctx.beginPath();
    ctx.moveTo(...v1);
    ctx.lineTo(v1.x, v1.y - 2);
    ctx.stroke();
    // 最后再将栈中的状态释放出来
    ctx.restore();
  }
};

onMounted(() => {
  const canvas = document.querySelector('#canvasTreeDemo');
  const ctx = canvas.getContext('2d');

  // 变换坐标系
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  // 线末端以圆形结束
  ctx.lineCap = 'round';
  // 初始向量
  const v0 = new Vector2D(canvas.width / 2, 0);
  drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
});
</script>

<style lang="scss" scoped></style>
