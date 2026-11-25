// Content + HTML builders for the Positive AI site (ported from the design file).
const IMG={akhilesh:"/team/akhilesh.jpg",sandra:"/team/sandra.jpg",janesh:"/team/janesh.jpg",john:"/team/john.jpg",rajkamal:"/team/rajkamal.jpg",rahul:"/team/rahul.jpg",rcsrivastava:"/team/rcsrivastava.jpg"};
const LINKS={anxiety:"https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/",depression:"https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/",mitra:"https://mitra.timbleglance.com/login?next=/",care:"https://positivemindcare.com/portal/experts"};

const PRODUCTS=[
 {id:"minds-ai",name:"MINDS.AI",cls:"p-minds",color:"#1f8a9e",dark:"#0e4e63",icon:"i-scan",role:"AI wellbeing screening",
  short:"A quick, private check of your mental wellbeing — with clear next steps.",
  title:"Know how you're really doing, in five quiet minutes",
  lead:"MINDS.AI is a gentle, AI-guided wellbeing check. It helps you notice early signs of anxiety, stress and low mood — privately, and without judgement — and shows you what to do next.",
  feats:[["Anxiety and depression screening","Short, structured check-ins that turn how you feel into something you can understand and act on."],["Mood tracking over time","See patterns across days and weeks, so small changes don't go unnoticed."],["Personalised next steps","Self-care practices, MITRA.AI conversations, or a counsellor — matched to your results."],["Private and stigma-free","No names needed to start. Your answers stay yours."]],
  who:"For anyone who has wondered “is this just stress?” — and for employers and schools offering confidential screening at scale.",
  cta:["Take anxiety screening",LINKS.anxiety],cta2:["Take depression screening",LINKS.depression]},
 {id:"mitra-ai",name:"MITRA.AI",cls:"p-mitra",color:"#ff875a",dark:"#c2482a",icon:"i-chat",role:"Your AI companion",
  short:"A warm, always-there companion to talk to, reflect with and grow alongside.",
  title:"A friend who listens, any hour of the day",
  lead:"Mitra means friend. MITRA.AI is an empathetic AI companion for the moments when you need to talk, think something through or simply feel heard — and it helps you build calmer, stronger habits over time.",
  feats:[["Conversations that care","Talk freely about your day, worries or wins — without fear of judgement."],["Guided exercises","Breathing, grounding, journaling and reframing exercises, offered when they help."],["Designed for India","Built with Indian languages, families and everyday pressures in mind."],["Knows its limits","If a conversation shows signs of crisis, MITRA.AI points you to human help immediately."]],
  who:"For students under pressure, professionals on the edge of burnout, and anyone who feels alone with their thoughts.",
  chat:[["u","I've had a really heavy week and can't switch off at night."],["a","That sounds exhausting. Want to tell me what's been weighing on you most? We can also try a two-minute wind-down together."]],
  cta:["Talk to MITRA.AI",LINKS.mitra]},
 {id:"dr-positive",name:"Dr Positive",cls:"p-dr",color:"#2a8fd6",dark:"#124e8c",icon:"i-dr",role:"AI health guide",
  short:"Clear, trustworthy answers to your health questions — and the right next step.",
  title:"Trustworthy health guidance, in plain language",
  lead:"Dr Positive is an AI health guide that answers questions about mental and physical wellbeing, helps you make sense of what you're experiencing and prepares you for a conversation with a real doctor.",
  feats:[["Ask anything, simply","Sleep, stress, medication questions, lifestyle — answered clearly and calmly."],["Mind and body together","Holistic guidance that connects physical and mental health, as good physicians do."],["Ready for your appointment","Summaries of your concerns and questions to take to your clinician."],["A bridge to experts","When it matters, Dr Positive routes you to Positive Mind Care professionals."]],
  who:"For individuals and families looking for reliable first answers, and for clinics that want better-prepared patients.",
  cta:["Chat with Dr Positive",null],openChat:true},
 {id:"mind-care",name:"Positive Mind Care",cls:"p-care",color:"#35a383",dark:"#145a4b",icon:"i-care",role:"Care portal & app",
  short:"Book certified psychologists and psychiatrists by chat, voice or video.",
  title:"Real experts, whenever you're ready",
  lead:"The Positive Mind Care portal and app connect you with certified psychologists, psychiatrists and counsellors for personalised sessions — and give organisations one place to run their wellbeing programmes.",
  feats:[["Therapy your way","Sessions by chat, voice or video with certified mental health professionals."],["Personal care plans","Plans that bring together your sessions, progress and AI-guided self-care."],["Programmes for institutions","Workplace wellness and student support, with tools for HR and campus teams."],["Learning resources","Educational content and workshops for schools, universities and families."]],
  who:"For anyone ready to speak with a professional, and for employers, schools and hospitals building care programmes.",
  cta:["Book a counsellor",LINKS.care]}
];

const AUD=[
 ["i-person","Individuals","People facing anxiety, stress or low mood who want support that is accessible, proactive and personal."],
 ["i-work","Workplaces","Employers improving wellbeing and productivity and reducing burnout with AI-powered wellness programmes."],
 ["i-hosp","Healthcare providers","Hospitals and clinicians looking for scalable early detection and personalised care tools."],
 ["i-edu","Education","Schools, colleges and universities supporting students through academic and social pressure."]
];
const SOL=[
 ["i-scan","MINDS.AI","Spot early signs before they become a crisis","Many people live with anxiety or low mood for years before anyone notices. MINDS.AI gives individuals, employers and institutions a private, structured way to check in early.",["Structured anxiety and depression screening","Results explained in plain language","Mood tracking to see change over time","Clear next steps matched to each result"],"#minds-ai"],
 ["i-chat","MITRA.AI","Someone to talk to, at any hour","Support should not have to wait for an appointment. MITRA.AI is there in the moments between sessions — late at night, before an exam, after a hard day.",["Empathetic conversations, anytime, anywhere","Guided breathing, grounding and journaling","Built for India's languages and everyday pressures","Hands over to human help when it matters"],"#mitra-ai"],
 ["i-dr","Dr Positive","Clear answers instead of search-engine guesswork","Searching for symptoms online often leaves people more anxious. Dr Positive offers calm, plain-language guidance and helps people prepare for the right conversation with a doctor.",["Plain-language answers on mental and physical health","Guidance on sleep, stress and lifestyle","Summaries to take to your clinician","Referral to Positive Mind Care experts"],"#dr-positive"],
 ["i-care","Positive Mind Care","Certified professionals, when you are ready","Some situations need a person. The Positive Mind Care portal and app connect people with psychologists, psychiatrists and counsellors, and give organisations one place to run wellbeing programmes.",["Psychologists, psychiatrists and counsellors","Chat, voice or video sessions","Personalised care plans","Programmes for workplaces, schools and hospitals"],"#mind-care"]
];
const PRIN=[
 ["i-hand","Humans stay in the loop","Clinicians shape our agents' behaviour, review their responses and define when a person must be handed to a human professional."],
 ["i-alert","Safety comes first","Our agents watch for signs of crisis and immediately connect people with the Positive AI Team and emergency help."],
 ["i-shield","Wellness, not diagnosis","We are clear about what AI can and can't do. Our tools support wellbeing and guide people to care; they never claim to diagnose."],
 ["i-lock","Privacy by design","We collect only what we need, protect it carefully, give people control over their data and never sell it. We build to respect India's Digital Personal Data Protection Act."],
 ["i-eye","Transparent and fair","People always know they are talking to an AI. We test for bias across languages, genders, ages and regions."],
 ["i-globe","Care for everyone","Affordable, multilingual and light enough for low-bandwidth phones — because the people who need help most are often the hardest to reach."]
];
const LEADERS=[
 {img:"akhilesh",name:"Akhilesh Srivastava",r:"Co-founder",bio:"A global technology leader and IIT gold medallist who studied at IITs, Wharton and ISB. Former CGM at NHAI, COO of IHMCL and CEO of NHAI InvIT, he is known for the nationwide implementation of FASTag in India. He is President of the IRF India Chapter and the ITS India Forum, Chairman of the Bitumen Forum of India, leads WEF Road Safety 2.0 in India, and serves as IT Advisor to the Government of Uttarakhand and Senior Advisor at McKinsey.",books:["Digital Construction Management","AI in Infrastructure Development","Construction Industry 2.0","A Dream of Billions — Road Safety 2.0"]},
 {img:"sandra",name:"Sandra Srivastava",r:"Co-founder",bio:"A psychology expert and founder of Positive Mind Care, a mental health technology company, and the Proactive Citizen Foundation. President of the Gurgaon Champions Toastmasters Club and an Area Director, she has been honoured as the youngest entrepreneur, is a Visharad in music and an accomplished public speaker."},
 {img:"janesh",name:"Janesh Mishra",r:"Technology and strategy",bio:"More than ten years of experience in large-scale product engineering and real-time applications, with strengths in project management, business development and strategic planning. Known for leading diverse teams and driving growth through innovation."}
];
const ADV=[
 {img:"john",name:"Dr. John Thomas",r:"Advisor",bio:"Dean of the Zapara School of Business, USA, and advisor to Positive Mind Care. A leader in education and business management with decades of experience fostering innovation, strategic growth and ethical leadership."},
 {img:"rajkamal",name:"Mr. Raj Kamal",r:"Technology partner",bio:"Founder and CEO of Prodios Lab, building innovative technology and healthcare solutions, with extensive experience in business leadership and strategic growth."}
];
const CLIN=[
 {img:"rahul",name:"Dr. Rahul Yadav",r:"Psychiatrist, Positive Mind Care",bio:"Expert in diagnosing and treating a wide range of mental health conditions, with a compassionate, patient-first approach."},
 {img:"rcsrivastava",name:"Dr. R.C. Srivastava",r:"General physician and mentor",bio:"Mentor at the Positive Mind Care and Research Centre, bringing decades of holistic medical care to both physical and mental health."}
];


export const PAGE_IDS=['home','about','products','minds-ai','mitra-ai','dr-positive','mind-care','solutions','responsible-ai','team','contact'];
export const PRODUCT_IDS=PRODUCTS.map(p=>p.id);
export const PRODUCT_NAMES=Object.fromEntries(PRODUCTS.map(p=>[p.id,p.name]));
export const TITLES={home:'Positive AI Innovations',about:'About · Positive AI',products:'AI agents · Positive AI',solutions:'Solutions · Positive AI','responsible-ai':'Responsible AI · Positive AI',team:'Team · Positive AI',contact:'Contact · Positive AI'};

export function buildSections(){
const out={};
const arrow='<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const prodCard=p=>`<a class="prod ${p.cls}" href="#${p.id}"><svg class="icon"><use href="#${p.icon}"/></svg><h3>${p.name}</h3><span class="role">${p.role}</span><p>${p.short}</p><span class="go">Explore ${p.name} ${arrow}</span></a>`;
out["prodGrid"]=PRODUCTS.map(prodCard).join('');
out["prodList"]=PRODUCTS.map(p=>`<a class="prod ${p.cls}" href="#${p.id}" style="min-height:330px"><svg class="icon"><use href="#${p.icon}"/></svg><h3>${p.name}</h3><span class="role">${p.role}</span><p>${p.lead}</p><span class="go">Learn more ${arrow}</span></a>`).join('');
out["audGrid"]=AUD.map(a=>`<div class="aud"><div class="ic"><svg><use href="#${a[0]}"/></svg></div><h3>${a[1]}</h3><p class="mute">${a[2]}</p></div>`).join('');
out["solGrid"]=SOL.map(s=>`<div class="card aud"><div class="ic"><svg><use href="#${s[0]}"/></svg></div><span class="kicker" style="margin:0">${s[1]}</span><h3 style="font-size:24px">${s[2]}</h3><p class="mute">${s[3]}</p><ul class="tick">${s[4].map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn sec" href="${s[5]}" style="margin-top:18px;align-self:flex-start">Explore ${s[1]}</a></div>`).join('');
out["prList"]=PRIN.map(p=>`<div class="pr"><svg><use href="#${p[0]}"/></svg><div><h3>${p[1]}</h3><p class="mute">${p[2]}</p></div></div>`).join('');

const person=(m,big)=>`<div class="card person${big?' lead-card':''}"><img src="${IMG[m.img]}" alt="${m.name}"><div><h3>${m.name}</h3><span class="r">${m.r}</span><p>${m.bio}</p>${m.books?`<div class="books">${m.books.map(b=>`<span>${b}</span>`).join('')}</div>`:''}</div></div>`;
out["leaders"]=LEADERS.map(m=>person(m,true)).join('');
out["advisors"]=ADV.map(m=>person(m)).join('');
out["clinical"]=CLIN.map(m=>person(m)).join('');
out["teamPreview"]=[LEADERS[0],LEADERS[1]].map(m=>`<div class="person"><img src="${IMG[m.img]}" alt="${m.name}"><h3>${m.name}</h3><span class="r">${m.r}</span><p>${m.bio.split('. ')[0].replace(/\.$/,'')}.</p></div>`).join('');

for(const p of PRODUCTS){
 const others=PRODUCTS.filter(o=>o!==p);
 out['pg-'+p.id]=`
 <section class="phero" style="background:radial-gradient(800px 400px at 80% 30%,#ffffff22,transparent 60%),linear-gradient(150deg,${p.color},${p.dark})">
  <div class="wrap"><div><a href="#products" style="text-decoration:none;opacity:.85;font-size:15px">← All AI agents</a>
   <h1 style="margin-top:18px">${p.name}</h1><p style="font-family:var(--h);font-size:clamp(22px,2.4vw,30px);line-height:1.2;margin:0 0 16px">${p.title}</p><p class="lead">${p.lead}</p>
   <div class="row" style="margin-top:24px">${p.openChat?`<button type="button" class="btn" data-open-chat style="background:#fff;color:${p.dark}">${p.cta[0]} ${arrow}</button>`:`<a class="btn" style="background:#fff;color:${p.dark}" href="${p.cta[1]}" target="_blank" rel="noopener noreferrer">${p.cta[0]} ${arrow}</a>`}${p.cta2?`<a class="btn sec" href="${p.cta2[1]}" target="_blank" rel="noopener noreferrer">${p.cta2[0]}</a>`:''}</div></div>
   ${p.chat?`<div class="chat" aria-label="Example conversation">${p.chat.map(c=>`<div class="${c[0]}">${c[1]}</div>`).join('')}<small style="opacity:.75">Illustrative example</small></div>`:`<svg class="big" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="96" fill="#ffffff14"/><circle cx="100" cy="100" r="70" fill="#ffffff1f"/><circle cx="100" cy="100" r="70" fill="none" stroke="#fff" stroke-opacity=".5" stroke-dasharray="3 9"/><use href="#${p.icon}" x="55" y="55" width="90" height="90" color="#fff"/></svg>`}
  </div>
 </section>
 <section class="band"><div class="wrap"><span class="kicker" style="color:${p.color}">What it does</span><h2>Designed around the person, not the condition</h2>
  <div class="grid g4 feat" style="margin-top:30px">${p.feats.map(f=>`<div class="card" style="border-top:5px solid ${p.color};border-radius:16px"><h3>${f[0]}</h3><p class="mute">${f[1]}</p></div>`).join('')}</div>
  <div class="split" style="margin-top:44px;align-items:start"><div><h3 style="font-size:24px">Who it's for</h3><p class="lead">${p.who}</p></div><div class="note">${p.name} is a general wellness tool and does not provide medical diagnoses. In a crisis, call the Positive AI Team on <a href="tel:+919440993344"><b>+91 94409 93344</b></a>.</div></div>
 </div></section>
 <section class="band soft"><div class="wrap"><span class="kicker">Part of the circle of care</span><h2>Works even better with</h2><div class="grid g3" style="margin-top:28px">${others.map(o=>prodCard(o).replace('class="prod','style="min-height:280px" class="prod')).join('')}</div></div></section>`;
}


return out;
}

// Fill the empty containers of the static markup with the generated sections.
export function buildHtml(staticHtml){
 const sections=buildSections();
 let html=staticHtml;
 for(const [id,inner] of Object.entries(sections)){
  // find the empty container: <tag ... id="ID" ...></tag>
  const at=html.indexOf('id="'+id+'"');
  if(at<0) throw new Error('Missing container #'+id);
  const start=html.lastIndexOf('<',at);
  const openEnd=html.indexOf('>',at)+1;
  const tag=html.slice(start+1).match(/^[a-z0-9]+/i)[0];
  if(html.slice(openEnd,openEnd+tag.length+3)!=='</'+tag+'>') throw new Error('Container #'+id+' is not empty');
  html=html.slice(0,openEnd)+inner+html.slice(openEnd);
 }
 return html;
}
