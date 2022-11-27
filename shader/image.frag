#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// we need to declare an output for the fragment shader
out vec4 outColor;

// 把白色背景变透明
vec4 transparentWhrite(vec4 st){
  float yuzhi = 0.9;
  if (st.r > yuzhi && st.g > yuzhi && st.b > yuzhi) {
    return vec4(0.0, 0.0, 0.0, 0.0);
  }

  return st;
}

void main() {
  outColor = transparentWhrite(texture(u_image, v_texCoord));
}