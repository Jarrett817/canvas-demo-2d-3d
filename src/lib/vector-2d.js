export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(x, y);
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    // 开平方根，获得长度
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    // 从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  cross(v) {
    return this.x * v.y - v.x * this.y;
  }

  dot(v) {
    return this.x * v.x + v.y * this.y;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  rotate(rad) {
    // 一个向量[x,y]逆时针旋转x弧度，那么旋转后的向量为[x*cos(a)-y*sin(a),x*sin(a)+y*cos(a)]
    /*
      如果一个向量[x,y]逆时针旋转a弧度 那么旋转后的向量为[x*cos(a)-y*sin(a),x*sin(a)+y*cos(a)]

      证明一下:

      设原长度为R的向量v0[x0,y0] 与X轴夹角为a   逆时针旋转b弧度后为向量v1[x1,y1] 现在求v1[x1,y1]

      首先由三角函数定义有: x0=R*cos(a) y0=R*sin(a)

      旋转后 x1=R*cos(a+b)  y1=R*sin(a+b)

      分别使用余弦定理 正弦定理

      x1=R*cos(a)*cos(b)-R*sin(a)*sin(b)

      y1=R*sin(a)*cos(b)+R*cos(a)*sin(b)

      --> x1=x0*cos(b)-y0*sin(b)

            y1=x0*sin(b)+y0*cos(b)
   */
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
