'use strict';
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Apri il menu');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Chiudi il menu':'Apri il menu');navigation.classList.toggle('open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
if('IntersectionObserver' in window){
 if(!motion.matches){document.documentElement.classList.add('js-motion');const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');reveal.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');reveal.observe(el);});}
 const sticky=document.querySelector('.mobile-sticky');let heroVisible=true,contactVisible=false;
 const updateSticky=()=>sticky.classList.toggle('visible',!heroVisible&&!contactVisible);
 new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;updateSticky();}).observe(document.querySelector('.hero'));
 new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateSticky();}).observe(document.querySelector('#contatti'));
}
const motionButton=document.querySelector('.motion-toggle');
let paused=motion.matches;
function setMotion(){document.body.classList.toggle('paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Attiva le animazioni':'Metti in pausa le animazioni');motionButton.innerHTML=paused?'▶ <span>Attiva animazioni</span>':'Ⅱ <span>Pausa animazioni</span>';}
setMotion();motionButton.addEventListener('click',()=>{paused=!paused;setMotion();});
motion.addEventListener('change',()=>{paused=motion.matches;setMotion();});
const previews={en:{name:'Enoteca Marchetti',url:'enoteca-marchetti',phone:'en-hero-400.webp',count:'01'},bl:{name:'Bottega Bellini',url:'bottega-bellini',phone:'bl-hero-400.webp',count:'02'},es:{name:'Studio Luce',url:'studio-luce',phone:'es-hero-400.webp',count:'03'}};
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.preview;const data=previews[key];document.querySelector('#hero-preview').src=`assets/${key}-desktop-800.webp`;document.querySelector('#hero-preview').alt=`Anteprima del sito dimostrativo ${data.name}`;const phone=document.querySelector('.phone img');phone.src=`assets/${data.phone}`;phone.alt=`Lo stesso sito ${data.name} su smartphone`;document.querySelector('#preview-url').textContent=`${data.url} · sito demo`;document.querySelector('#preview-count').textContent=`${data.count} / 03`;document.querySelectorAll('[data-preview]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
const art=document.querySelector('.hero-art');const stage=document.querySelector('.hero-stage');
if(matchMedia('(pointer:fine)').matches){art.addEventListener('pointermove',event=>{if(paused||motion.matches)return;const r=art.getBoundingClientRect();stage.style.setProperty('--mx',`${((event.clientX-r.left)/r.width-.5)*10}px`);stage.style.setProperty('--my',`${((event.clientY-r.top)/r.height-.5)*10}px`);});art.addEventListener('pointerleave',()=>{stage.style.setProperty('--mx','0px');stage.style.setProperty('--my','0px');});}
document.querySelectorAll('[data-plan]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#plan').value=link.dataset.plan;document.querySelector('#contact-result').hidden=true;}));
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const business=form.elements.business.value.trim(),city=form.elements.city.value.trim();if(!business||!city){const input=!business?form.elements.business:form.elements.city;input.setCustomValidity('Scrivi almeno una parola.');input.reportValidity();return;}const body=`Ciao Andrea! Vorrei una bozza gratuita per ${business}, a ${city}.\nPacchetto: ${form.elements.plan.value}.\n\n${form.elements.message.value.trim()}`;document.querySelector('#send-whatsapp').href=`https://wa.me/393755681862?text=${encodeURIComponent(body)}`;document.querySelector('#send-email').href=`mailto:andreasiti@labottegadelweb.it?subject=${encodeURIComponent('Una bozza per '+business)}&body=${encodeURIComponent(body)}`;const result=document.querySelector('#contact-result');result.hidden=false;result.focus({preventScroll:true});result.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'nearest'});});
form.addEventListener('input',event=>{event.target.setCustomValidity?.('');document.querySelector('#contact-result').hidden=true;});
form.addEventListener('change',()=>{document.querySelector('#contact-result').hidden=true;});
