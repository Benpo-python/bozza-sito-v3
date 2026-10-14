'use strict';
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduceMotion.matches;
const motionButton=document.querySelector('.motion-toggle');
function updateMotion(){document.body.classList.toggle('paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Attiva le animazioni':'Metti in pausa le animazioni');motionButton.innerHTML=paused?'▶ <span>Attiva movimento</span>':'Ⅱ <span>Pausa movimento</span>';window.dispatchEvent(new Event('motionchange'));}
motionButton.addEventListener('click',()=>{paused=!paused;updateMotion();});
reduceMotion.addEventListener('change',()=>{paused=reduceMotion.matches;updateMotion();});updateMotion();
const menuButton=document.querySelector('.menu-toggle'),navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Apri il menu');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Chiudi il menu':'Apri il menu');navigation.classList.toggle('open',open);});
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
if('IntersectionObserver' in window){
 if(!reduceMotion.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el);});}
 let heroVisible=true,contactVisible=false;const sticky=document.querySelector('.mobile-sticky');const update=()=>sticky.classList.toggle('visible',!heroVisible&&!contactVisible);
 new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;update();}).observe(document.querySelector('.hero'));
 new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;update();}).observe(document.querySelector('#contatti'));
}
let scrollScheduled=false;
function updateScroll(){scrollScheduled=false;if(paused||reduceMotion.matches)return;document.querySelectorAll('.work-visual').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const amount=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.setProperty('--shift',`${amount*-24}px`);}});const section=document.querySelector('.manifesto');const r=section.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)section.style.setProperty('--move',`${-r.top*.15}px`);}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
document.querySelectorAll('[data-plan]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#plan').value=link.dataset.plan;document.querySelector('#contact-result').hidden=true;}));
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const business=form.elements.business.value.trim(),city=form.elements.city.value.trim();if(!business||!city){const field=!business?form.elements.business:form.elements.city;field.setCustomValidity('Scrivi almeno una parola.');field.reportValidity();return;}const body=`Ciao Andrea! Vorrei una bozza gratuita per ${business}, a ${city}.\nPacchetto: ${form.elements.plan.value}.\n\n${form.elements.message.value.trim()}`;document.querySelector('#send-whatsapp').href=`https://wa.me/393755681862?text=${encodeURIComponent(body)}`;document.querySelector('#send-email').href=`mailto:andreasiti@labottegadelweb.it?subject=${encodeURIComponent('Una bozza per '+business)}&body=${encodeURIComponent(body)}`;const result=document.querySelector('#contact-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'nearest'});});
form.addEventListener('input',event=>{event.target.setCustomValidity?.('');document.querySelector('#contact-result').hidden=true;});form.addEventListener('change',()=>{document.querySelector('#contact-result').hidden=true;});
async function createSculpture(){
 const stage=document.querySelector('#hero-scene'),control=document.querySelector('.scene-control');
 try{
  const THREE=await import('./assets/three.module.min.js');
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x15151b,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  stage.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,9.8);
  const sculpture=new THREE.Group();scene.add(sculpture);
  const envCanvas=document.createElement('canvas');envCanvas.width=512;envCanvas.height=256;const ctx=envCanvas.getContext('2d');
  const gradient=ctx.createLinearGradient(0,0,512,0);gradient.addColorStop(0,'#303044');gradient.addColorStop(.15,'#d7d9ff');gradient.addColorStop(.23,'#222233');gradient.addColorStop(.5,'#6f6b80');gradient.addColorStop(.65,'#ffffff');gradient.addColorStop(.72,'#373747');gradient.addColorStop(1,'#303044');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,256);
  ctx.fillStyle='#ffffff';ctx.fillRect(80,15,40,105);ctx.fillStyle='#ffffff';ctx.fillRect(330,150,70,45);
  const environment=new THREE.CanvasTexture(envCanvas);environment.mapping=THREE.EquirectangularReflectionMapping;environment.colorSpace=THREE.SRGBColorSpace;scene.environment=environment;
  const geometry=new THREE.TorusKnotGeometry(1.36,.49,200,32,2,3);
  const material=new THREE.MeshPhysicalMaterial({color:0xff5925,metalness:.48,roughness:.23,clearcoat:1,clearcoatRoughness:.18,envMapIntensity:1.25});
  const knot=new THREE.Mesh(geometry,material);knot.rotation.set(.4,-.15,.3);sculpture.add(knot);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.65,.012,8,150),new THREE.MeshBasicMaterial({color:0x82787c,transparent:true,opacity:.35}));ring.rotation.set(1.1,.2,.2);sculpture.add(ring);
  const satellite=new THREE.Mesh(new THREE.SphereGeometry(.08,20,20),new THREE.MeshStandardMaterial({color:0xffa770,emissive:0xff6a2d,emissiveIntensity:.4,roughness:.2,metalness:.2}));sculpture.add(satellite);
  scene.add(new THREE.HemisphereLight(0xffeee6,0x524c96,2));
  const key=new THREE.DirectionalLight(0xffefe4,4);key.position.set(-3,4,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0x9cb6ff,4);rim.position.set(4,1,-3);scene.add(rim);
  const low=new THREE.DirectionalLight(0xff6c2c,1);low.position.set(0,-3,2);scene.add(low);
  let visible=true,dragging=false,lastX=0,lastY=0,angleX=0,angleY=0,autoAngle=0,frame=0,lastTime=0;
  function resize(){const r=stage.getBoundingClientRect();camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false);renderer.render(scene,camera);}
  new ResizeObserver(resize).observe(stage);resize();stage.classList.add('loaded');
  function render(time=0){frame=0;const dt=lastTime?Math.min((time-lastTime)/1000,.04):0;lastTime=time;
   if(!paused&&!reduceMotion.matches&&!dragging){autoAngle+=dt*.19;sculpture.position.y=Math.sin(autoAngle*2)*.1;}
   sculpture.rotation.y=autoAngle+angleY;sculpture.rotation.x=Math.sin(autoAngle*.55)*.12+angleX;sculpture.rotation.z=Math.sin(autoAngle*.7)*.08;
   satellite.position.set(Math.cos(autoAngle*1.8)*2.65,Math.sin(autoAngle*1.8)*1.2,Math.sin(autoAngle*1.8)*2.36);
   renderer.render(scene,camera);
   if(visible&&!document.hidden&&!paused&&!reduceMotion.matches)frame=requestAnimationFrame(render);
  }
  function requestRender(){if(!frame){lastTime=0;frame=requestAnimationFrame(render);}}
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)requestRender();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(stage);
  window.addEventListener('motionchange',()=>{if(frame){cancelAnimationFrame(frame);frame=0;}requestRender();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else requestRender();});
  stage.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')return;dragging=true;lastX=event.clientX;lastY=event.clientY;stage.setPointerCapture(event.pointerId);});
  stage.addEventListener('pointermove',event=>{if(!dragging)return;angleY+=(event.clientX-lastX)*.008;angleX+=(event.clientY-lastY)*.005;lastX=event.clientX;lastY=event.clientY;requestRender();});
  stage.addEventListener('pointerup',()=>{dragging=false;requestRender();});stage.addEventListener('pointercancel',()=>{dragging=false;requestRender();});
  control.addEventListener('click',()=>{angleY+=Math.PI/4;angleX+=.12;requestRender();});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();if(frame)cancelAnimationFrame(frame);stage.classList.remove('loaded');});
  render();
 }catch(error){stage.classList.add('fallback');control.setAttribute('aria-label','Ruota la grafica');control.addEventListener('click',()=>{const fallback=stage.querySelector('.sculpture-fallback');fallback.style.transform=`rotate(${Number(fallback.dataset.angle||0)+45}deg)`;fallback.dataset.angle=String(Number(fallback.dataset.angle||0)+45);});}
}
createSculpture();
