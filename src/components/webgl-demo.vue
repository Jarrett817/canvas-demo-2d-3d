<template>
  <canvas id="webglDemo" width="600" height="300"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  const canvas = document.querySelector('#webglDemo');

  const gl = canvas.getContext('webgl');
  const vertex = `
  attribute vec2 position;
  void main(){
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;
  const fragment = `
    precision mediump float;
    void main(){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
  `;
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);
  // 创建WebGLProgram对象，并将这两个shader关联到WebGL程序上
  // 主要是添加vertexShader和fragmentShader，然后将这个WebGLProgram对象链接到WebGL上下文对象上
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  // 最后一步，通过useProgram选择启用这个WebGLProgram对象，当我们绘制图形时，GPU就会执行我们设定的两个shader程序了
  gl.useProgram(program);
  // 接下来，只要将三角形的数据存入缓冲区，就能将这些数据送入GPU了
  const points = new Float32Array([-1, -1, -0, 1, 1, -1]);
  // 然后将数据写入WebGL缓冲区。
  // 创建一个缓存对象
  const bufferId = gl.createBuffer();
  // 写入缓存对象
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  // 将缓冲区数据读取到GPU
  // 获取顶点着色器中的position
  const vPosition = gl.getAttribLocation(program, 'position');
  console.log(vPosition);

  // 给变量设置长度和类型
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  // 激活变量
  gl.enableVertexAttribArray(vPosition);
  // 执行着色器程序完成绘制
  // 现在GPU可以读取绑定的数据到着色器变量了。接下来调用绘图指令，就可以执行着色器程序来完成绘制
  // 先清除画布内容
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 传入绘制模式
  gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
});
</script>

<style lang="scss" scoped></style>
