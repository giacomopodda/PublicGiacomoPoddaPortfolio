(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[696],{1905:e=>{e.exports={container:"LightRays_container__zfLWu"}},2429:e=>{e.exports={stage:"pgengine_stage__2fq4i",lightRays:"pgengine_lightRays__UoPkr",scrim:"pgengine_scrim__NAMfW",lightOn:"pgengine_lightOn__yBQUe",showcase:"pgengine_showcase__AZpDb",backButton:"pgengine_backButton__zuNJl",instruction:"pgengine_instruction__5uDDb",contentReveal:"pgengine_contentReveal__mLgvV",prototypeCard:"pgengine_prototypeCard__irLb8",browserBar:"pgengine_browserBar___9LMx",browserDots:"pgengine_browserDots___5S4W",cardVisual:"pgengine_cardVisual__hxDJX",cardShade:"pgengine_cardShade__9Tq6u",leggiPlaceholder:"pgengine_leggiPlaceholder__sGL9D",cardCopy:"pgengine_cardCopy__vg_cz",projectLaunch:"pgengine_projectLaunch__Ci_xA",projectExpand:"pgengine_projectExpand__iiKKw",projectLaunchVisual:"pgengine_projectLaunchVisual__TnOJK",projectLaunchShade:"pgengine_projectLaunchShade__D2anD",projectImageSettle:"pgengine_projectImageSettle__XIPl9",projectShadeOut:"pgengine_projectShadeOut__S0tV9",projectCopyOut:"pgengine_projectCopyOut__VM7JP",projectLaunchChrome:"pgengine_projectLaunchChrome__pLfhH",projectChromeOut:"pgengine_projectChromeOut__VoOiI"}},4100:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2429,23)),Promise.resolve().then(t.bind(t,8983)),Promise.resolve().then(t.bind(t,5773)),Promise.resolve().then(t.t.bind(t,3449,23))},5773:(e,r,t)=>{"use strict";t.d(r,{default:()=>g});var n=t(6481),a=t(4526),o=t(2643),i=t(4206),l=t(9340),c=t(8075),s=t(1905),u=t.n(s);let d="#ffffff",f=e=>{let r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?[parseInt(r[1],16)/255,parseInt(r[2],16)/255,parseInt(r[3],16)/255]:[1,1,1]},h=(e,r,t)=>{switch(e){case"top-left":return{anchor:[0,-.2*t],dir:[0,1]};case"top-right":return{anchor:[r,-.2*t],dir:[0,1]};case"left":return{anchor:[-.2*r,.5*t],dir:[1,0]};case"right":return{anchor:[1.2*r,.5*t],dir:[-1,0]};case"bottom-left":return{anchor:[0,1.2*t],dir:[0,-1]};case"bottom-center":return{anchor:[.5*r,1.2*t],dir:[0,-1]};case"bottom-right":return{anchor:[r,1.2*t],dir:[0,-1]};default:return{anchor:[.5*r,-.2*t],dir:[0,1]}}},g=({raysOrigin:e="top-center",raysColor:r=d,raysColor2:t,raysSpeed:s=1,lightSpread:g=1,rayLength:m=2,pulsating:p=!1,fadeDistance:v=1,saturation:y=1,followMouse:x=!0,mouseInfluence:_=.1,noiseAmount:w=0,distortion:C=0,lightMode:j=!1,className:b=""})=>{let R=(0,a.useRef)(null),D=(0,a.useRef)(null),L=(0,a.useRef)(null),P=(0,a.useRef)({x:.5,y:.5}),I=(0,a.useRef)({x:.5,y:.5}),S=(0,a.useRef)(null),E=(0,a.useRef)(null),z=(0,a.useRef)(null),[A,N]=(0,a.useState)(!1),k=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(R.current)return k.current=new IntersectionObserver(e=>{N(e[0].isIntersecting)},{threshold:.1}),k.current.observe(R.current),()=>{k.current&&(k.current.disconnect(),k.current=null)}},[]),(0,a.useEffect)(()=>{if(A&&R.current)return z.current&&(z.current(),z.current=null),(async()=>{if(!R.current||(await new Promise(e=>setTimeout(e,10)),!R.current))return;let n=new o.A({dpr:Math.min(window.devicePixelRatio,2),alpha:!0});L.current=n;let a=n.gl;for(a.canvas.style.width="100%",a.canvas.style.height="100%";R.current.firstChild;)R.current.removeChild(R.current.firstChild);R.current.appendChild(a.canvas);let u=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,d=`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform vec3  raysColor2;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
uniform float lightMode;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  float rays1 = rayStrength(
    rayPos,
    finalRayDir,
    coord,
    36.2214,
    21.11349,
    1.5 * raysSpeed
  );
  float rays2 = rayStrength(
    rayPos,
    finalRayDir,
    coord,
    22.3991,
    18.0234,
    1.1 * raysSpeed
  );

  vec3 coloredRays = raysColor * rays1 * 0.5 + raysColor2 * rays2 * 0.4;
  fragColor = vec4(coloredRays, max(rays1, rays2));

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.rgb *= 0.45 + brightness * 0.55;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  if (lightMode > 0.5) {
    vec3 mapped = vec3(1.0) - exp(-max(fragColor.rgb, vec3(0.0)) * 1.35);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    vec3 ink = mix(hue * 0.25, hue * 0.72, energy);
    fragColor = vec4(mix(vec3(1.0), ink, energy), 1.0);
  }
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`,b={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:f(r)},raysColor2:{value:f(t??r)},raysSpeed:{value:s},lightSpread:{value:g},rayLength:{value:m},pulsating:{value:+!!p},fadeDistance:{value:v},saturation:{value:y},mousePos:{value:[.5,.5]},mouseInfluence:{value:_},noiseAmount:{value:w},distortion:{value:C},lightMode:{value:+!!j}};D.current=b;let A=new i.l(a),N=new l.B(a,{vertex:u,fragment:d,uniforms:b}),k=new c.e(a,{geometry:A,program:N});E.current=k;let M=()=>{if(!R.current||!n)return;n.dpr=Math.min(window.devicePixelRatio,2);let{clientWidth:r,clientHeight:t}=R.current;n.setSize(r,t);let a=n.dpr,o=r*a,i=t*a;b.iResolution.value=[o,i];let{anchor:l,dir:c}=h(e,o,i);b.rayPos.value=l,b.rayDir.value=c},O=e=>{if(L.current&&D.current&&E.current){b.iTime.value=.001*e,x&&_>0&&(I.current.x=.92*I.current.x+.07999999999999996*P.current.x,I.current.y=.92*I.current.y+.07999999999999996*P.current.y,b.mousePos.value=[I.current.x,I.current.y]);try{n.render({scene:k}),S.current=requestAnimationFrame(O)}catch(e){console.warn("WebGL rendering error:",e);return}}};window.addEventListener("resize",M),M(),S.current=requestAnimationFrame(O),z.current=()=>{if(S.current&&(cancelAnimationFrame(S.current),S.current=null),window.removeEventListener("resize",M),n)try{let e=n.gl.canvas,r=n.gl.getExtension("WEBGL_lose_context");r&&r.loseContext(),e&&e.parentNode&&e.parentNode.removeChild(e)}catch(e){console.warn("Error during WebGL cleanup:",e)}L.current=null,D.current=null,E.current=null}})(),()=>{z.current&&(z.current(),z.current=null)}},[A,e,r,t,s,g,m,p,v,y,x,_,w,C,j]),(0,a.useEffect)(()=>{if(!D.current||!R.current||!L.current)return;let n=D.current,a=L.current;n.raysColor.value=f(r),n.raysColor2.value=f(t??r),n.raysSpeed.value=s,n.lightSpread.value=g,n.rayLength.value=m,n.pulsating.value=+!!p,n.fadeDistance.value=v,n.saturation.value=y,n.mouseInfluence.value=_,n.noiseAmount.value=w,n.distortion.value=C,n.lightMode.value=+!!j;let{clientWidth:o,clientHeight:i}=R.current,l=a.dpr,{anchor:c,dir:u}=h(e,o*l,i*l);n.rayPos.value=c,n.rayDir.value=u},[r,t,s,g,e,m,p,v,y,_,w,C,j]),(0,a.useEffect)(()=>{let e=e=>{if(!R.current||!L.current)return;let r=R.current.getBoundingClientRect();P.current={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}};if(x)return window.addEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)},[x]),(0,n.jsx)("div",{ref:R,className:`${u().container} ${b}`.trim()})}},5809:e=>{e.exports={container:"CardSwap_container__jvQBW",card:"CardSwap_card__jy_KD"}},8983:(e,r,t)=>{"use strict";t.d(r,{default:()=>g});var n=t(6481),a=t(2473),o=t(2635),i=t(4526),l=t(9886),c=t(5809),s=t.n(c);function u({children:e,cardLabels:r=[],cardDistance:t=55,verticalDistance:a=70,delay:o=7e3,pauseOnHover:c=!0,onFrontCardClick:d}){let f=(0,i.useMemo)(()=>i.Children.toArray(e),[e]),h=(0,i.useRef)([]),g=(0,i.useRef)(f.map((e,r)=>r)),m=(0,i.useRef)(null),p=(0,i.useRef)(null),v=(0,i.useRef)(!1),y=(0,i.useRef)(!1),x=(0,i.useCallback)(()=>window.innerWidth<=560?.42:window.innerWidth<=900?.7:1,[]),_=(0,i.useCallback)(e=>{let r=x();return{x:e*t*r,y:-e*a*r,z:-e*t*1.3*r,zIndex:f.length-e}},[t,f.length,x,a]),w=(0,i.useCallback)(()=>{g.current.forEach((e,r)=>{let t=h.current[e];t&&l.Ay.set(t,{..._(r),xPercent:-50,yPercent:-50,transformOrigin:"center center",force3D:!0})})},[_]),C=(0,i.useCallback)((e=1,r)=>{if(v.current||g.current.length<2)return;let t=Math.max(1,Math.min(e,g.current.length-1)),n=[...g.current];v.current=!0;let a=l.Ay.timeline({onComplete:()=>{g.current=n,v.current=!1,r?.()}});m.current=a;for(let e=0;e<t;e+=1){let[r,...t]=n,o=h.current[r];if(!o)continue;let i=2.08*e,l=i+.18,c=i+.28;a.to(o,{y:`+=${Math.max(500,o.offsetHeight+140)}`,duration:1.8,ease:"elastic.out(0.6, 0.9)"},i),t.forEach((e,r)=>{let t=h.current[e];if(!t)return;let n=_(r);a.set(t,{zIndex:n.zIndex},l),a.to(t,{...n,duration:1.8,ease:"elastic.out(0.6, 0.9)"},l+.15*r)});let s=_(t.length);a.set(o,{zIndex:s.zIndex},c),a.to(o,{...s,duration:1.8,ease:"elastic.out(0.6, 0.9)"},c),n=[...t,r]}},[_]),j=(0,i.useCallback)((e,r,t)=>{if(v.current||r<=0)return;let n=[...g.current],a=h.current[e];if(!a)return;let o=n.slice(0,r),i=[e,...o,...n.slice(r+1)],c=_(0),s=Math.max(480,a.offsetHeight+160);v.current=!0;let u=l.Ay.timeline({onComplete:()=>{g.current=i,i.forEach((e,r)=>{let t=h.current[e];t&&l.Ay.set(t,{..._(r),rotation:0,scale:1})}),v.current=!1,t?.()}});m.current=u,u.to(a,{x:c.x-36,y:`+=${s}`,rotation:-3.5,scale:.96,duration:.72,ease:"power3.in"}),o.forEach((e,r)=>{let t=h.current[e];if(!t)return;let n=_(r+1);u.set(t,{zIndex:n.zIndex},.18+.07*r),u.to(t,{...n,duration:1.18,ease:"elastic.out(0.62, 0.86)"},.18+.07*r)}),u.set(a,{...c,y:c.y+.82*s,zIndex:f.length+1},.74),u.to(a,{...c,rotation:0,scale:1,duration:1.22,ease:"elastic.out(0.56, 0.82)"},.76)},[f.length,_]),b=(0,i.useCallback)(()=>{null!==p.current&&window.clearInterval(p.current),p.current=window.setInterval(()=>C(1),o)},[C,o]),R=(0,i.useCallback)(e=>{if(v.current)return;let r=g.current.indexOf(e);r<=0?d?.(e):(null!==p.current&&window.clearInterval(p.current),p.current=null,j(e,r,()=>{y.current||b()}))},[d,b,j]);function D(){c&&(y.current=!0,null!==p.current&&window.clearInterval(p.current),p.current=null)}function L(){y.current=!1,c&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&b()}return(0,i.useEffect)(()=>{function e(){m.current?.kill(),v.current=!1,w()}return g.current=f.map((e,r)=>r),w(),window.matchMedia("(prefers-reduced-motion: reduce)").matches||b(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e),m.current?.kill(),null!==p.current&&window.clearInterval(p.current)}},[f,w,b]),(0,n.jsx)("div",{className:s().container,onMouseEnter:D,onMouseLeave:L,onFocus:D,onBlur:L,children:f.map((e,t)=>(0,n.jsx)("article",{ref:e=>{h.current[t]=e},className:s().card,role:"button",tabIndex:0,"aria-label":r[t],onClick:()=>R(t),onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),R(t))},children:e},t))})}var d=t(2429),f=t.n(d);let h=[{name:"BUILD Pro",category:"Edilizia \xb7 Esperienza immersiva",image:"/projects/build-pro/cover-v2.webp",href:"/build-pro-v2/index.html"},{name:"BUILD Essential",category:"Edilizia \xb7 Presenza essenziale",image:"/projects/build-essential/cover.webp",href:"/build-essential/index.html"},{name:"LEGGI",category:"Ristorazione \xb7 Ospitalit\xe0",image:null,href:null}];function g(){let e=(0,i.useRef)([]),r=(0,i.useRef)(null),[t,l]=(0,i.useState)(null),c=t?h[t.index]:null,s=c?.image??null;return(0,i.useEffect)(()=>()=>{null!==r.current&&window.clearTimeout(r.current)},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{cardDistance:75,verticalDistance:95,delay:7e3,pauseOnHover:!0,onFrontCardClick:function(n){let a=h[n],o=e.current[n];if(!a.href||!o||t)return;let i=`/PublicGiacomoPoddaPortfolio${a.href}`;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){window.location.href=i;return}let c=o.getBoundingClientRect();l({index:n,top:c.top,left:c.left,width:c.width,height:c.height}),r.current=window.setTimeout(()=>{window.location.href=i},920)},cardLabels:h.map(e=>`${e.name}. ${e.category}. ${e.href?"Premi per visitare la pagina":"Progetto in preparazione"}`),children:h.map((r,t)=>(0,n.jsxs)("div",{ref:r=>{e.current[t]=r},className:f().prototypeCard,children:[(0,n.jsxs)("div",{className:f().browserBar,children:[(0,n.jsxs)("span",{className:f().browserDots,"aria-hidden":"true",children:[(0,n.jsx)("i",{}),(0,n.jsx)("i",{}),(0,n.jsx)("i",{})]}),(0,n.jsxs)("strong",{children:[r.name,".preview"]}),(0,n.jsx)("span",{"aria-hidden":"true",children:"↗"})]}),(0,n.jsxs)("div",{className:f().cardVisual,children:[r.image?(0,n.jsx)(a.default,{src:r.image,alt:"",fill:!0,priority:t<2,sizes:"(max-width: 700px) 82vw, (max-width: 1000px) 58vw, 43vw"}):(0,n.jsx)("div",{className:f().leggiPlaceholder,"aria-hidden":"true",children:(0,n.jsx)("span",{children:"LEGGI"})}),(0,n.jsx)("span",{className:f().cardShade,"aria-hidden":"true"})]}),(0,n.jsxs)("div",{className:f().cardCopy,children:[(0,n.jsx)("p",{children:r.category}),(0,n.jsx)("h2",{children:r.name}),(0,n.jsx)("span",{children:r.href?"Premi per visitare la pagina":"In progettazione"})]})]},r.name))}),t&&c?(0,o.createPortal)((0,n.jsxs)("div",{className:f().projectLaunch,style:{"--launch-top":`${t.top}px`,"--launch-left":`${t.left}px`,"--launch-width":`${t.width}px`,"--launch-height":`${t.height}px`},"aria-hidden":"true",children:[(0,n.jsxs)("div",{className:f().projectLaunchChrome,children:[(0,n.jsxs)("span",{className:f().browserDots,children:[(0,n.jsx)("i",{}),(0,n.jsx)("i",{}),(0,n.jsx)("i",{})]}),(0,n.jsxs)("strong",{children:[c.name,".preview"]})]}),(0,n.jsxs)("div",{className:f().projectLaunchVisual,children:[s?(0,n.jsx)(a.default,{src:s,alt:"",fill:!0,priority:!0,sizes:"100vw"}):null,(0,n.jsx)("span",{className:f().projectLaunchShade}),(0,n.jsx)("strong",{children:c.name})]})]}),document.body):null]})}}},e=>{e.O(0,[301,815,994,449,461,416,358],()=>e(e.s=4100)),_N_E=e.O()}]);