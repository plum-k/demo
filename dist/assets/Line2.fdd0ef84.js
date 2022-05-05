import{a0 as F,am as s,i as z,V as h,a5 as O,an as E,ao as y,ap as V,a1 as I,Z as U,aq as S,U as C,ar as L,a9 as W,C as M,c as N,_ as w,h as R,as as q,at as k}from"./index.efc1f02a.js";class P extends F{constructor(){super(),s(this,"isLineSegmentsGeometry",!0),s(this,"type","LineSegmentsGeometry"),s(this,"boundingBox",null),s(this,"boundingSphere",null),s(this,"box",new z),s(this,"vector",new h);const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new O(e,3)),this.setAttribute("uv",new O(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;if(e instanceof Float32Array)t=e;else if(Array.isArray(e))t=new Float32Array(e);else return console.error("LineSegmentsGeometry.setPosition requires either a Float32Array or regular array of numbers"),this;const n=new E(t,6,1);return this.setAttribute("instanceStart",new y(n,3,0)),this.setAttribute("instanceEnd",new y(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;if(e instanceof Float32Array)t=e;else if(Array.isArray(e))t=new Float32Array(e);else return console.error("LineSegmentsGeometry.setColors requires either a Float32Array or regular array of numbers"),this;const n=new E(t,6,1);return this.setAttribute("instanceColorStart",new y(n,3,0)),this.setAttribute("instanceColorEnd",new y(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(Array.from(e.attributes.position.array)),this}fromEdgesGeometry(e){return this.setPositions(Array.from(e.attributes.position.array)),this}fromMesh(e){return this.fromWireframeGeometry(new V(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return t.isBufferGeometry&&this.setPositions(Array.from(t.attributes.position.array)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new z);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),this.box.setFromBufferAttribute(t),this.boundingBox.union(this.box))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new I),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox&&this.boundingBox.getCenter(n);let i=0;for(let o=0,r=e.count;o<r;o++)this.vector.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(this.vector)),this.vector.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(this.vector));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}class J extends P{constructor(){super(),s(this,"type","LineGeometry"),s(this,"isLineGeometry",!0),s(this,"setColors",e=>{const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}),s(this,"fromLine",e=>{const t=e.geometry;return t.isBufferGeometry&&this.setPositions(Array.from(t.attributes.position.array)),this}),s(this,"copy",()=>this)}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}}const X={linewidth:{value:1},resolution:{value:new U(1,1)},dashScale:{value:1},dashSize:{value:1},dashOffset:{value:0},gapSize:{value:1},opacity:{value:1}};S.line={uniforms:C.merge([L.common,L.fog,X]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		varying vec2 vUv;

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			vUv = uv;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec2 ndcStart = clipStart.xy / clipStart.w;
			vec2 ndcEnd = clipEnd.xy / clipEnd.w;

			// direction
			vec2 dir = ndcEnd - ndcStart;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			// perpendicular to dir
			vec2 offset = vec2( dir.y, - dir.x );

			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

			// adjust for linewidth
			offset *= linewidth;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;

		#ifdef USE_DASH

			uniform float dashSize;
			uniform float dashOffset;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		varying vec2 vUv;

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef ALPHA_TO_COVERAGE

			// artifacts appear on some hardware if a derivative is taken within a conditional
			float a = vUv.x;
			float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
			float len2 = a * a + b * b;
			float dlen = fwidth( len2 );

			if ( abs( vUv.y ) > 1.0 ) {

				alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

			}

			#else

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class D extends W{constructor(e={}){super({uniforms:C.clone(S.line.uniforms),vertexShader:S.line.vertexShader,fragmentShader:S.line.fragmentShader,clipping:!0}),s(this,"isLineMaterial",!0),s(this,"dashed",!1),s(this,"color",new M(0)),s(this,"lineWidth",0),s(this,"dashScale",0),s(this,"dashOffset",0),s(this,"dashSize",0),s(this,"opacity",0),s(this,"resolution",new U),s(this,"alphaToCoverage",!1),Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){const n=new M(t);this.uniforms.diffuse.value=n.getHex()}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return Boolean("ALPHA_TO_COVERAGE"in this.defines)},set:function(t){Boolean(t)!==Boolean("ALPHA_TO_COVERAGE"in this.defines)&&(this.needsUpdate=!0),t?(this.defines.ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}},dashed:{enumerable:!0,get:function(){return Boolean("USE_DASH"in this.defines)},set:function(t){Boolean(t)!==Boolean("USE_DASH"in this.defines)&&(this.needsUpdate=!0),t?this.defines.USE_DASH="":delete this.defines.USE_DASH}}}),this.setValues(e)}}class Z extends N{constructor(e=new P,t=new D({color:Math.random()*16777215})){super(e,t),s(this,"type","LineSegments2"),s(this,"isLineSegments2",!0),s(this,"distStart",new h),s(this,"distEnd",new h),s(this,"computeLineDistances",()=>{const n=this.geometry,i=n.attributes.instanceStart,o=n.attributes.instanceEnd,r=new Float32Array(2*i.data.count);for(let c=0,a=0,v=i.data.count;c<v;c++,a+=2)this.distStart.fromBufferAttribute(i,c),this.distEnd.fromBufferAttribute(o,c),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+this.distStart.distanceTo(this.distEnd);const l=new E(r,2,1);return n.setAttribute("instanceDistanceStart",new y(l,1,0)),n.setAttribute("instanceDistanceEnd",new y(l,1,1)),this}),s(this,"rayStart",new w),s(this,"rayEnd",new w),s(this,"ssOrigin",new w),s(this,"ssOrigin3",new h),s(this,"mvMatrix",new R),s(this,"line",new q),s(this,"closestPoint",new h),s(this,"raycast",(n,i)=>{n.camera===null&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.');const o=0,r=n.ray,l=n.camera,c=l.projectionMatrix,a=this.geometry,v=this.material,f=v.resolution,G=v.linewidth+o,b=a.attributes.instanceStart,A=a.attributes.instanceEnd,p=-l.near;r.at(1,this.ssOrigin),this.ssOrigin.w=1,this.ssOrigin.applyMatrix4(l.matrixWorldInverse),this.ssOrigin.applyMatrix4(c),this.ssOrigin.multiplyScalar(1/this.ssOrigin.w),this.ssOrigin.x*=f.x/2,this.ssOrigin.y*=f.y/2,this.ssOrigin.z=0,this.ssOrigin3.set(this.ssOrigin.x,this.ssOrigin.y,this.ssOrigin.z);const x=this.matrixWorld;this.mvMatrix.multiplyMatrices(l.matrixWorldInverse,x);for(let u=0,j=b.count;u<j;u++){if(this.rayStart.fromBufferAttribute(b,u),this.rayEnd.fromBufferAttribute(A,u),this.rayStart.w=1,this.rayEnd.w=1,this.rayStart.applyMatrix4(this.mvMatrix),this.rayEnd.applyMatrix4(this.mvMatrix),this.rayStart.z>p&&this.rayEnd.z>p)continue;if(this.rayStart.z>p){const m=this.rayStart.z-this.rayEnd.z,d=(this.rayStart.z-p)/m;this.rayStart.lerp(this.rayEnd,d)}else if(this.rayEnd.z>p){const m=this.rayEnd.z-this.rayStart.z,d=(this.rayEnd.z-p)/m;this.rayEnd.lerp(this.rayStart,d)}this.rayStart.applyMatrix4(c),this.rayEnd.applyMatrix4(c),this.rayStart.multiplyScalar(1/this.rayStart.w),this.rayEnd.multiplyScalar(1/this.rayEnd.w),this.rayStart.x*=f.x/2,this.rayStart.y*=f.y/2,this.rayEnd.x*=f.x/2,this.rayEnd.y*=f.y/2,this.line.start.set(this.rayStart.x,this.rayStart.y,this.rayStart.z),this.line.start.z=0,this.line.end.set(this.rayEnd.x,this.rayEnd.y,this.rayEnd.z),this.line.end.z=0;const _=this.line.closestPointToPointParameter(this.ssOrigin3,!0);this.line.at(_,this.closestPoint);const B=k(this.rayStart.z,this.rayEnd.z,_),T=B>=-1&&B<=1,H=this.ssOrigin3.distanceTo(this.closestPoint)<G*.5;if(T&&H){this.line.start.fromBufferAttribute(b,u),this.line.end.fromBufferAttribute(A,u),this.line.start.applyMatrix4(x),this.line.end.applyMatrix4(x);const m=new h,d=new h;r.distanceSqToSegment(this.line.start,this.line.end,d,m),i.push({distance:r.origin.distanceTo(d),point:d,face:null,faceIndex:u,object:this,uv:void 0,pointOnLine:m})}}})}}class Y extends Z{constructor(e=new J,t=new D({color:Math.random()*16777215})){super(e,t),s(this,"type","Line2"),s(this,"isLine2",!0)}}export{J as L,D as a,Y as b,P as c};
