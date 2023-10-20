varying float v_posY;

vec4 color_1;
vec4 color_2;

void main() {

  color_1 = vec4(0.75, 0.02, 0.37, 1.0);
  color_2 = vec4(0.18, 0.51, 0.93, 1.0);
  gl_FragColor = mix(color_1, color_2, v_posY);
}