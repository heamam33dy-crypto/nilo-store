const products = [
  {id:1,category:'tops',name:{ar:'تيشيرت بولو كحلي',en:'Navy Polo T-Shirt'},price:780,image:'./216282324_hvy_in.webp',badge:{ar:'الأكثر طلبًا',en:'Best seller'}},
  {id:2,category:'bottoms',name:{ar:'بنطلون واسع مريح',en:'Relaxed Wide-Leg Trousers'},price:920,image:'https://images.unsplash.com/photo-1506629905607-d9b1c9a0f4e3?auto=format&fit=crop&w=700&q=80',badge:{ar:'جديد',en:'New'}},
  {id:3,category:'outerwear',name:{ar:'جاكيت خفيف',en:'The Easy Jacket'},price:1350,image:'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=700&q=80',badge:{ar:'جديد',en:'New'}},
  {id:4,category:'sets',name:{ar:'طقم يومي ناعم',en:'Soft Everyday Set'},price:1190,image:'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=700&q=80'},
  {id:5,category:'tops',name:{ar:'تيشيرت قطن أساسي',en:'Essential Cotton Tee'},price:490,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80'},
  {id:6,category:'bottoms',name:{ar:'جينز قصة مستقيمة',en:'Straight-Leg Denim'},price:1050,image:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80'},
  {id:7,category:'outerwear',name:{ar:'قميص جاكيت قطني',en:'Cotton Overshirt'},price:990,image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80'},
  {id:8,category:'sets',name:{ar:'طقم مريح قطعتين',en:'Two-Piece Lounge Set'},price:1290,image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80'}
];

const categoryNames={tops:{ar:'توبات',en:'Tops'},bottoms:{ar:'بناطيل',en:'Bottoms'},outerwear:{ar:'جاكيتات',en:'Outerwear'},sets:{ar:'أطقم',en:'Sets'}};
let language='ar';
let activeCategory='all';
let cart=[];
try { cart=JSON.parse(localStorage.getItem('nilo-cart')||'[]'); if(!Array.isArray(cart)) cart=[]; } catch { cart=[]; }
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function money(amount){return new Intl.NumberFormat(language==='ar'?'ar-EG':'en-EG',{style:'currency',currency:'EGP',maximumFractionDigits:0}).format(amount)}
function renderProducts(){
  const grid=$('#productGrid');
  if(!grid)return;
  const term=($('#searchInput')?.value||'').trim().toLocaleLowerCase();
  const found=products.filter(p=>(activeCategory==='all'||p.category===activeCategory)&&(!term||p.name.ar.toLocaleLowerCase().includes(term)||p.name.en.toLocaleLowerCase().includes(term)));
  grid.innerHTML=found.map(p=>`<article class="product-card"><div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name[language]}" loading="lazy" onerror="this.style.visibility='hidden'"><span class="product-badge" ${p.badge?'':'hidden'}>${p.badge?p.badge[language]:''}</span><button class="quick-add" type="button" data-add="${p.id}">${language==='ar'?'أضيفي إلى الحقيبة':'Add to bag'} <span aria-hidden="true">＋</span></button></div><div class="product-info"><div><h3 class="product-name">${p.name[language]}</h3><p class="product-category">${categoryNames[p.category][language]}</p></div><span class="product-price">${money(p.price)}</span></div></article>`).join('');
  const empty=$('#emptyProducts');
  if(empty)empty.classList.toggle('hidden',found.length>0);
}
function saveCart(){localStorage.setItem('nilo-cart',JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.quantity++;else cart.push({id,quantity:1});saveCart();showToast(language==='ar'?'أضيف المنتج إلى حقيبتك':'Added to your bag')}
function renderCart(){
  const count=cart.reduce((sum,x)=>sum+x.quantity,0);
  const badge=$('#cartCount');if(badge){badge.textContent=count;badge.classList.toggle('hidden',count===0)}
  const items=cart.map(item=>{const p=products.find(x=>x.id===item.id);if(!p)return '';return `<article class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name[language]}</h3><p>${money(p.price)}</p><div class="quantity-controls"><button type="button" data-quantity="${p.id}" data-delta="-1" aria-label="Decrease">−</button><span>${item.quantity}</span><button type="button" data-quantity="${p.id}" data-delta="1" aria-label="Increase">＋</button></div></div><button type="button" data-remove="${p.id}" class="remove-item">${language==='ar'?'حذف':'Remove'}</button></article>`}).join('');
  const container=$('#cartItems');if(container)container.innerHTML=items;
  const total=cart.reduce((sum,item)=>sum+(products.find(p=>p.id===item.id)?.price||0)*item.quantity,0);
  ['#cartSubtotal','#checkoutTotal'].forEach(sel=>{const el=$(sel);if(el)el.textContent=money(total)});
  const empty=$('#cartEmpty');if(empty)empty.classList.toggle('hidden',count>0);
  const footer=$('#cartFooter');if(footer)footer.classList.toggle('hidden',count===0);
}
function setOverlay(id,open){const el=document.getElementById(id);if(!el)return;el.classList.toggle('open',open);el.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('modal-open',!!document.querySelector('.overlay.open'))}
let toastTimer;
function showToast(message){const toast=$('#toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300)}
function updateLanguage(){document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';$$('[data-ar][data-en]').forEach(el=>{el.textContent=el.dataset[language]});$$('[data-ar-placeholder]').forEach(el=>{el.placeholder=el.dataset[`${language}Placeholder`]||el.dataset.arPlaceholder});const button=$('#languageButton');if(button)button.textContent=language==='ar'?'EN':'عربي';renderProducts();renderCart()}
$('#productGrid')?.addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(button)addToCart(Number(button.dataset.add))});
$('#filters')?.addEventListener('click',e=>{const button=e.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;$$('.filter-chip').forEach(x=>x.classList.toggle('active',x===button));renderProducts()});
$('#searchInput')?.addEventListener('input',renderProducts);
$('#languageButton')?.addEventListener('click',()=>{language=language==='ar'?'en':'ar';updateLanguage()});
$('#openCart')?.addEventListener('click',()=>setOverlay('cartOverlay',true));
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>setOverlay(button.dataset.close,false)));
$$('.overlay').forEach(overlay=>overlay.addEventListener('click',e=>{if(e.target===overlay)setOverlay(overlay.id,false)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape') $$('.overlay.open').forEach(el=>setOverlay(el.id,false))});
$('#cartItems')?.addEventListener('click',e=>{const q=e.target.closest('[data-quantity]');const r=e.target.closest('[data-remove]');if(q){const item=cart.find(x=>x.id===Number(q.dataset.quantity));if(item){item.quantity+=Number(q.dataset.delta);if(item.quantity<1)cart=cart.filter(x=>x!==item);saveCart()}}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart()}});
$('#startCheckout')?.addEventListener('click',()=>{setOverlay('cartOverlay',false);setOverlay('checkoutOverlay',true)});
$('#checkoutForm')?.addEventListener('submit',e=>{e.preventDefault();if(!cart.length)return;const data=Object.fromEntries(new FormData(e.target).entries());const orders=JSON.parse(localStorage.getItem('nilo-orders')||'[]');orders.push({...data,items:cart.map(item=>({name:products.find(p=>p.id===item.id)?.name.ar,quantity:item.quantity})),total:cart.reduce((sum,item)=>sum+(products.find(p=>p.id===item.id)?.price||0)*item.quantity,0),createdAt:new Date().toISOString()});localStorage.setItem('nilo-orders',JSON.stringify(orders));cart=[];saveCart();e.target.reset();setOverlay('checkoutOverlay',false);showToast(language==='ar'?'تم تسجيل طلبك بنجاح':'Order placed successfully')});
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
renderProducts();renderCart();
