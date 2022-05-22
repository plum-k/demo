var j=Object.defineProperty;var A=(t,s,o)=>s in t?j(t,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[s]=o;var y=(t,s,o)=>(A(t,typeof s!="symbol"?s+"":s,o),o);import{k as W,a2 as E,ah as R,a7 as M,x as B,b as C,G as T,C as _,r as D,S as V,P as G,W as N,as as k,O as H,a as z,d as U,c as P,B as O,j as F,V as S,n as $}from"./index.0d8aed65.js";var I={exports:{}};(function(t,s){(function(o,e){t.exports=e()})(W,function(){var o=function(){function e(c){return n.appendChild(c.dom),c}function r(c){for(var u=0;u<n.children.length;u++)n.children[u].style.display=u===c?"block":"none";m=c}var m=0,n=document.createElement("div");n.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",n.addEventListener("click",function(c){c.preventDefault(),r(++m%n.children.length)},!1);var i=(performance||Date).now(),f=i,a=0,v=e(new o.Panel("FPS","#0ff","#002")),w=e(new o.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var p=e(new o.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:n,addPanel:e,showPanel:r,begin:function(){i=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(w.update(c-i,200),c>f+1e3&&(v.update(1e3*a/(c-f),100),f=c,a=0,p)){var u=performance.memory;p.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return c},update:function(){i=this.end()},domElement:n,setMode:r}};return o.Panel=function(e,r,m){var n=1/0,i=0,f=Math.round,a=f(window.devicePixelRatio||1),v=80*a,w=48*a,p=3*a,c=2*a,u=3*a,d=15*a,x=74*a,g=30*a,h=document.createElement("canvas");h.width=v,h.height=w,h.style.cssText="width:80px;height:48px";var l=h.getContext("2d");return l.font="bold "+9*a+"px Helvetica,Arial,sans-serif",l.textBaseline="top",l.fillStyle=m,l.fillRect(0,0,v,w),l.fillStyle=r,l.fillText(e,p,c),l.fillRect(u,d,x,g),l.fillStyle=m,l.globalAlpha=.9,l.fillRect(u,d,x,g),{dom:h,update:function(b,L){n=Math.min(n,b),i=Math.max(i,b),l.fillStyle=m,l.globalAlpha=1,l.fillRect(0,0,v,d),l.fillStyle=r,l.fillText(f(b)+" "+e+" ("+f(n)+"-"+f(i)+")",p,c),l.drawImage(h,u+a,d,x-a,g,u,d,x-a,g),l.fillRect(u+x-a,d,a,g),l.fillStyle=m,l.globalAlpha=.9,l.fillRect(u+x-a,d,a,f((1-b/L)*g))}}},o})})(I);var q=I.exports;function J(t){return t===null}function K(t){return t===void 0}function Q(){const t=new q;return t.showPanel(0),document.body.appendChild(t.dom),t}function X(t){return!K(t)&&!J(t)&&Reflect.has(t,"getContext")}function Y(){const t=document.getElementById("canvas");if(X(t))return t.width=document.body.clientWidth,t.height=document.body.clientHeight,t;throw new Error("")}class Z extends E{constructor(s,o){super(),this.type="WallGeometry";const e=[],r=[];for(let m=0,n=e.length,i=r.length;m<s.length-1;m++){let f=1,a=s[m],v=s[m+1];e[n++]=a.x,e[n++]=0,e[n++]=a.y,r[i++]=0,r[i++]=0,e[n++]=v.x,e[n++]=0,e[n++]=v.y,r[i++]=1,r[i++]=0,e[n++]=a.x,e[n++]=o,e[n++]=a.y,r[i++]=0,r[i++]=f,e[n++]=a.x,e[n++]=o,e[n++]=a.y,r[i++]=0,r[i++]=f,e[n++]=v.x,e[n++]=0,e[n++]=v.y,r[i++]=1,r[i++]=0,e[n++]=v.x,e[n++]=o,e[n++]=v.y,r[i++]=1,r[i++]=f}this.setAttribute("position",new R(new Float32Array(e),3)),this.setAttribute("uv",new R(new Float32Array(r),2))}}var ee=`

varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
}
`,te=`

in vec2 vUv;
uniform float time;
uniform float speed; 
uniform sampler2D textureMap;

void main() {
    // pc_fragColor = texture(textureMap, vec2(vUv.x, fract(vUv.y + time*speed)));
    pc_fragColor = texture(textureMap, vec2(fract(vUv.x + time*speed),vUv.y));
}
`;class oe extends M{constructor(o){super(o);y(this,"animation",o=>{this.uniforms.time.value+=o});const e=new B().load("images/test1.jpg");this.vertexShader=ee,this.fragmentShader=te,this.uniforms={time:{value:0},speed:{value:.25},textureMap:{value:e}},this.side=C,this.transparent=!0,this.depthWrite=!1}}var ne=`

out vec2 vUv;
out vec3 fNormal;
out vec3 vPosition;

void main(){
    vUv = uv;
    fNormal = normal;
    vPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}
`,ae=`

in vec2 vUv;
in vec3 fNormal;
in vec3 vPosition;

uniform float time;
uniform sampler2D colorTexture;
uniform sampler2D colorTexture1;

void main( void ) {
    vec2 position = vUv;
    vec3 tempNomal= normalize(fNormal);
    float power=step(0.95,abs(tempNomal.y));
    vec4 colorb=texture2D(colorTexture1,position.xy);
    vec4 colora = texture2D(colorTexture,vec2(vUv.x,fract(vUv.y-time))); 
    if(power>0.95){
        gl_FragColor =colorb;
    }else{
        gl_FragColor =colorb+colorb*colora;      
    }         
}
`;class re extends M{constructor(o){super(o);y(this,"animation",()=>{this.uniforms.time.value+=.01});const e=new B().load("images/test1.jpg"),r=new B().load("images/test2.jpg");this.uniforms={time:{value:-1},colorTexture1:{value:e},colorTexture:{value:r}},this.vertexShader=ne,this.fragmentShader=ae,this.blending=T,this.transparent=!0,this.depthTest=!1,this.side=C}}var ie=`
varying vec3 vPosition;
varying vec2 vUV;
void main() {
    vUV = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}
`,le=`
uniform float time;
uniform vec3 _FlashColor;
uniform vec3 baseColor;
uniform float _Angle;
uniform float _Width;
varying vec2 vUV;
float inFlash(vec2 uv){
    float brightness = 0.0;
    
    float angleInRad = 0.0174444 * _Angle;
    float tanInverseInRad = 1.0 / tan(angleInRad);
                                
    bool onLeft = (tanInverseInRad > 0.0);
    float xBottomFarLeft = onLeft? 0.0 : tanInverseInRad;
    float xBottomFarRight = onLeft? (1.0 + tanInverseInRad):1.0;

    float percent =time;
    float xBottomRightBound = xBottomFarLeft + percent * (xBottomFarRight - xBottomFarLeft);
    float xBottomLeftBound = xBottomRightBound - _Width;
    
    float xProj = uv.x + uv.y * tanInverseInRad;
    
    if(xProj > xBottomLeftBound && xProj < xBottomRightBound)
    {
          brightness = 1.0 - abs(2.0 * xProj - (xBottomLeftBound + xBottomRightBound)) / _Width;
    }

    return brightness;
}
void main() {
    //vec2 tempUV=vUV;
    float brightness = inFlash(vUV);
    gl_FragColor.rgb = baseColor.rgb*1.2 + _FlashColor.rgb * brightness;
    gl_FragColor.a=1.0;
}
`;class se extends M{constructor(o){super(o);y(this,"animation",()=>{this.uniforms.time.value>.8&&(this.uniforms.time.value=0),this.uniforms.time.value+=.001});this.uniforms={time:{value:0},baseColor:{value:new _(1,0,0)},_FlashColor:{value:new _(1,1,1)},_Angle:{value:45},_Width:{value:.05}},this.vertexShader=ie,this.fragmentShader=le,this.transparent=!0,this.depthTest=!0,this.side=C}}var ce=`

varying vec3 vp;
void main(){
    vp = position;
    gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,ue=`

varying vec3 vp;

uniform vec3 u_color;
uniform vec3 u_tcolor;
uniform float u_r;
uniform float u_length;
uniform float u_max;

float getLeng(float x, float y){
    return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
}

void main(){
    float uOpacity = 0.3;
    vec3 vColor = u_color;
    float uLength = getLeng(vp.x,vp.z);
    if ( uLength <= u_r && uLength > u_r - u_length ) {
        float op = sin( (u_r - uLength) / u_length ) * 0.6 + 0.3 ;
        uOpacity = op;
        if( vp.y<0.0){
            vColor  = u_tcolor * 0.6;
        }else{
            vColor = u_tcolor;
        };
    }
    gl_FragColor = vec4(vColor,uOpacity);
}
`;class ve extends M{constructor(o){super(o);y(this,"animation",o=>{this.uniforms.u_r.value+=o*50,this.uniforms.u_r.value>=300&&(this.uniforms.u_r.value=20)});this.uniforms={u_color:{value:new _("#5588aa")},u_tcolor:{value:new _("#ff9800")},u_r:{value:.25},u_length:{value:20},u_max:{value:300}},this.vertexShader=ce,this.fragmentShader=ue,this.side=C,this.transparent=!0,this.depthWrite=!1}}const de=()=>(D.exports.useEffect(()=>{Q();const t=new V,s=new G(45,window.innerWidth/window.innerHeight,.1,1e3),o=new N({canvas:Y()});o.setClearColor(new _(0));const e=document.getElementById("canvas-view");o.setSize(e.clientWidth,e.clientHeight);const r=new k(20);t.add(r);const m=new H(s,o.domElement),n=[new S(10,10),new S(10,30),new S(30,30),new S(30,10),new S(10,10)],i=new Z(n,20),f=new z(60,20),a=new U({color:11184810}),v=new P(f,a);v.rotation.x=-.5*Math.PI,v.position.set(15,0,0),t.add(v);const w=new O(4,4,4),p=new re;new U({color:16711680,wireframe:!0});const c=new se,u=new ve,d=new P(w,u);t.add(d);const x=new oe,g=new P(i,p);t.add(g),s.position.set(-30,40,30),s.lookAt(t.position);const h=new $,l=()=>{requestAnimationFrame(l),m.update(),x.animation(h.getDelta()),p.animation(),u.animation(h.getDelta()),c.animation(),o.render(t,s)};l()},[]),F("div",{id:"canvas-view",className:"w-full h-full",children:F("canvas",{id:"canvas"})}));export{de as default};
