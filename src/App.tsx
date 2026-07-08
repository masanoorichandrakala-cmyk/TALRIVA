import { useState, useEffect, useRef } from "react";

const CAL = "https://cal.com/chandrakala.m/discovery-call";
const LINKEDIN = "https://www.linkedin.com/company/workriva";
const T = {
  bg:"#0F0A04", surface:"#1A1208", surface2:"#231a0c",
  border:"rgba(255,107,53,0.15)", orange:"#FF6B35", gold:"#FFD166",
  white:"#FAFAF8", muted:"rgba(250,250,248,0.45)", dim:"rgba(250,250,248,0.12)",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#0F0A04;font-family:'Inter',system-ui,sans-serif;color:#FAFAF8}
@keyframes orb-a{0%,100%{transform:translate(0,0) scale(1);opacity:.22}50%{transform:translate(24px,-16px) scale(1.1);opacity:.34}}
@keyframes orb-b{0%,100%{transform:translate(0,0) scale(1);opacity:.16}50%{transform:translate(-18px,12px) scale(1.08);opacity:.26}}
@keyframes orb-c{0%,100%{transform:translate(0,0) scale(1);opacity:.12}60%{transform:translate(12px,20px) scale(1.15);opacity:.2}}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes scan{0%{top:0%;opacity:0}10%{opacity:.6}90%{opacity:.6}100%{top:100%;opacity:0}}
@keyframes ring{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pulse-border{0%,100%{border-color:rgba(255,107,53,.25)}50%{border-color:rgba(255,209,102,.55)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes dot-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
@keyframes stat-glow{0%,100%{color:#FF6B35}50%{color:#FFD166}}
@keyframes orb-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,107,53,.4)}50%{box-shadow:0 0 0 16px rgba(255,107,53,0)}}
@keyframes wave-bar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
@keyframes dot-blink{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes ring-pulse{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.08);opacity:1}}
@keyframes fab-pop{from{opacity:0;transform:scale(.8) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.fade-up{animation:fadeUp .7s ease both}
.fade-up-1{animation:fadeUp .7s ease .1s both}
.fade-up-2{animation:fadeUp .7s ease .2s both}
.fade-up-3{animation:fadeUp .7s ease .3s both}
.btn-p:hover{background:#e85a25!important;transform:translateY(-1px);transition:all .2s}
.btn-s:hover{background:rgba(255,209,102,.1)!important;transform:translateY(-1px);transition:all .2s}
.tier-card:hover{border-color:rgba(255,107,53,.5)!important;transform:translateY(-4px);transition:all .25s}
@media(max-width:768px){
  .offer-grid{grid-template-columns:1fr!important}
  .founder-card{flex-direction:column!important}
  .stats-row{flex-wrap:wrap!important}
  .impl-grid{grid-template-columns:1fr 1fr!important}
  .guarantee-grid{grid-template-columns:1fr!important}
  .prob-grid{grid-template-columns:1fr 1fr!important}
  .nav-links{display:none!important}
}
`;

function useInView(t=.15){
  const ref=useRef(null);const[v,setV]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[t]);
  return[ref,v];
}
function Counter({from,to,suffix=""}){
  const[val,setVal]=useState(from);const[ref,v]=useInView();
  useEffect(()=>{if(!v)return;let s=null;const dur=1400;const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);const e=1-Math.pow(1-p,3);setVal(Math.round(from+(to-from)*e));if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);},[v,from,to]);
  return<span ref={ref}>{val}{suffix}</span>;
}
const orb=(color,w,h,top,left,right,bottom,anim)=>({position:"absolute",width:w,height:h,borderRadius:"50%",background:color,filter:"blur(80px)",pointerEvents:"none",opacity:.2,top,left,right,bottom,animation:anim});
const grid={position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(255,107,53,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,53,.04) 1px,transparent 1px)`,backgroundSize:"48px 48px"};
const BP={display:"inline-flex",alignItems:"center",gap:8,background:"#FF6B35",color:"#fff",border:"none",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:500,cursor:"pointer",textDecoration:"none"};
const BS={display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:"#FFD166",border:"0.5px solid #FFD166",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:500,cursor:"pointer",textDecoration:"none"};
const card={background:"#1A1208",border:"0.5px solid rgba(255,107,53,0.15)",borderRadius:16,padding:"2rem"};function Nav(){
  const[sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"1rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(15,10,4,.92)":"transparent",backdropFilter:sc?"blur(12px)":"none",borderBottom:sc?"0.5px solid rgba(255,107,53,0.15)":"none",transition:"all .3s"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,#FF6B35,#FFD166)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="20" height="20" viewBox="0 0 20 20"><polyline points="3,6 7,16 10,10 13,16 17,6" fill="none" stroke="#0F0A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:16,fontWeight:500,letterSpacing:"0.04em"}}>WORKRIVA</span>
      </div>
      <div className="nav-links" style={{display:"flex",gap:"2rem",fontSize:13,color:"rgba(250,250,248,0.45)"}}>
        {["Problem","System","Pricing","Founder"].map(s=>(
          <a key={s} href={`#${s.toLowerCase()}`} style={{color:"rgba(250,250,248,0.45)",textDecoration:"none"}}>{s}</a>
        ))}
      </div>
      <a href={CAL} target="_blank" rel="noreferrer" className="btn-p" style={{...BP,padding:"10px 20px",fontSize:13}}>Book a session</a>
    </nav>
  );
}

function Hero(){
  return(
    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:"7rem",overflow:"hidden"}}>
      <div style={orb("#FF6B35","500px","500px","-120px","-80px",undefined,undefined,"orb-a 8s ease-in-out infinite")}/>
      <div style={orb("#FFD166","380px","380px",undefined,undefined,"-60px","-80px","orb-b 10s ease-in-out infinite")}/>
      <div style={orb("#FF6B35","280px","280px","40%","45%",undefined,undefined,"orb-c 12s ease-in-out infinite")}/>
      <div style={grid}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2,width:"100%"}}>
        <div className="fade-up" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,107,53,.1)",border:"0.5px solid rgba(255,107,53,.3)",borderRadius:20,padding:"6px 14px",fontSize:12,color:"#FFD166",marginBottom:"2rem"}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block",animation:"dot-pulse 2s ease-in-out infinite"}}/>
          Vol. 01 · The Workforce AI Blueprint
        </div>
        <h1 className="fade-up-1" style={{fontSize:"clamp(2.5rem,5.5vw,4.25rem)",fontWeight:500,lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:"1.5rem",maxWidth:820}}>
          HR shouldn't run on<br/>
          <span style={{background:"linear-gradient(90deg,#FF6B35,#FFD166,#FF6B35)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>duct tape and heroics.</span>
        </h1>
        <p className="fade-up-2" style={{fontSize:"1.125rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,maxWidth:580,marginBottom:"2.5rem"}}>
          Workriva designs and installs complete AI infrastructure for HR Tech and workforce teams — not another chatbot, not another tool.
        </p>
        <div className="fade-up-3" style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          <a href={CAL} target="_blank" rel="noreferrer" className="btn-p" style={BP}>Book AI Strategy Session →</a>
          <a href="#system" className="btn-s" style={BS}>See the system</a>
        </div>
        <div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap",marginBottom:"3rem"}}>
          {["SOC2-aligned","Outcome-guaranteed","Least-privilege by default"].map(b=>(
            <span key={b} style={{fontSize:12,color:"rgba(250,250,248,0.45)",display:"flex",alignItems:"center",gap:6}}><span style={{color:"#FF6B35"}}>✓</span>{b}</span>
          ))}
        </div>
        <div style={{background:"#1A1208",border:"0.5px solid rgba(255,107,53,0.15)",borderRadius:16,padding:"1.75rem 2rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"1.5rem",animation:"pulse-border 4s ease-in-out infinite"}}>
          <div style={{fontSize:11,color:"#FFD166",letterSpacing:"0.1em",textTransform:"uppercase",gridColumn:"1/-1"}}>● Live systems dashboard · Operational</div>
          {[["Time-to-hire","42d","14d"],["HR ticket deflection","12%","78%"],["90-day retention","72%","94%"],["Compliance incidents","8/yr","1/yr"]].map(([l,f,t])=>(
            <div key={l}><div style={{fontSize:11,color:"rgba(250,250,248,0.45)",marginBottom:4}}>{l}</div><div style={{fontSize:15,fontWeight:500}}><span style={{color:"rgba(250,250,248,0.45)",textDecoration:"line-through",marginRight:6}}>{f}</span><span style={{color:"#FF6B35"}}>→</span> <span style={{color:"#FFD166"}}>{t}</span></div></div>
          ))}
        </div>
      </div>
    </section>
  );
}function Problem(){
  const[ref,v]=useInView();
  return(
    <section id="problem" style={{position:"relative",padding:"6rem 0",background:"#1A1208",overflow:"hidden"}}>
      <div style={orb("#FF6B35","300px","300px","-80px",undefined,"-60px",undefined,"orb-b 9s ease-in-out infinite")}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2}} ref={ref}>
        <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#FFD166",marginBottom:"1rem",display:"flex",alignItems:"center",gap:8}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block"}}/>Chapter I · The Problem</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:500,color:"#FAFAF8",lineHeight:1.15,marginBottom:"1.25rem"}}>Your HR stack looks fine on paper.<br/>It's bleeding money in practice.</h2>
        <p style={{fontSize:"1.0625rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,maxWidth:560,marginBottom:"3rem"}}>You bought the ATS. You bought the HRIS. You bought the survey tool, the LMS, the "AI recruiter." And still — recruiters live in inboxes, onboarding is a Notion doc no one reads, and every compliance deadline is a fire drill.</p>
        <div className="prob-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2rem"}}>
          {[[42,"%","42-day time-to-hire","Top candidates are hired by competitors before you finish scheduling round two."],[28,"%","28% quit in 90 days","Broken onboarding costs 50–200% of annual salary per replacement."],[67,"%","67% face violations","Startups accumulate $38K in avoidable fines in the first three years."],[0,"","Gut-based decisions","Headcount, pay and promotion calls made without workforce analytics."]].map(([n,s,t,d],i)=>(
            <div key={i} className="tier-card" style={{...card,transition:"all .25s"}}>
              <div style={{fontSize:"2.5rem",fontWeight:500,color:"#FF6B35",marginBottom:".25rem",animation:"stat-glow 3s ease-in-out infinite"}}>
                {v&&Number(n)>0?<Counter from={0} to={Number(n)} suffix={String(s)}/>:<span>{n}{s}</span>}
              </div>
              <div style={{fontSize:12,color:"#FFD166",marginBottom:".75rem",textTransform:"uppercase",letterSpacing:".08em"}}>{String(t)}</div>
              <p style={{fontSize:13,color:"rgba(250,250,248,0.45)",lineHeight:1.6}}>{String(d)}</p>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,107,53,.05)",border:"0.5px solid rgba(255,107,53,.2)",borderRadius:14,padding:"1.5rem 2rem"}}>
          <div style={{fontSize:11,color:"#FFD166",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem"}}>Chapter II · The Cost of Inaction</div>
          <h3 style={{fontSize:20,fontWeight:500,color:"#FAFAF8",marginBottom:"1.25rem"}}>Every quarter you delay, the patchwork tax compounds.</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
            {[["Silent attrition","Disengagement discovered at resignation, not in the pulse survey you never sent."],["Legal exposure","Missed I-9s, misclassifications, and biased reviews sitting in unauditable Google Docs."],["Founder-as-HR","You're the bottleneck on every hire, every offer, every complaint — at 60 hours a week."]].map(([t,d])=>(
              <div key={String(t)} style={{borderLeft:"2px solid rgba(255,107,53,.4)",paddingLeft:"1rem"}}>
                <div style={{fontSize:14,fontWeight:500,color:"#FAFAF8",marginBottom:".4rem"}}>{String(t)}</div>
                <p style={{fontSize:13,color:"rgba(250,250,248,0.45)",lineHeight:1.6}}>{String(d)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function System(){
  const layers=[
    {n:"01",t:"Acquisition",d:"AI screening chatbot, calendar automation, and instant candidate follow-up. Only qualified leads reach your calendar.",tools:["Voiceflow","n8n","Calendly"]},
    {n:"02",t:"Experience",d:"Structured onboarding, pulse sentiment, and a 24/7 HR helpdesk on Slack or Teams — trained on your handbook.",tools:["Voiceflow","Retell","Make.com"]},
    {n:"03",t:"Operations",d:"AI-drafted reviews, automated leave and compliance monitoring, and end-to-end offboarding with knowledge capture.",tools:["GPT","Airtable","n8n"]},
    {n:"04",t:"Growth",d:"Workforce analytics, employer-brand content engine, and a multi-state compliance intelligence agent.",tools:["Lovable","Perplexity","Make.com"]},
  ];
  return(
    <section id="system" style={{position:"relative",padding:"6rem 0",overflow:"hidden"}}>
      <div style={orb("#FFD166","350px","350px","-60px","-80px",undefined,undefined,"orb-a 8s ease-in-out infinite")}/>
      <div style={grid}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#FFD166",marginBottom:"1rem",display:"flex",alignItems:"center",gap:8}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block"}}/>Chapter III · The Solution</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:500,color:"#FAFAF8",lineHeight:1.15,marginBottom:"1.25rem"}}>One integrated HR AI system.<br/>Four operational layers.</h2>
        <p style={{fontSize:"1.0625rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,maxWidth:560,marginBottom:"3rem"}}>Not tools. Infrastructure. Every layer speaks to the next, every workflow is instrumented, every outcome is measured against your baseline.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.25rem",marginBottom:"2rem"}}>
          {layers.map((l,i)=>(
            <div key={i} className="tier-card" style={{...card,borderTop:"2px solid #FF6B35",transition:"all .25s"}}>
              <div style={{fontSize:11,color:"#FF6B35",letterSpacing:".1em",marginBottom:".5rem"}}>{l.n}</div>
              <h3 style={{fontSize:18,fontWeight:500,color:"#FAFAF8",marginBottom:".75rem"}}>{l.t}</h3>
              <p style={{fontSize:13,color:"rgba(250,250,248,0.45)",lineHeight:1.65,marginBottom:"1.25rem"}}>{l.d}</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {l.tools.map(t=><span key={t} style={{fontSize:11,padding:"3px 10px",borderRadius:20,border:"0.5px solid rgba(255,107,53,0.15)",color:"rgba(250,250,248,0.45)"}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}function Offer(){
  const tiers=[
    {sz:"5–25 employees",nm:"HR Foundation System",dl:"3–4 week delivery",feat:false,items:["AI candidate screening & scheduling","Automated onboarding drip","AI HR helpdesk for policy FAQs"],out:"Time-to-hire 42 → 18 days · 40% HR admin recovered"},
    {sz:"15–60 employees",nm:"HR Growth System",dl:"6-week build + 60-day retainer",feat:true,items:["Everything in Foundation","Pulse survey + sentiment alerts","AI performance review drafting","Compliance document monitor","Automated offboarding workflow"],out:"90-day retention +50% · Violations –55% · 2 hrs/day per HR"},
    {sz:"50–150 employees",nm:"HR Intelligence System",dl:"8-week build + 90-day retainer",feat:false,items:["Everything in Growth","Custom workforce analytics SaaS","AI employer-brand content engine","Multi-state compliance agent","Quarterly strategy + optimization"],out:"Scales to 200+ employees with zero HR headcount added"},
  ];
  return(
    <section id="pricing" style={{position:"relative",padding:"6rem 0",background:"#1A1208",overflow:"hidden"}}>
      <div style={orb("#FF6B35","400px","400px",undefined,undefined,"-80px","-100px","orb-b 9s ease-in-out infinite")}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#FFD166",marginBottom:"1rem",display:"flex",alignItems:"center",gap:8}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block"}}/>Chapter IV · The Offer Stack</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:500,color:"#FAFAF8",lineHeight:1.15,marginBottom:"1.25rem"}}>Three engagement tiers.<br/>One outcome contract.</h2>
        <p style={{fontSize:"1.0625rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,maxWidth:560,marginBottom:"3rem"}}>Each tier is a complete, guaranteed system — scoped to your headcount stage. We commit to the KPIs in writing before we build.</p>
        <div className="offer-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem",marginBottom:"3rem"}}>
          {tiers.map((t,i)=>(
            <div key={i} className="tier-card" style={{...card,position:"relative",border:t.feat?"1.5px solid #FF6B35":"0.5px solid rgba(255,107,53,0.15)",transition:"all .25s"}}>
              {t.feat&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"#FF6B35",color:"#fff",fontSize:11,padding:"3px 14px",borderRadius:20,whiteSpace:"nowrap",fontWeight:500}}>Most engaged</div>}
              <div style={{fontSize:11,color:"rgba(250,250,248,0.45)",marginBottom:".5rem"}}>{t.sz}</div>
              <h3 style={{fontSize:17,fontWeight:500,color:"#FAFAF8",marginBottom:".4rem"}}>{t.nm}</h3>
              <div style={{fontSize:12,color:"#FFD166",marginBottom:"1.25rem"}}>{t.dl}</div>
              <ul style={{listStyle:"none",marginBottom:"1.5rem"}}>
                {t.items.map(it=><li key={it} style={{fontSize:13,color:"rgba(250,250,248,0.45)",padding:"5px 0",borderBottom:"0.5px solid rgba(250,250,248,0.12)",display:"flex",gap:8}}><span style={{color:"#FF6B35"}}>→</span>{it}</li>)}
              </ul>
              <div style={{fontSize:12,color:"#FFD166",marginBottom:"1.5rem",lineHeight:1.5}}>{t.out}</div>
              <a href={CAL} target="_blank" rel="noreferrer" className={t.feat?"btn-p":"btn-s"} style={{...(t.feat?BP:BS),width:"100%",justifyContent:"center",fontSize:13}}>Discuss this tier</a>
            </div>
          ))}
        </div>
        <h3 style={{fontSize:18,fontWeight:500,color:"#FAFAF8",marginBottom:"1.5rem"}}>From kickoff to live systems in weeks, not quarters.</h3>
        <div className="impl-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem"}}>
          {[["Week 1–2","Discovery & audit","Map current HR workflows, identify top 3 pain points, gather access."],["Week 3–4","Build & deploy","Configure Voiceflow, n8n and Make.com flows. Sandbox testing with your HR team."],["Week 5–6","Go-live & training","Launch with real employees, walkthrough SOPs, confirm metrics baseline."],["Week 7+","Optimize & expand","Monthly refinements. Retainer clients get priority workflow additions."]].map(([w,t,d],i)=>(
            <div key={i} style={{background:"rgba(255,107,53,.05)",border:"0.5px solid rgba(255,107,53,0.15)",borderRadius:12,padding:"1.25rem"}}>
              <div style={{fontSize:10,color:"#FF6B35",letterSpacing:".1em",textTransform:"uppercase",marginBottom:".4rem"}}>0{i+1}</div>
              <div style={{fontSize:11,color:"#FFD166",marginBottom:".5rem"}}>{w}</div>
              <div style={{fontSize:14,fontWeight:500,color:"#FAFAF8",marginBottom:".5rem"}}>{t}</div>
              <p style={{fontSize:12,color:"rgba(250,250,248,0.45)",lineHeight:1.6}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}function Founder(){
  return(
    <section id="founder" style={{position:"relative",padding:"6rem 0",overflow:"hidden"}}>
      <div style={orb("#FF6B35","400px","400px","-80px","-60px",undefined,undefined,"orb-a 7s ease-in-out infinite")}/>
      <div style={orb("#FFD166","300px","300px",undefined,undefined,"-50px","-60px","orb-b 9s ease-in-out infinite")}/>
      <div style={grid}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#FFD166",marginBottom:"1rem",display:"flex",alignItems:"center",gap:8}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block"}}/>The person behind the system</div>
        <div className="founder-card" style={{display:"flex",gap:"2.5rem",alignItems:"flex-start",background:"#1A1208",border:"0.5px solid rgba(255,107,53,0.15)",borderRadius:20,padding:"2.5rem",animation:"pulse-border 4s ease-in-out infinite"}}>
          <div style={{flexShrink:0,position:"relative"}}>
            <div style={{width:140,height:140,borderRadius:16,padding:2,background:"linear-gradient(135deg,#FF6B35,#FFD166,#FF6B35)",backgroundSize:"200% 200%",animation:"ring 3s linear infinite"}}>
              <div style={{width:"100%",height:"100%",borderRadius:14,overflow:"hidden",background:"#231a0c",position:"relative"}}>
                <img src="/founder.JPG" alt="Chandrakala Masanoori" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
                <div style={{position:"absolute",inset:0,overflow:"hidden",borderRadius:14,pointerEvents:"none"}}>
                  <div style={{position:"absolute",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,209,102,.7),transparent)",animation:"scan 4s ease-in-out infinite"}}/>
                </div>
              </div>
            </div>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:6,marginTop:"0.75rem",fontSize:12,color:"rgba(250,250,248,0.45)",textDecoration:"none"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF6B35"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="#FF6B35"/></svg>
              LinkedIn
            </a>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:22,fontWeight:500,marginBottom:3,background:"linear-gradient(90deg,#fff,#FFD166,#FF6B35,#FFD166)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>Chandrakala Masanoori</div>
            <div style={{fontSize:13,color:"rgba(250,250,248,0.45)",marginBottom:"1rem"}}>Founder, Workriva · HR Tech & Workforce AI</div>
            <p style={{fontSize:14,color:"rgba(250,250,248,0.45)",lineHeight:1.75,marginBottom:"1.25rem"}}>13+ years inside HR — as an academic, a recruiter, and an employee relations lead handling onboarding, compliance, immigration (LCA, I-9, E-Verify), and HRIS operations. I've lived every broken workflow this industry runs on.</p>
            <div style={{borderLeft:"2px solid #FF6B35",paddingLeft:"1rem",marginBottom:"1.5rem",animation:"pulse-border 3s ease-in-out infinite"}}>
              <p style={{fontSize:15,color:"rgba(250,250,248,.88)",fontStyle:"italic",lineHeight:1.65}}>"I watched good HR professionals burn out because their systems failed them — not their skills. I started Workriva so that never has to be the reason someone leaves a job they love."</p>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:"1.5rem"}}>
              {["HR operations","Immigration compliance","HRIS systems","Onboarding architecture","Workforce AI"].map((b,i)=>(
                <span key={b} style={{fontSize:11,padding:"5px 12px",borderRadius:20,border:"0.5px solid rgba(255,107,53,.35)",color:"rgba(250,250,248,0.45)",background:"rgba(255,107,53,.08)",animation:`bob 3s ease-in-out ${i*.3}s infinite`}}>{b}</span>
              ))}
            </div>
            <div style={{borderTop:"0.5px solid rgba(250,250,248,0.12)",paddingTop:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
              <div className="stats-row" style={{display:"flex",gap:"1.75rem"}}>
                {[["13+","Years in HR"],["3","Industries"],["100%","Operator-built"]].map(([n,l])=>(
                  <div key={l}><div style={{fontSize:20,fontWeight:500,animation:"stat-glow 3s ease-in-out infinite"}}>{n}</div><div style={{fontSize:11,color:"rgba(250,250,248,0.45)"}}>{l}</div></div>
                ))}
              </div>
              <a href={CAL} target="_blank" rel="noreferrer" className="btn-p" style={BP}>Book strategy session</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}function Guarantees(){
  return(
    <section id="trust" style={{position:"relative",padding:"6rem 0",background:"#1A1208",overflow:"hidden"}}>
      <div style={orb("#FFD166","300px","300px","-60px","-40px",undefined,undefined,"orb-a 8s ease-in-out infinite")}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem",position:"relative",zIndex:2}}>
        <div style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#FFD166",marginBottom:"1rem",display:"flex",alignItems:"center",gap:8}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B35",display:"inline-block"}}/>Chapter V · The Guarantees</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:500,color:"#FAFAF8",lineHeight:1.15,marginBottom:"1.25rem"}}>Answering the three questions<br/>every operator asks.</h2>
        <p style={{fontSize:"1.0625rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,maxWidth:560,marginBottom:"3rem"}}>We built Workriva for the CTO, the Head of People, and the CFO — because sustainable AI in HR needs all three to say yes.</p>
        <div className="guarantee-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem",marginBottom:"3rem"}}>
          {[["Is our employee data safe?","Every automation runs on least-privilege access, encrypted transport, and audit logs. SOC2-aligned by default, with NDA and DPA on request. We never train third-party models on your data."],["Will this integrate with our existing stack?","Yes — Workday, BambooHR, Rippling, Greenhouse, Ashby, Slack, Teams, Google Workspace, Notion, Airtable. If it has an API or webhook, n8n and Make.com make it a first-class citizen."],["What if the ROI doesn't materialize?","We commit to KPIs in writing before build starts. If agreed metrics aren't hit within the retainer window, we rebuild the workflow at no cost. Your baseline, our accountability."]].map(([q,a])=>(
            <div key={q} style={{...card,borderTop:"2px solid #FFD166"}} className="tier-card">
              <div style={{fontSize:15,fontWeight:500,color:"#FAFAF8",marginBottom:"1rem",lineHeight:1.4}}>{q}</div>
              <p style={{fontSize:13,color:"rgba(250,250,248,0.45)",lineHeight:1.7}}>{a}</p>
            </div>
          ))}
        </div>
        <div style={{background:"#0F0A04",border:"0.5px solid rgba(255,107,53,0.15)",borderRadius:20,padding:"3rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={orb("#FF6B35","300px","200px","-40px","20%",undefined,undefined,"orb-c 8s ease-in-out infinite")}/>
          <div style={{position:"relative",zIndex:2}}>
            <p style={{fontSize:13,color:"rgba(250,250,248,0.45)",marginBottom:"1rem",fontStyle:"italic"}}>Editor's note</p>
            <h3 style={{fontSize:"clamp(1.5rem,3vw,2.25rem)",fontWeight:500,color:"#FAFAF8",marginBottom:"1rem",lineHeight:1.3}}>The next 90 days will either compound your patchwork tax — or install a system that pays you back for years.</h3>
            <p style={{fontSize:"1.0625rem",color:"rgba(250,250,248,0.45)",lineHeight:1.75,marginBottom:"2rem"}}>Book a 30-minute AI Strategy Session. You'll leave with a workforce AI blueprint, a quantified ROI model, and zero obligation.</p>
            <a href={CAL} target="_blank" rel="noreferrer" className="btn-p" style={{...BP,fontSize:16,padding:"16px 36px"}}>Book AI Strategy Session →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RivaWidget(){
  const[open,setOpen]=useState(false);
  const[tab,setTab]=useState("voice");
  const[calling,setCalling]=useState(false);
  const[msgs,setMsgs]=useState([{t:"bot",m:"Hi! I'm Riva, Workriva's AI assistant. How can I help you today?"}]);
  const[input,setInput]=useState("");
  const[typing,setTyping]=useState(false);
  const[transcript,setTranscript]=useState("Riva will greet you and ask how she can help.");
  const[speaking,setSpeaking]=useState(false);
  const fbRef=useRef(0);
  const chatRef=useRef(null);
  const RESP:Record<string,string>={
    "what services?":"Workriva builds complete HR AI infrastructure — candidate screening, onboarding automation, HR helpdesk, compliance monitoring, performance reviews, and workforce analytics.",
    "how much?":"We have three tiers based on your team size. Each comes with a guaranteed outcome contract. Book a strategy session for a custom quote.",
    "book session":`Book a free 30-minute session at cal.com/chandrakala.m/discovery-call`,
    "how long?":"Foundation systems go live in 3–4 weeks. Growth in 6 weeks. Intelligence in 8 weeks.",
  };
  const FB=["Great question! Book a free strategy session?","For specific details, book a 30-minute strategy session — zero obligation.","Book a free session at workriva.com"];
  useEffect(()=>{if(chatRef.current)(chatRef.current as HTMLDivElement).scrollTop=(chatRef.current as HTMLDivElement).scrollHeight;},[msgs,typing]);
  function speak(text:string){
    if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    const vs=window.speechSynthesis.getVoices();
    const fv=vs.find(v=>v.name==="Google UK English Female")||vs.find(v=>v.name==="Microsoft Zira")||vs.find(v=>v.name==="Microsoft Hazel")||vs.find(v=>v.name==="Microsoft Susan")||vs[0];
    window.speechSynthesis.speak(u);
  }
  function toggleCall(){
    if(calling){setCalling(false);setSpeaking(false);if(window.speechSynthesis)window.speechSynthesis.cancel();setTranscript("Call ended.");}
    else{setCalling(true);const g="Hi! I'm Riva, Workriva's AI assistant. How can I help you today?";setTranscript(g);speak(g);}
  }
  function getReply(text:string){
    const k=text.toLowerCase().trim();
    for(const r in RESP){if(k.includes(r.split(" ")[0]))return RESP[r];}
    return FB[fbRef.current++%FB.length];
  }
  function sendMsg(text:string){
    if(!text.trim())return;setInput("");
    setMsgs(m=>[...m,{t:"user",m:text}]);setTyping(true);
    setTimeout(()=>{setTyping(false);setMsgs(m=>[...m,{t:"bot",m:getReply(text)}]);},900);
  }
  return(
    <div style={{position:"fixed",bottom:"2rem",right:"2rem",zIndex:999,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12}}>
      {open&&(
        <div style={{width:360,background:"#1A1208",border:"0.5px solid rgba(255,107,53,.3)",borderRadius:20,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.6)",animation:"fab-pop .3s ease"}}>
          <div style={{background:"#0F0A04",padding:"1rem 1.25rem",display:"flex",alignItems:"center",gap:12,borderBottom:"0.5px solid rgba(255,107,53,.2)"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#FFD166)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F0A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:500,color:"#FAFAF8"}}>Riva · Workriva AI</div>
              <div style={{fontSize:11,color:"rgba(250,250,248,0.45)"}}>{calling?"On a call":speaking?"Speaking…":"Online · Ready to help"}</div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"rgba(250,250,248,0.45)",cursor:"pointer",fontSize:18}}>×</button>
          </div>
          <div style={{display:"flex",borderBottom:"0.5px solid rgba(255,107,53,.15)"}}>
            {[["voice","🎙 Voice"],["chat","💬 Chat"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px",fontSize:13,color:tab===id?"#FF6B35":"rgba(250,250,248,0.45)",background:"none",border:"none",cursor:"pointer",borderBottom:tab===id?"2px solid #FF6B35":"2px solid transparent"}}>{label}</button>
            ))}
          </div>
          {tab==="voice"&&(
            <div style={{padding:"1.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
              <button onClick={toggleCall} style={{width:68,height:68,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#FFD166)",border:"none",cursor:"pointer",fontSize:24,animation:calling?"orb-pulse 1.2s ease-in-out infinite":"none"}}>
                {calling?"📵":"📞"}
              </button>
              <p style={{fontSize:12,color:"rgba(250,250,248,0.45)",textAlign:"center"}}>{calling?speaking?"Riva is speaking…":"Listening…":"Tap to start a voice call"}</p>
              <div style={{background:"rgba(255,255,255,.04)",border:"0.5px solid rgba(255,107,53,.15)",borderRadius:10,padding:"0.875rem",width:"100%",fontSize:12,color:"rgba(250,250,248,.7)",lineHeight:1.6}}>{transcript}</div>
              <div style={{display:"flex",gap:8,width:"100%"}}>
                <button onClick={toggleCall} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,cursor:"pointer",border:"none",background:calling?"rgba(220,50,50,.15)":"#FF6B35",color:calling?"#f87171":"#fff"}}>{calling?"📵 End call":"📞 Start call"}</button>
                <button onClick={()=>setTab("chat")} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,cursor:"pointer",border:"0.5px solid rgba(255,107,53,.3)",background:"transparent",color:"rgba(250,250,248,0.45)"}}>💬 Chat</button>
              </div>
            </div>
          )}
          {tab==="chat"&&(
            <>
              <div ref={chatRef} style={{height:200,overflowY:"auto",padding:"1rem",display:"flex",flexDirection:"column",gap:8}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{maxWidth:"85%",padding:"9px 13px",borderRadius:14,fontSize:13,lineHeight:1.55,background:m.t==="bot"?"rgba(255,255,255,.06)":"#FF6B35",color:m.t==="bot"?"rgba(250,250,248,.85)":"#fff",alignSelf:m.t==="bot"?"flex-start":"flex-end"}}>{m.m}</div>
                ))}
                {typing&&<div style={{display:"flex",gap:4,padding:"12px",background:"rgba(255,255,255,.06)",borderRadius:14,alignSelf:"flex-start"}}>{[0,.2,.4].map((d,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"rgba(250,250,248,0.45)",animation:`dot-blink 1.2s ease-in-out ${d}s infinite`}}/>)}</div>}
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",padding:"0 1rem .75rem"}}>
                {["What services?","How much?","Book session","How long?"].map(q=>(
                  <button key={q} onClick={()=>sendMsg(q)} style={{fontSize:11,padding:"5px 11px",borderRadius:20,border:"0.5px solid rgba(255,107,53,.35)",color:"#FF6B35",background:"rgba(255,107,53,.06)",cursor:"pointer"}}>{q}</button>
                ))}
              </div>
              <div style={{display:"flex",gap:8,padding:".75rem 1rem",borderTop:"0.5px solid rgba(255,107,53,.15)"}}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(input)} placeholder="Ask Riva anything…" style={{flex:1,fontSize:13,padding:"9px 12px",borderRadius:10,border:"0.5px solid rgba(255,107,53,.25)",background:"rgba(255,255,255,.05)",color:"#FAFAF8",outline:"none"}}/>
                <button onClick={()=>sendMsg(input)} style={{width:36,height:36,borderRadius:10,background:"#FF6B35",border:"none",cursor:"pointer",color:"#fff",fontSize:16}}>→</button>
              </div>
            </>
          )}
          <div style={{padding:".625rem",textAlign:"center",fontSize:11,color:"rgba(250,250,248,0.12)",borderTop:"0.5px solid rgba(255,107,53,.1)"}}>Powered by Workriva AI</div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{width:58,height:58,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#FFD166)",border:"none",cursor:"pointer",fontSize:24,boxShadow:"0 8px 24px rgba(255,107,53,.4)"}}>
        {open?"×":"🎙"}
      </button>
    </div>
  );
}

function Footer(){
  return(
    <footer style={{background:"#0F0A04",borderTop:"0.5px solid rgba(255,107,53,0.15)",padding:"2rem",textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:".75rem"}}>
        <div style={{width:28,height:28,borderRadius:6,background:"linear-gradient(135deg,#FF6B35,#FFD166)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="14" height="14" viewBox="0 0 20 20"><polyline points="3,6 7,16 10,10 13,16 17,6" fill="none" stroke="#0F0A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:14,fontWeight:500,letterSpacing:"0.04em"}}>WORKRIVA</span>
      </div>
      <p style={{fontSize:12,color:"rgba(250,250,248,0.45)",marginBottom:".5rem"}}>HR Tech · Workforce AI Infrastructure</p>
      <div style={{display:"flex",gap:"1.5rem",justifyContent:"center",marginBottom:".75rem"}}>
        <a href="mailto:hello@workriva.com" style={{fontSize:12,color:"rgba(250,250,248,0.45)",textDecoration:"none"}}>hello@workriva.com</a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" style={{fontSize:12,color:"rgba(250,250,248,0.45)",textDecoration:"none"}}>LinkedIn</a>
        <a href={CAL} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#FF6B35",textDecoration:"none"}}>Book a session</a>
      </div>
      <p style={{fontSize:11,color:"rgba(250,250,248,0.12)"}}>© 2026 Workriva. Editorial-grade AI systems for people-first companies.</p>
    </footer>
  );
}

export default function App(){
  return(
    <>
      <style>{CSS}</style>
      <Nav/>
      <main>
        <Hero/>
        <Problem/>
        <System/>
        <Offer/>
        <Founder/>
        <Guarantees/>
      </main>
      <Footer/>
      <RivaWidget/>
    </>
  );
}
