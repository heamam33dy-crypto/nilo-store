const WHATSAPP_NUMBER='966568354847';
const agents=[
 {id:'chatgpt',name:'ChatGPT',mark:'GPT',about:'للكتابة، الأفكار، البحث والمساعدة اليومية.',kind:'مساعد عام'},
 {id:'gemini',name:'Gemini',mark:'G',about:'للمهام متعددة الوسائط والبحث والإنتاجية.',kind:'إنتاجية وبحث'},
 {id:'claude',name:'Claude',mark:'C',about:'لتحليل النصوص الطويلة والكتابة المنظمة.',kind:'كتابة وتحليل'},
 {id:'kimi',name:'Kimi',mark:'K',about:'للبحث والتلخيص والتعامل مع مستندات طويلة.',kind:'بحث ومستندات'},
 {id:'github',name:'GitHub Copilot',mark:'GH',about:'لمساعدة المطورين في البرمجة ومراجعة الشيفرة.',kind:'برمجة وتطوير'}
];
const tasks=['اكتب/أنشئ محتوى','تسويق وإدارة الشبكات الاجتماعية','خدمة العملاء والرد على الاستفسارات','برمجة وتطوير مواقع','بحث وتحليل معلومات','تلخيص مستندات وتقارير','تنظيم مهام ومواعيد المكتب','مبيعات ومتابعة العملاء','أخرى / حسب احتياجي'];
const selected=new Set();
const $=s=>document.querySelector(s);
function renderAgents(){ $('#agentsGrid').innerHTML=agents.map(a=>`<label class="agent-card" data-card="${a.id}"><div class="agent-top"><span class="agent-mark">${a.mark}</span><input class="agent-select" type="checkbox" value="${a.id}" aria-label="اختيار ${a.name}"></div><h3>${a.name}</h3><p>${a.about}</p><span class="agent-kind">${a.kind}</span></label>`).join('') }
function renderAssignments(){const box=$('#selectedAgents');if(!selected.size){box.innerHTML='<p class="selection-hint">اختار وكيلًا واحدًا على الأقل من القائمة بالأعلى.</p>';return}box.innerHTML=[...selected].map(id=>{const a=agents.find(x=>x.id===id);return`<div class="assignment-row"><strong>${a.name} — المهمة</strong><label class="visually-hidden" for="task-${a.id}">حدد مهمة ${a.name}</label><select id="task-${a.id}" data-task="${a.id}">${tasks.map(t=>`<option value="${t}">${t}</option>`).join('')}</select></div>`}).join('')}
$('#agentsGrid').addEventListener('change',e=>{if(!e.target.matches('.agent-select'))return;const id=e.target.value;if(e.target.checked)selected.add(id);else selected.delete(id);e.target.closest('.agent-card').classList.toggle('selected',e.target.checked);renderAssignments()});
$('#setupForm').addEventListener('submit',e=>{e.preventDefault();const status=$('#formStatus');if(!selected.size){status.textContent='اختار وكيلًا واحدًا على الأقل.';return}const name=$('#customerName').value.trim(),phone=$('#customerPhone').value.trim(),notes=$('#workNotes').value.trim();const team=[...selected].map(id=>{const agent=agents.find(a=>a.id===id);return`- ${agent.name}: ${$(`[data-task="${id}"]`).value}`}).join('\n');const message=['طلب تجربة AI Office لمدة 7 أيام','',`الاسم: ${name}`,`رقم التواصل: ${phone}`,'الوكلاء والمهام:',team,`تفاصيل إضافية: ${notes||'لا يوجد'}`,'الخطة بعد التجربة: 100 ريال شهريًا'].join('\n');const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;window.open(url,'_blank','noopener,noreferrer');status.textContent='فتحنا واتساب برسالة طلبك. راجعها واضغط إرسال لإكمال الطلب.'});
$('#year').textContent=new Date().getFullYear();renderAgents();renderAssignments();
