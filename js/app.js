document.addEventListener('contextmenu', event => event.preventDefault());

const services = [
  {id:1,name:'Blanqueamiento dental',description:'Procedimiento estético para blanquear la sonrisa.',price:79990,image:'images/clareamento'},
  {id:2,name:'Ortodoncia',description:'Tratamiento para alinear los dientes.',price:null,image:'images/ortondotia'},
  {id:3,name:'Implantes dentales',description:'Reemplazo de dientes con evaluación profesional.',price:null,image:'images/implantes'},
  {id:4,name:'Limpieza dental',description:'Higiene y prevención de la salud bucal.',price:31990,image:'images/limpeza'},
  {id:5,name:'Carillas dentales',description:'Corrección del color, forma y alineación dental.',price:null,image:'images/lentes.webp'},
  {id:6,name:'Armonización facial',description:'Procedimientos para equilibrar la proporción del rostro.',price:null,image:'images/rosto2.webp'},
  {id:7,name:'Relleno labial',description:'Volumen, contorno e hidratación natural para los labios.',price:159990,image:'images/labial.webp'},
  {id:8,name:'Tratamiento de conducto (Endodoncia)',description:'Alivio del dolor y recuperación del diente afectado.',price:null,image:'images/canal.webp'},
  {id:9,name:'Extracción de muela del juicio',description:'Extracción de dientes incluidos o problemáticos.',price:59990,image:'images/cicu.webp'},
  {id:10,name:'Tratamiento de encías (Periodoncia)',description:'Prevención y tratamiento de inflamaciones y sangrado.',price:35990,image:'images/gengiva.webp'}
];
const money = n => n.toLocaleString('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});
let cart = [];
let selectedSlot = '';
const serviceList = document.querySelector('#serviceList');
const serviceSelect = document.querySelector('#serviceSelect');
serviceList.innerHTML = services.map(s => `<article class="service-card"><div class="service-icon"><img src="${s.image}" alt="${s.name}"></div><div class="service-content"><h3>${s.name}</h3><p>${s.description}</p><div class="service-footer"><span class="price">${s.price ? 'Desde '+money(s.price) : 'Sujeto a evaluación'}</span><button class="add-btn" data-add="${s.id}">🛒 Añadir</button></div></div></article>`).join('');
serviceSelect.innerHTML = services.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
serviceList.addEventListener('click',e=>{const id=Number(e.target.dataset.add);if(id) addToCart(id)});
function addToCart(id){if(!cart.includes(id))cart.push(id);renderCart();document.querySelector('#cartCount').textContent=cart.length}
function renderCart(){
 const box=document.querySelector('#cartItems');
 box.innerHTML=cart.length?cart.map(id=>{const s=services.find(x=>x.id===id);return `<div class="cart-row"><span>${s.name}<br><small>${s.price?money(s.price):'Sujeto a evaluación'}</small></span><button data-remove="${id}">Eliminar</button></div>`}).join(''):'<p>Tu carrito está vacío.</p>';
 const total=cart.reduce((sum,id)=>sum+(services.find(s=>s.id===id).price||0),0);
 document.querySelector('#cartTotal').textContent=money(total)+(cart.some(id=>!services.find(s=>s.id===id).price)?' + artículos sujetos a evaluación':'');
}
document.querySelector('#cartItems').addEventListener('click',e=>{const id=Number(e.target.dataset.remove);if(id){cart=cart.filter(x=>x!==id);renderCart();document.querySelector('#cartCount').textContent=cart.length}});
const dialog=document.querySelector('#cartDialog');
document.querySelector('#openCart').onclick=()=>{renderCart();dialog.showModal()};
document.querySelector('#closeCart').onclick=()=>dialog.close();
document.querySelector('#cartWhatsApp').onclick=()=>{const lines=cart.map(id=>services.find(s=>s.id===id).name).join(', ');if(!lines){alert('Añade primero un procedimiento al carrito.');return}window.open('https://wa.me/5500000000000?text='+encodeURIComponent('Hola. Me gustaría recibir información sobre: '+lines),'_blank')};
const dateInput=document.querySelector('#dateSelect');
const today=new Date();dateInput.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);dateInput.value=dateInput.min;
function renderSlots(){const day=new Date(dateInput.value+'T12:00:00').getDay();const times=['08:00','09:00','10:00','11:00','14:00','15:00','16:00'];document.querySelector('#slots').innerHTML=times.map((t,i)=>`<button class="slot ${selectedSlot===t?'selected':''}" ${day===0||day===6||i===2?'disabled':''} data-slot="${t}">${t}</button>`).join('');}
dateInput.addEventListener('change',()=>{selectedSlot='';renderSlots()});
document.querySelector('#slots').addEventListener('click',e=>{if(e.target.dataset.slot){selectedSlot=e.target.dataset.slot;renderSlots()}});
renderSlots();
document.querySelector('#bookButton').onclick=()=>{const name=document.querySelector('#patientName').value.trim();const phone=document.querySelector('#patientPhone').value.trim();if(!name||!phone||!dateInput.value||!selectedSlot){alert('Completa tu nombre, teléfono, fecha y horario.');return}const service=services.find(s=>s.id===Number(serviceSelect.value));const msg=`Hola. Me gustaría solicitar una cita.\nNombre: ${name}\nTeléfono: ${phone}\nProcedimiento: ${service.name}\nFecha: ${dateInput.value}\nHorario: ${selectedSlot}\nPor favor, confirmen la disponibilidad.`;window.open('https://wa.me/5500000000000?text='+encodeURIComponent(msg),'_blank')};
document.querySelector('#menuToggle').onclick=()=>document.querySelector('#mainNav').classList.toggle('open');
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('#mainNav').classList.remove('open')));
