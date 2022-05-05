var v=Object.defineProperty;var h=(o,e,t)=>e in o?v(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var i=(o,e,t)=>(h(o,typeof e!="symbol"?e+"":e,t),t);import{aA as m,a9 as d,r as l,t as c,q as f,j as r,v as g,aB as p,aH as x,p as C,F as b,C as S}from"./index.efc1f02a.js";import{u as F,H as y}from"./useProgress.bd638e4e.js";var M=`

out vec3 vColor;
out vec3 vVertexNormal;
out vec2 vUv;
out float vY; 

void main(){
   vUv = uv;
   vY = position.y;
   vColor = color;
   gl_Position= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,A=`

uniform float height;

in vec3 vVertexNormal;
in vec3 vColor;
in vec2 vUv;
in float vY; 

// pct \u9AD8\u5EA6 st \u5F53\u524D y \u503C
float plot (float st, float pct){
    return smoothstep( pct-8.0, pct, st) - smoothstep( pct, pct+0.02, st);
}

void main(){
    float f1 = plot(vY,height);
    vec4 b1 = mix(vec4(1.0,1.0,1.0,1.0),vec4(f1,f1,f1,1.0),0.8);
    gl_FragColor = mix(vec4(vColor,1.0),b1,f1);
    gl_FragColor = vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,0.9);
}
`;class u extends d{constructor(t){super(t);i(this,"animation",()=>{this.uniforms.time.value+=.01});this.uniforms={height:{value:-10}},this.vertexColors=!0,this.vertexShader=M,this.fragmentShader=A}}m({ScanBottomShaderMaterial:u});function w({count:o=100,temp:e=new x}){const t=new u;return C(()=>{t.uniforms.height.value=t.uniforms.height.value+.1,t.uniforms.height.value>30&&(t.uniforms.height.value=-10)}),r(b,{children:[...new Array(100).keys()].map((s,n)=>{const a=Math.random()*10+5;return r("mesh",{position:[Math.random()*100-50,a/2,Math.random()*100-50],material:t,children:r("boxGeometry",{args:[1,a,1],children:r("instancedBufferAttribute",{attach:"attributes-color",args:[new Float32Array(new S("red").toArray()),3]})})},n)})})}const D=()=>{function o(){const{active:t,progress:s,errors:n,item:a,loaded:_,total:j}=F();return c(y,{center:!0,children:[s," % loaded"]})}const e=l.exports.useRef(null);return c(f,{children:[r("color",{attach:"background",args:["#101010"]}),r(g,{ref:e}),r(l.exports.Suspense,{fallback:r(o,{}),children:r(p,{controls:e,preset:"rembrandt",intensity:1,children:r(w,{})})})]})};export{D as default};
