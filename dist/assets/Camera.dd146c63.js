import{r as P,C as p,S as U,W as b,A as S,D as f,P as D,O as M,a as v,M as A,b as F,c as u,G,j as B,B as W,d as E}from"./index.efc1f02a.js";const I=()=>(P.exports.useEffect(()=>{const r={camera_x:0,camera_y:50,camera_z:50},a={cameraLook_x:0,cameraLook_y:0,cameraLook_z:0},t={cameraUP_x:0,cameraUP_y:1,cameraUP_z:0},g=new p,s=new U,i=new b({alpha:!0,antialias:!0,canvas:document.getElementById("canvas")});i.setSize(window.innerWidth,window.innerHeight);const L=new S("#DFDFDF",.4);s.add(L);const n=new f(16777215,1);n.position.set(50,50,-50),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,n.shadow.camera.near=1,n.shadow.camera.far=100,s.add(n);const c=new D(75,window.innerWidth/window.innerHeight,.1,1e3);c.position.set(0,50,50),new M(c,i.domElement),y();const w=function(){requestAnimationFrame(w),i.setRenderTarget(null),i.render(s,c)};function k(_,h,m,l){const C=new W(10,10,10),z=new E({color:g.setHex(l)}),d=new u(C,z);return d.name="cube"+l,d.position.set(_,h,m),d.castShadow=!0,s.add(d),d}const x=k(a.cameraLook_x,a.cameraLook_y,a.cameraLook_z,104);function y(){const _=new v(200,200,2),h=new A({color:"#C7DAFF",side:F}),m=new u(_,h);m.rotateX(-Math.PI/2),m.receiveShadow=!0,s.add(m)}w();const e=new G,o=()=>{c.position.set(r.camera_x,r.camera_y,r.camera_z),c.lookAt(a.cameraLook_x,a.cameraLook_y,a.cameraLook_z),c.up.set(t.cameraUP_x,t.cameraUP_y,t.cameraUP_z),x.position.set(a.cameraLook_x,a.cameraLook_y,a.cameraLook_z)};e.add(r,"camera_x",0,100).onChange(o),e.add(r,"camera_y",0,100).onChange(o),e.add(r,"camera_z",0,100).onChange(o),e.add(a,"cameraLook_x",0,100).onChange(o),e.add(a,"cameraLook_y",0,100).onChange(o),e.add(a,"cameraLook_z",0,100).onChange(o),e.add(t,"cameraUP_x",0,1).onChange(o),e.add(t,"cameraUP_y",0,1).onChange(o),e.add(t,"cameraUP_z",0,1).onChange(o)},[]),B("canvas",{id:"canvas"}));export{I as default};