import { useState, useEffect } from "react";
import logoImg from "@/imports/trainerx64_logo_nome_melhorada.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Home, Dumbbell, TrendingUp, Bell, User,
  Eye, EyeOff, ArrowLeft, Share2, MoreVertical, Play,
  Clock, Target, Activity, Calendar,
  Lock, Globe, FileText, Shield, LogOut,
  Search, Plus, ChevronRight, CheckCircle,
  Zap, Weight, Ruler, MessageCircle, CreditCard,
  AlertCircle, Info,
  RefreshCw, Check, X, BarChart2,
  Users, ClipboardList, UserPlus, ChevronDown, Mail,
  Star, Settings,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "welcome" | "login" | "register"
  | "dashboard" | "alunos" | "aluno-detail" | "criar-treino"
  | "workouts" | "workout-detail"
  | "evolution" | "notifications" | "profile" | "chat";

type UserType = "personal" | "aluno";

interface AppUser { name: string; email: string; type: UserType; }
interface ExSet { serie: number; kg: number; reps: number; }
interface Exercise { id: string; name: string; sets: ExSet[]; completed: boolean; }
interface Workout {
  id: string; name: string; goal: string; duration: string;
  exerciseCount: number; status: "disponivel" | "andamento" | "concluido"; exercises: Exercise[];
}
interface Student {
  id: string; name: string; status: "em-dia" | "pendente" | "mensalidade" | "sem-atividade";
  workout: string; lastSeen: string; weight: number; height: number; age: number;
  goal: string; level: string;
}
interface Notif {
  id: string; type: "treino" | "financeiro" | "mensagem" | "evolucao";
  title: string; description: string; time: string; read: boolean;
}
interface ChatMsg {
  id: string;
  from: UserType;
  senderName: string;
  content: string;
  time: string;
  read: boolean;
}
// ─── Mock Data ────────────────────────────────────────────────────────────────

const STUDENTS: Student[] = [
  { id:"s1", name:"Gustavo", status:"em-dia",        workout:"Upper",     lastSeen:"Hoje",   weight:82, height:178, age:27, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s2", name:"Serena",  status:"pendente",      workout:"Full Body", lastSeen:"Ontem",  weight:65, height:165, age:24, goal:"Emagrecimento",  level:"Iniciante"     },
  { id:"s3", name:"Gabriel", status:"mensalidade",   workout:"Pull 1",    lastSeen:"3 dias", weight:75, height:172, age:30, goal:"Condicionamento",level:"Avançado"      },
  { id:"s4", name:"Lucas",   status:"sem-atividade", workout:"Leg Day",   lastSeen:"7 dias", weight:90, height:182, age:32, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s5", name:"Carla",   status:"em-dia",        workout:"Push 2",    lastSeen:"Hoje",   weight:58, height:160, age:26, goal:"Saúde",          level:"Iniciante"     },
];

const WORKOUTS: Workout[] = [
  { id:"1", name:"Upper",      goal:"Hipertrofia", duration:"65 min", exerciseCount:6, status:"andamento",
    exercises:[
      { id:"e1", name:"Supino Sentado Máquina",   sets:[{serie:1,kg:80,reps:8},{serie:2,kg:80,reps:9},{serie:3,kg:75,reps:10}],  completed:false },
      { id:"e2", name:"Supino Inclinado Máquina", sets:[{serie:1,kg:60,reps:10},{serie:2,kg:60,reps:10},{serie:3,kg:55,reps:12}], completed:false },
      { id:"e3", name:"Rosca Direta",             sets:[{serie:1,kg:30,reps:12},{serie:2,kg:30,reps:12},{serie:3,kg:25,reps:15}], completed:false },
    ]},
  { id:"2", name:"Push 1",     goal:"Hipertrofia", duration:"55 min", exerciseCount:5, status:"disponivel",
    exercises:[
      { id:"e4", name:"Leg Press",   sets:[{serie:1,kg:140,reps:10},{serie:2,kg:140,reps:10},{serie:3,kg:120,reps:12}], completed:false },
      { id:"e5", name:"Agachamento", sets:[{serie:1,kg:80,reps:8},{serie:2,kg:80,reps:8}], completed:false },
    ]},
  { id:"3", name:"Pull 1",     goal:"Hipertrofia", duration:"60 min", exerciseCount:6, status:"concluido",
    exercises:[
      { id:"e6", name:"Puxada Alta",  sets:[{serie:1,kg:70,reps:10},{serie:2,kg:70,reps:10}], completed:true },
      { id:"e7", name:"Remada Baixa", sets:[{serie:1,kg:65,reps:10},{serie:2,kg:65,reps:10}], completed:true },
    ]},
  { id:"4", name:"Hipertrofia Iniciante", goal:"Hipertrofia", duration:"45 min", exerciseCount:4, status:"disponivel", exercises:[] },
];

const NOTIFS: Notif[] = [
  { id:"n1", type:"treino",     title:"Novo treino publicado", description:"Rafael publicou nova rotina: Push 2.",           time:"Há 10 min",    read:false },
  { id:"n2", type:"treino",     title:"Treino disponível",     description:"Sua rotina Upper está pronta para começar.",     time:"Há 1 hora",    read:false },
  { id:"n3", type:"financeiro", title:"Mensalidade pendente",  description:"Vencimento em 3 dias. Regularize o acesso.",     time:"Há 2 horas",   read:false },
  { id:"n4", type:"evolucao",   title:"Evolução registrada",   description:"Serena registrou evolução. Peso: 65 kg.",        time:"Ontem, 18:30", read:true  },
  { id:"n5", type:"mensagem",   title:"Mensagem do personal",  description:"Rafael: Ótimo treino! Continue assim, Gustavo.", time:"Ontem, 15:00", read:true  },
];
const CHAT_MOCK: ChatMsg[] = [
  {
    id: "m1",
    from: "personal",
    senderName: "Rafael",
    content: "Bom treino hoje, Gustavo. Mantém a carga do supino e foca na execução.",
    time: "09:20",
    read: true,
  },
  {
    id: "m2",
    from: "aluno",
    senderName: "Gustavo",
    content: "Fechado, professor. Senti o ombro um pouco no final, vou controlar melhor.",
    time: "09:23",
    read: true,
  },
  {
    id: "m3",
    from: "personal",
    senderName: "Rafael",
    content: "Boa. Se incomodar, reduz a carga e me avisa pelo app depois do treino.",
    time: "09:25",
    read: false,
  },
];

const WEEK = [{day:"Seg",v:3200},{day:"Ter",v:0},{day:"Qua",v:4100},{day:"Qui",v:3800},{day:"Sex",v:0},{day:"Sáb",v:4500},{day:"Dom",v:0}];
const MONTHS= [{m:"Jan",p:78},{m:"Fev",p:77.2},{m:"Mar",p:76.5},{m:"Abr",p:75.8},{m:"Mai",p:75.1},{m:"Jun",p:74.6}];
const ALL_EX = [
  {name:"Supino Sentado Máquina",  cat:"Peito",  desc:"Isolateral, foco em peitoral médio"},
  {name:"Supino Inclinado Máquina",cat:"Peito",  desc:"Foco no peitoral superior"},
  {name:"Puxada Alta",             cat:"Costas", desc:"Dorsal largo, bíceps"},
  {name:"Remada Baixa",            cat:"Costas", desc:"Trapézio, romboides"},
  {name:"Leg Press",               cat:"Pernas", desc:"Quadríceps, glúteos"},
  {name:"Agachamento",             cat:"Pernas", desc:"Composto, membros inferiores"},
  {name:"Rosca Direta",            cat:"Braços", desc:"Bíceps braquial"},
  {name:"Desenvolvimento Ombro",   cat:"Ombros", desc:"Deltoides anterior e medial"},
  {name:"Extensão Tríceps",        cat:"Braços", desc:"Tríceps braquial"},
  {name:"Elevação Lateral",        cat:"Ombros", desc:"Deltoides medial"},
];

// ─── Theme ────────────────────────────────────────────────────────────────────

const AC = (t: UserType) => t === "personal" ? "#38BDF8" : "#00E676";
const AC_BG = (t: UserType, a = 0.12) => t === "personal" ? `rgba(56,189,248,${a})` : `rgba(0,230,118,${a})`;
const GRAD = (t: UserType) => t === "personal" ? "linear-gradient(90deg,#38BDF8,#818cf8)" : "linear-gradient(90deg,#00E676,#34d399)";

// ─── Logo ─────────────────────────────────────────────────────────────────────

const LOGO_WIDTHS = { icon: 48, sm: 100, md: 130, lg: 160 } as const;

function Logo({
  size = "md",
  ut,
  variant,
}: {
  size?: "icon" | "sm" | "md" | "lg";
  ut?: UserType;
  variant?: "full" | "short";
}) {
  const w = LOGO_WIDTHS[size];
  return (
    <div className="flex items-center justify-center">
      <ImageWithFallback
        src={logoImg}
        alt="TrainerX64"
        style={{ width: w, height: "auto", display: "block" }}
        className="object-contain select-none"
      />
    </div>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function PBtn({ children,onClick,disabled=false,loading=false,ut="personal",className="",type:t="button" }:
  {children:React.ReactNode;onClick?:()=>void;disabled?:boolean;loading?:boolean;ut?:UserType;className?:string;type?:"button"|"submit"}) {
  return (
    <button type={t} onClick={onClick} disabled={disabled||loading}
      className={`w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={{background:disabled||loading?"#2a2a2a":GRAD(ut)}} aria-busy={loading}>
      {loading ? <RefreshCw size={20} className="animate-spin text-white"/> : children}
    </button>
  );
}

function SBtn({ children,onClick,className="" }:{children:React.ReactNode;onClick?:()=>void;className?:string}) {
  return (
    <button onClick={onClick}
      className={`w-full h-14 rounded-2xl font-montserrat font-semibold text-base border border-border text-foreground flex items-center justify-center gap-2 transition-all hover:bg-muted active:scale-95 ${className}`}>
      {children}
    </button>
  );
}

function Fld({ label,value,onChange,placeholder="",type="text",error="",icon }:
  {label:string;value:string;onChange:(v:string)=>void;placeholder?:string;type?:string;error?:string;icon?:React.ReactNode}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-montserrat font-semibold text-muted-foreground">{label}</label>
      <div className={`flex h-14 rounded-2xl bg-card border items-center px-4 gap-3 transition-colors focus-within:border-accent ${error?"border-destructive":"border-border"}`}>
        {icon && <span className="text-muted-foreground flex-shrink-0">{icon}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
          aria-label={label} aria-invalid={!!error}/>
      </div>
      {error && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
    </div>
  );
}

function PwFld({ label,value,onChange,error="",icon }:
  {label:string;value:string;onChange:(v:string)=>void;error?:string;icon?:React.ReactNode}) {
  const [show,setShow]=useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-montserrat font-semibold text-muted-foreground">{label}</label>
      <div className={`flex h-14 rounded-2xl bg-card border items-center px-4 gap-3 transition-colors focus-within:border-accent ${error?"border-destructive":"border-border"}`}>
        {icon && <span className="text-muted-foreground flex-shrink-0">{icon}</span>}
        <input type={show?"text":"password"} value={value} onChange={e=>onChange(e.target.value)} placeholder="••••••••"
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none" aria-label={label}/>
        <button type="button" onClick={()=>setShow(!show)} className="text-muted-foreground" aria-label={show?"Ocultar senha":"Mostrar senha"}>
          {show?<EyeOff size={18}/>:<Eye size={18}/>}
        </button>
      </div>
      {error && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
    </div>
  );
}

function Toast({ message,type,onClose }:{message:string;type:"success"|"error"|"info";onClose:()=>void}) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[onClose]);
  const Icon = type==="success"?CheckCircle:type==="error"?AlertCircle:Info;
  const cls = {success:"border-primary text-primary",error:"border-destructive text-destructive",info:"border-accent text-accent"}[type];
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-card border ${cls} rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-2xl max-w-[88vw]`} role="alert" aria-live="assertive">
      <Icon size={20}/><span className="text-sm font-inter text-foreground leading-snug">{message}</span>
      <button onClick={onClose} className="ml-1 text-muted-foreground" aria-label="Fechar"><X size={16}/></button>
    </div>
  );
}

function Modal({ title,children,onClose }:{title:string;children:React.ReactNode;onClose:()=>void}) {
  return (
    <div className="fixed inset-0 z-40 bg-black/80 flex items-end justify-center" onClick={onClose}>
      <div className="bg-card rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 pb-10" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-montserrat font-bold text-xl text-foreground">{title}</h2>
          <button onClick={onClose} aria-label="Fechar"><X size={24} className="text-muted-foreground"/></button>
        </div>
        <div className="text-muted-foreground text-sm font-inter leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Badge({ status }:{status:string}) {
  const M: Record<string,{l:string;c:string;d:string}> = {
    "disponivel":    {l:"Disponível",         c:"text-primary",          d:"bg-primary"},
    "andamento":     {l:"Em andamento",        c:"text-accent",           d:"bg-accent"},
    "concluido":     {l:"Concluído",           c:"text-muted-foreground", d:"bg-muted-foreground"},
    "em-dia":        {l:"Em dia",              c:"text-primary",          d:"bg-primary"},
    "pendente":      {l:"Avaliação pendente",  c:"text-yellow-400",       d:"bg-yellow-400"},
    "mensalidade":   {l:"Mensalidade",         c:"text-destructive",      d:"bg-destructive"},
    "sem-atividade": {l:"Sem atividade",       c:"text-muted-foreground", d:"bg-muted-foreground"},
  };
  const s = M[status]??{l:status,c:"text-muted-foreground",d:"bg-muted-foreground"};
  return (
    <span className={`flex items-center gap-1.5 text-xs font-inter font-medium ${s.c}`} aria-label={`Status: ${s.l}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.d}`} aria-hidden="true"/>{s.l}
    </span>
  );
}

function Tog({ on,toggle,label,color }:{on:boolean;toggle:()=>void;label:string;color:string}) {
  return (
    <button onClick={toggle} className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${on?"":"bg-muted"}`}
      style={on?{background:color}:undefined} aria-pressed={on} aria-label={`${label}: ${on?"ativado":"desativado"}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on?"left-6":"left-0.5"}`}/>
    </button>
  );
}

function Caps({ items,active,onChange,ut="personal" }:{items:string[];active:string;onChange:(v:string)=>void;ut?:UserType}) {
  return (
    <div className="flex gap-2 flex-wrap" role="group">
      {items.map(p=>(
        <button key={p} onClick={()=>onChange(p)}
          className={`px-4 py-2 rounded-full text-sm font-inter font-medium transition-all ${active===p?"text-black font-semibold":"bg-muted text-muted-foreground"}`}
          style={active===p?{background:GRAD(ut)}:undefined} aria-pressed={active===p}>{p}</button>
      ))}
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Voltar"
      className="flex items-center justify-center rounded-full flex-shrink-0 transition-all active:scale-90"
      style={{
        width: 52, height: 52,
        background: "#1C1C1E",
        border: "1px solid #2A2A2A",
        boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
      }}
    >
      <ArrowLeft size={22} color="#ffffff" strokeWidth={2.5} />
    </button>
  );
}

function StatCard({ icon,label,value,sub,color }:{icon:React.ReactNode;label:string;value:string;sub?:string;color:string}) {
  return (
    <div className="bg-card rounded-2xl p-4 flex flex-col gap-1.5 border border-border min-w-0">
      <span style={{color}}>{icon}</span>
      <p className="text-xl font-montserrat font-bold text-foreground leading-tight">{value}</p>
      <p className="text-xs font-inter text-muted-foreground leading-snug">{label}</p>
      {sub && <p className="text-xs font-inter leading-snug" style={{color}}>{sub}</p>}
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ active,onNav,ut }:{active:Screen;onNav:(s:Screen)=>void;ut:UserType}) {
  const pItems = [
  {id:"dashboard" as Screen, label:"Home",    icon:<Home size={26}/>},
  {id:"alunos"    as Screen, label:"Alunos",  icon:<Users size={26}/>},
  {id:"workouts"  as Screen, label:"Treinos", icon:<Dumbbell size={26}/>},
  {id:"chat"      as Screen, label:"Chat",    icon:<MessageCircle size={26}/>},
  {id:"profile"   as Screen, label:"Perfil",  icon:<User size={26}/>},
];
 const aItems = [
  {id:"dashboard" as Screen, label:"Início",    icon:<Home size={26}/>},
  {id:"workouts"  as Screen, label:"Treino",    icon:<Dumbbell size={26}/>},
  {id:"evolution" as Screen, label:"Progresso", icon:<TrendingUp size={26}/>},
  {id:"chat"      as Screen, label:"Chat",      icon:<MessageCircle size={26}/>},
  {id:"profile"   as Screen, label:"Perfil",    icon:<User size={26}/>},
];
  const items = ut==="personal" ? pItems : aItems;
  const ac = AC(ut);
  const acBg = AC_BG(ut, 0.15);

  const sel = (id:Screen) => {
    if (active===id) return true;
    return false;
  };

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30"
      style={{ width:"calc(100% - 40px)", maxWidth:"420px" }}
      aria-label="Navegação principal"
    >
      <div
        className="flex items-center justify-around"
        style={{
          height: 76,
          borderRadius: 40,
          background: "rgba(18,18,20,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset",
          padding: "0 10px",
        }}
      >
        {items.map(item => {
          const s = sel(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              aria-current={s ? "page" : undefined}
              aria-label={item.label}
              className="flex flex-col items-center justify-center gap-1 transition-all active:scale-90"
              style={{
                flex: 1,
                height: 58,
                borderRadius: 30,
                background: s ? acBg : "transparent",
                color: s ? ac : "#9CA3AF",
              }}
            >
              {item.icon}
              <span
                className="font-inter font-semibold leading-none"
                style={{ fontSize: 11, color: s ? ac : "#9CA3AF" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── App Mockup (decorativo, centro do onboarding) ───────────────────────────

function AppMockup() {
  return (
    <div
      className="w-full rounded-3xl overflow-hidden border border-border relative"
      style={{ background: "#0e0e10", maxWidth: 280 }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-[10px] font-inter text-muted-foreground">09:41</span>
        <div className="flex gap-1">
          {[1,2,3].map(i=><div key={i} className="w-1 h-2.5 rounded-full bg-muted-foreground opacity-60" style={{height:8+i*3}}/>)}
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pb-4 border-b border-border">
        <p className="text-[10px] font-inter text-muted-foreground">Bem-vindo,</p>
        <p className="font-montserrat font-bold text-sm text-foreground">Rafael</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        {[
          { label: "Treinos", value: "48", color: "#00E676" },
          { label: "Alunos",  value: "8",  color: "#38BDF8" },
          { label: "Semana",  value: "3x", color: "#00E676" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl p-2.5 flex flex-col gap-1 border border-border">
            <p className="font-montserrat font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[9px] font-inter text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div className="px-4 pb-3">
        <p className="text-[9px] font-inter text-muted-foreground mb-2">Volume semanal</p>
        <div className="flex items-end gap-1.5 h-14">
          {[40,20,70,55,15,90,60].map((h,i) => (
            <div key={i} className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i===5 ? "linear-gradient(#00E676,#38BDF8)" : "#2a2a2a" }}/>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["S","T","Q","Q","S","S","D"].map((d,i)=>(
            <span key={i} className="text-[8px] font-inter text-muted-foreground">{d}</span>
          ))}
        </div>
      </div>

      {/* Recent workout */}
      <div className="mx-4 mb-4 bg-card border border-border rounded-xl px-3 py-2.5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,230,118,0.15)" }}>
          <Dumbbell size={13} color="#00E676"/>
        </div>
        <div className="min-w-0">
          <p className="font-inter font-semibold text-[10px] text-foreground">Upper A</p>
          <p className="text-[9px] font-inter text-muted-foreground">6 exercícios · 65 min</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"/>
          <span className="text-[9px] font-inter text-primary">Ativo</span>
        </div>
      </div>

      {/* Bottom nav mockup */}
      <div className="flex items-center justify-around px-3 py-3 border-t border-border"
        style={{ background: "rgba(18,18,20,0.95)" }}>
        {[
          { icon: <Home size={13}/>,       label: "Home",    active: true  },
          { icon: <Dumbbell size={13}/>,    label: "Treinos", active: false },
          { icon: <TrendingUp size={13}/>,  label: "Progresso",active: false},
          { icon: <User size={13}/>,        label: "Perfil",  active: false },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-0.5"
            style={{ color: item.active ? "#00E676" : "#6b7280" }}>
            {item.icon}
            <span className="text-[7px] font-inter">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Welcome (Onboarding) ─────────────────────────────────────────────────────

const SLIDES = [
  {
    title: "Organize seus treinos\nem um só lugar",
    sub: "Gerencie alunos, acompanhe evolução e registre treinos com praticidade e desempenho.",
  },
  {
    title: "Acompanhe cada\naluno em detalhes",
    sub: "Histórico completo, avaliações físicas e progresso real na palma da mão.",
  },
  {
    title: "Performance e\ntecnologia juntos",
    sub: "Dashboards inteligentes, gráficos de evolução e notificações em tempo real.",
  },
];

function Welcome({ onContinue, onLogin }: { onContinue: () => void; onLogin: () => void }) {
  const [slide, setSlide] = useState(0);

  // auto-advance slides
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const { title, sub } = SLIDES[slide];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#000000" }}
    >
      {/* Top: logo */}
      <div className="flex justify-center pt-14 pb-2 px-6">
        <Logo size="md" />
      </div>

      {/* Central area: mockup + text */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {/* Phone mockup */}
        <div className="relative w-full flex justify-center">
          {/* Glow behind mockup — verde, não azul */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,230,118,0.10) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <AppMockup />
        </div>

        {/* Slide text — fixed height to avoid layout jump */}
        <div className="text-center w-full max-w-xs" style={{ minHeight: 96 }}>
          <h1
            className="font-montserrat font-extrabold text-foreground mb-3 whitespace-pre-line"
            style={{ fontSize: 22, lineHeight: 1.25 }}
          >
            {title}
          </h1>
          <p className="font-inter text-muted-foreground text-sm leading-relaxed">{sub}</p>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Slides do onboarding">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              role="tab"
              aria-selected={i === slide}
              aria-label={`Slide ${i + 1}`}
              className="transition-all"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === slide
                  ? "linear-gradient(90deg,#00E676,#38BDF8)"
                  : "#2a2a2a",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom: CTAs */}
      <div className="px-6 pb-12 flex flex-col gap-4">
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: "linear-gradient(90deg,#00E676,#38BDF8)" }}
        >
          Começar
        </button>
        <button
          onClick={onLogin}
          className="text-sm font-inter text-center"
          style={{ color: "#9CA3AF" }}
        >
          Já tenho uma conta?{" "}
          <span style={{ color: "#38BDF8" }} className="font-semibold">Iniciar sessão</span>
        </button>
      </div>
    </div>
  );
}


// ─── Login ────────────────────────────────────────────────────────────────────

function Login({ onLogin,onRegister,onShowModal,onBack }:
  {onLogin:(u:AppUser)=>void;onRegister:()=>void;onShowModal:(t:"terms"|"privacy")=>void;onBack:()=>void}) {
  const [ut,setUt]=useState<UserType>("personal");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [loading,setLoading]=useState(false);
  const [errs,setErrs]=useState<Record<string,string>>({});
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);
  const ac=AC(ut);

  const go=()=>{
    const e:Record<string,string>={};
    if (!email) e.email="Preencha o e-mail.";
    else if(!/\S+@\S+\.\S+/.test(email)) e.email="E-mail inválido.";
    if (!pw) e.pw="Preencha a senha.";
    setErrs(e); if(Object.keys(e).length) return;
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if (email.includes("@")&&pw.length>=6) {
        setToast({msg:"Login realizado com sucesso. Bem-vindo ao TrainerX64.",type:"success"});
        setTimeout(()=>onLogin({name:ut==="personal"?"Rafael":"Gustavo",email,type:ut}),1200);
      } else {
        setToast({msg:"E-mail ou senha inválidos. Verifique os dados e tente novamente.",type:"error"});
      }
    },1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div className="flex flex-col flex-1 px-6 pt-14 pb-8 max-w-lg mx-auto w-full">
        <div className="mb-8 self-start">
          <BackBtn onClick={onBack}/>
        </div>
        <div className="flex justify-center mb-5"><Logo size="md"/></div>
        <p className="text-center text-muted-foreground text-sm font-inter mb-7">Faça login para continuar</p>

        <div className="mb-6">
          <p className="font-montserrat font-semibold text-sm text-foreground mb-3">Selecione o tipo de usuário</p>
          <div className="grid grid-cols-2 gap-3">
            {(["personal","aluno"] as UserType[]).map(t=>{
              const s=ut===t; const c=AC(t);
              return (
                <button key={t} onClick={()=>setUt(t)}
                  className="flex flex-col items-center gap-3 py-5 rounded-2xl transition-all"
                  style={{border:`2px solid ${s?c:"#2a2a2a"}`,background:s?AC_BG(t,0.1):"#1c1c1e"}} aria-pressed={s}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:s?c:"#2a2a2a"}}>
                    {t==="personal"?<Dumbbell size={22} color={s?"#000":"#a0a0a0"}/>:<User size={22} color={s?"#000":"#a0a0a0"}/>}
                  </div>
                  <span className="font-montserrat font-bold text-sm" style={{color:s?c:"#a0a0a0"}}>
                    {t==="personal"?"Personal":"Aluno"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Fld label="Email" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" error={errs.email} icon={<Mail size={18}/>}/>
          <PwFld label="Senha" value={pw} onChange={setPw} error={errs.pw} icon={<Lock size={18}/>}/>
          <div className="flex justify-end">
            <button className="text-sm font-inter" style={{color:ac}}>Esqueceu sua senha?</button>
          </div>
          <button onClick={go} disabled={loading}
            className="w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            style={{background:loading?"#2a2a2a":ac}} aria-busy={loading}>
            {loading?<RefreshCw size={20} className="animate-spin text-white"/>:<>Entrar →</>}
          </button>
        </div>

        <div className="flex justify-center mt-5">
          <span className="text-sm text-muted-foreground font-inter">Não tem uma conta? </span>
          <button onClick={onRegister} className="text-sm font-inter font-semibold ml-1" style={{color:ac}}>Cadastre-se</button>
        </div>
        <div className="flex justify-center gap-4 mt-auto pt-8">
          <button className="text-xs text-muted-foreground font-inter hover:text-accent" onClick={()=>onShowModal("terms")}>Termos de Uso</button>
          <span className="text-muted-foreground text-xs">·</span>
          <button className="text-xs text-muted-foreground font-inter hover:text-accent" onClick={()=>onShowModal("privacy")}>Privacidade</button>
        </div>
        <p className="text-center text-xs text-muted-foreground font-inter mt-2">© 2025 Sistema de Treinamentos</p>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────

function Register({ onDone,onLogin,onShowModal }:
  {onDone:()=>void;onLogin:()=>void;onShowModal:(t:"terms"|"privacy")=>void}) {
  const [step,setStep]=useState(1);
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [pw,setPw]=useState(""); const [confirm,setConfirm]=useState("");
  const [atype,setAtype]=useState<UserType|"">("");
  const [goal,setGoal]=useState(""); const [terms,setTerms]=useState(false);
  const [a11yOpen,setA11yOpen]=useState(false);
  const [a11y,setA11y]=useState({altoContraste:false,textoAmpliado:false,leituraPorVoz:false,navegacaoSimplificada:false,feedbackSonoro:false,descricoesAlternativas:false});
  const [errs,setErrs]=useState<Record<string,string>>({});
  const [loading,setLoading]=useState(false);
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);

  const rt=(atype||"personal") as UserType;
  const ac=AC(rt);
  const GOALS=["Hipertrofia","Emagrecimento","Condicionamento","Saúde","Reabilitação"];
  const A11Y_LIST:[keyof typeof a11y,string][]=[
    ["altoContraste","Alto contraste"],["textoAmpliado","Texto ampliado"],
    ["leituraPorVoz","Leitura por voz"],["navegacaoSimplificada","Navegação simplificada"],
    ["feedbackSonoro","Feedback sonoro/vibratório"],["descricoesAlternativas","Descrições alternativas"],
  ];

  const v1=()=>{
    const e:Record<string,string>={};
    if(!name.trim()) e.name="Nome obrigatório.";
    if(!email) e.email="E-mail obrigatório."; else if(!/\S+@\S+\.\S+/.test(email)) e.email="E-mail inválido.";
    if(!pw) e.pw="Senha obrigatória."; else if(pw.length<6) e.pw="Mínimo 6 caracteres.";
    if(pw!==confirm) e.confirm="As senhas não conferem.";
    setErrs(e); return !Object.keys(e).length;
  };
  const v2=()=>{
    const e:Record<string,string>={};
    if(!atype) e.atype="Selecione o tipo.";
    if(!goal) e.goal="Selecione um objetivo.";
    if(!terms) e.terms="Aceite os Termos de Uso e a Política de Privacidade.";
    setErrs(e); return !Object.keys(e).length;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-y-auto">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div className="flex flex-col flex-1 px-6 pt-12 pb-8 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <BackBtn onClick={step===1?onLogin:()=>setStep(1)}/>
          <Logo size="sm" variant="short"/>
          <span className="text-xs font-inter text-muted-foreground">{step}/2</span>
        </div>
        <div className="flex gap-2 mb-8">
          {[1,2].map(s=>(
            <div key={s} className="h-1.5 flex-1 rounded-full transition-all"
              style={{background:s<=step?"linear-gradient(90deg,#00e676,#38bdf8)":"#2a2a2a"}} aria-hidden="true"/>
          ))}
        </div>

        {step===1 ? (
          <>
            <h1 className="font-montserrat font-bold text-3xl text-foreground mb-1">Criar conta</h1>
            <p className="text-muted-foreground text-sm font-inter mb-6">Preencha seus dados para começar.</p>
            <div className="flex flex-col gap-4">
              <Fld label="Nome completo" value={name} onChange={setName} placeholder="Seu nome" error={errs.name} icon={<User size={18}/>}/>
              <Fld label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" error={errs.email} icon={<Mail size={18}/>}/>
              <PwFld label="Senha" value={pw} onChange={setPw} error={errs.pw} icon={<Lock size={18}/>}/>
              <PwFld label="Confirmar senha" value={confirm} onChange={setConfirm} error={errs.confirm} icon={<Lock size={18}/>}/>
            </div>
            <div className="mt-6"><PBtn onClick={()=>{if(v1())setStep(2);}} ut="personal">Continuar</PBtn></div>
            <div className="flex justify-center mt-4">
              <button onClick={onLogin} className="text-sm text-muted-foreground font-inter">
                Já tenho conta. <span className="text-primary font-semibold">Entrar</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-montserrat font-bold text-3xl text-foreground mb-1">Seu perfil</h1>
            <p className="text-muted-foreground text-sm font-inter mb-6">Personalize sua experiência.</p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-3">Tipo de conta</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["personal","aluno"] as UserType[]).map(t=>{
                    const s=atype===t; const c=AC(t);
                    return (
                      <button key={t} onClick={()=>setAtype(t)}
                        className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all"
                        style={{border:`2px solid ${s?c:"#2a2a2a"}`,background:s?AC_BG(t,0.08):"#1c1c1e"}} aria-pressed={s}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background:s?c:"#2a2a2a"}}>
                          {t==="personal"?<Dumbbell size={18} color={s?"#000":"#a0a0a0"}/>:<User size={18} color={s?"#000":"#a0a0a0"}/>}
                        </div>
                        <span className="font-montserrat font-bold text-xs" style={{color:s?c:"#a0a0a0"}}>
                          {t==="personal"?"Personal Trainer":"Aluno"}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errs.atype && <p className="text-xs text-destructive mt-1">{errs.atype}</p>}
              </div>
              <div>
                <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-3">Objetivo principal</label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(g=>(
                    <button key={g} onClick={()=>setGoal(g)}
                      className={`px-4 py-2 rounded-full text-sm font-inter transition-all ${goal===g?"text-black font-semibold":"bg-card border border-border text-muted-foreground"}`}
                      style={goal===g?{background:GRAD(rt)}:undefined} aria-pressed={goal===g}>{g}</button>
                  ))}
                </div>
                {errs.goal && <p className="text-xs text-destructive mt-1">{errs.goal}</p>}
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <button className="w-full flex items-center justify-between px-4 py-4" onClick={()=>setA11yOpen(!a11yOpen)} aria-expanded={a11yOpen}>
                  <div className="text-left">
                    <p className="font-montserrat font-semibold text-sm text-foreground">Recursos de Acessibilidade</p>
                    <p className="text-xs text-muted-foreground font-inter mt-0.5">Deseja ativar recursos para facilitar sua navegação?</p>
                  </div>
                  <ChevronDown size={18} className={`text-muted-foreground transition-transform ${a11yOpen?"rotate-180":""}`}/>
                </button>
                {a11yOpen && (
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t border-border pt-3">
                    {A11Y_LIST.map(([k,label])=>(
                      <div key={k} className="flex items-center justify-between">
                        <span className="text-sm font-inter text-foreground">{label}</span>
                        <Tog on={a11y[k]} toggle={()=>setA11y(p=>({...p,[k]:!p[k]}))} label={label} color={ac}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={()=>setTerms(!terms)}
                className="flex items-start gap-3 text-left p-3 rounded-2xl border transition-all"
                style={{border:`1px solid ${terms?ac:"#2a2a2a"}`,background:terms?AC_BG(rt,0.05):undefined}} aria-pressed={terms}>
                <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                  style={terms?{background:ac}:{border:"1px solid #2a2a2a"}}>
                  {terms && <Check size={12} strokeWidth={3} className="text-black"/>}
                </div>
                <span className="text-sm font-inter text-muted-foreground">
                  Aceito os{" "}
                  <button className="text-accent underline" onClick={e=>{e.stopPropagation();onShowModal("terms");}}>Termos de Uso</button>
                  {" "}e a{" "}
                  <button className="text-accent underline" onClick={e=>{e.stopPropagation();onShowModal("privacy");}}>Política de Privacidade</button>
                </span>
              </button>
              {errs.terms && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12}/>{errs.terms}</p>}
            </div>
            <div className="mt-6">
              <PBtn
                onClick={()=>{if(!v2())return;setLoading(true);setTimeout(()=>{setLoading(false);setToast({msg:"Cadastro realizado com sucesso. Você já pode acessar o TrainerX64.",type:"success"});setTimeout(onDone,1800);},1600);}}
                loading={loading} disabled={!atype||!goal||!terms} ut={rt}>
                Criar conta
              </PBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Personal Dashboard ───────────────────────────────────────────────────────

function PersonalDash({ user,onNav }:{user:AppUser;onNav:(s:Screen)=>void}) {
  const [period,setPeriod]=useState("Semana");
  const ac=AC("personal");
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      <div className="px-6 pt-14 pb-5" style={{background:"linear-gradient(180deg,rgba(0,230,118,0.08) 0%,transparent 100%)"}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-inter">Bem-vindo(a), Personal</p>
            <h1 className="font-montserrat font-bold text-3xl text-foreground">Olá, {user.name}!</h1>
            <p className="text-muted-foreground text-xs font-inter mt-1">Gerencie seus alunos e treinos</p>
          </div>
          <button onClick={()=>onNav("notifications")} className="relative" aria-label="Notificações">
            <Bell size={24} className="text-muted-foreground"/>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-bold">3</span>
          </button>
        </div>
      </div>
      <div className="px-6 flex flex-col gap-5">
        <Caps items={["Semana","Mês","3 meses"]} active={period} onChange={setPeriod} ut="personal"/>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Users size={18}/>}        label="Alunos ativos"  value="8"  color={ac}/>
          <StatCard icon={<ClipboardList size={18}/>} label="Treinos pend."  value="3"  color="#f59e0b"/>
          <StatCard icon={<Star size={18}/>}          label="Avaliações"     value="2"  color={ac}/>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-montserrat font-semibold text-sm text-foreground mb-3">Volume semanal (kg)</p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={WEEK} barSize={18}>
              <XAxis dataKey="day" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}} cursor={{fill:"rgba(255,255,255,0.04)"}}/>
              <Bar dataKey="v" fill={ac} radius={[6,6,0,0]} name="Volume (kg)"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-montserrat font-bold text-base text-foreground mb-3">Ações rápidas</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {icon:<Plus size={18}/>,         label:"Criar treino",     screen:"criar-treino" as Screen},
              {icon:<UserPlus size={18}/>,      label:"Cadastrar aluno",  screen:"alunos"       as Screen},
              {icon:<ClipboardList size={18}/>, label:"Avaliação física", screen:"evolution"    as Screen},
              {icon:<MessageCircle size={18}/>, label:"Chat integrado",   screen:"chat"         as Screen},
            ].map(a=>(
              <button key={a.label} onClick={()=>onNav(a.screen)}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary transition-all text-left">
                <span style={{color:ac}}>{a.icon}</span>
                <span className="text-sm font-inter font-medium text-foreground leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-montserrat font-bold text-base text-foreground">Alunos recentes</h2>
            <button className="text-xs font-inter" style={{color:ac}} onClick={()=>onNav("alunos")}>Ver todos</button>
          </div>
          {STUDENTS.slice(0,4).map(s=>(
            <div key={s.id} className="bg-card border border-border rounded-2xl px-4 py-3 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold text-sm text-black flex-shrink-0"
                  style={{background:s.status==="em-dia"?ac:s.status==="pendente"?"#f59e0b":s.status==="mensalidade"?"#ef4444":"#2a2a2a"}}>
                  {s.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-inter font-semibold text-sm text-foreground truncate">{s.name}</p>
                  <p className="text-xs font-inter text-muted-foreground truncate">{s.workout} · {s.lastSeen}</p>
                </div>
              </div>
              <Badge status={s.status}/>
            </div>
          ))}
        </div>
        <PBtn onClick={()=>onNav("alunos")} ut="personal"><Users size={20}/> Ver todos os alunos</PBtn>
      </div>
    </div>
  );
}

// ─── Aluno Dashboard ──────────────────────────────────────────────────────────

function AlunoDash({ user,onNav }:{user:AppUser;onNav:(s:Screen)=>void}) {
  const [period,setPeriod]=useState("Semana");
  const ac=AC("aluno");
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      <div className="px-6 pt-14 pb-5" style={{background:"linear-gradient(180deg,rgba(56,189,248,0.08) 0%,transparent 100%)"}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-inter">Bem-vindo(a), Aluno</p>
            <h1 className="font-montserrat font-bold text-3xl text-foreground">Olá, {user.name}!</h1>
            <p className="text-muted-foreground text-xs font-inter mt-1">Continue sua jornada fitness</p>
          </div>
          <button onClick={()=>onNav("notifications")} className="relative" aria-label="Notificações">
            <Bell size={24} className="text-muted-foreground"/>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-bold">2</span>
          </button>
        </div>
      </div>
      <div className="px-6 flex flex-col gap-5">
        <Caps items={["Semana","Mês","3 meses"]} active={period} onChange={setPeriod} ut="aluno"/>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Dumbbell size={18}/>} label="Treinos" value="12"      color={ac}/>
          <StatCard icon={<Zap size={18}/>}      label="Sequência" value="4 dias" color={ac}/>
          <StatCard icon={<Star size={18}/>}     label="Metas"   value="3"        color={ac}/>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-montserrat font-semibold text-sm text-foreground mb-3">Progresso semanal</p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={WEEK} barSize={18}>
              <XAxis dataKey="day" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}} cursor={{fill:"rgba(255,255,255,0.04)"}}/>
              <Bar dataKey="v" fill={ac} radius={[6,6,0,0]} name="Volume (kg)"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-montserrat font-bold text-base text-foreground mb-3">Ações rápidas</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {icon:<Play size={18}/>,    label:"Iniciar treino", screen:"workouts"  as Screen},
              {icon:<Target size={18}/>,  label:"Minhas metas",   screen:"evolution" as Screen},
              {icon:<Activity size={18}/>,label:"Histórico",      screen:"evolution" as Screen},
              {icon:<MessageCircle size={18}/>, label:"Falar com personal", screen:"chat"   as Screen},
            ].map(a=>(
              <button key={a.label} onClick={()=>onNav(a.screen)}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-accent transition-all text-left">
                <span style={{color:ac}}>{a.icon}</span>
                <span className="text-sm font-inter font-medium text-foreground leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-montserrat font-bold text-base text-foreground">Meus treinos</h2>
            <button className="text-xs font-inter" style={{color:ac}} onClick={()=>onNav("workouts")}>Ver todos</button>
          </div>
          {WORKOUTS.filter(w=>w.status!=="concluido").slice(0,2).map(w=>(
            <div key={w.id} className="bg-card border border-border rounded-2xl p-4 mb-2">
              <div className="flex items-center justify-between mb-3">
                <div className="min-w-0 pr-2">
                  <h3 className="font-montserrat font-bold text-base text-foreground">{w.name}</h3>
                  <p className="text-xs font-inter text-muted-foreground">{w.goal} · {w.duration}</p>
                </div>
                <Badge status={w.status}/>
              </div>
              <button onClick={()=>onNav("workouts")}
                className="w-full h-11 rounded-xl font-inter font-semibold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{background:ac}}>
                <Play size={16}/> Iniciar treino
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Alunos List ──────────────────────────────────────────────────────────────

function AlunosList({ onSelect }:{onSelect:(s:Student)=>void}) {
  const [filter,setFilter]=useState("Todos");
  const [search,setSearch]=useState("");
  const ac=AC("personal");
  const SM:Record<string,string>={"Em dia":"em-dia","Pendente":"pendente","Mensalidade":"mensalidade"};
  const list=STUDENTS.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())&&(filter==="Todos"||s.status===SM[filter]));
  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="px-6 pt-14 pb-4" style={{background:"linear-gradient(180deg,rgba(0,230,118,0.06) 0%,transparent 100%)"}}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-montserrat font-bold text-3xl text-foreground">Meus Alunos</h1>
          <button className="w-11 h-11 rounded-2xl flex items-center justify-center text-black transition-all active:scale-95"
            style={{background:ac}} aria-label="Adicionar aluno"><UserPlus size={20}/></button>
        </div>
        <p className="text-muted-foreground text-sm font-inter">{STUDENTS.length} alunos cadastrados</p>
      </div>
      <div className="px-6 mb-3">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-12">
          <Search size={18} className="text-muted-foreground"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar aluno..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-inter outline-none" aria-label="Buscar aluno"/>
          {search&&<button onClick={()=>setSearch("")} aria-label="Limpar"><X size={16} className="text-muted-foreground"/></button>}
        </div>
      </div>
      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {["Todos","Em dia","Pendente","Mensalidade"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all ${filter===f?"text-black":"bg-card border border-border text-muted-foreground"}`}
              style={filter===f?{background:ac}:undefined} aria-pressed={filter===f}>{f}</button>
          ))}
        </div>
      </div>
      <div className="px-6 flex flex-col gap-2">
        {list.length===0 ? (
          <div className="flex flex-col items-center gap-3 py-12"><Users size={40} className="text-muted-foreground"/>
            <p className="font-inter text-muted-foreground text-center">Nenhum aluno encontrado.</p></div>
        ) : list.map(s=>(
          <button key={s.id} onClick={()=>onSelect(s)}
            className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between w-full hover:border-primary transition-all text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-montserrat font-bold text-sm text-black flex-shrink-0"
                style={{background:s.status==="em-dia"?ac:s.status==="pendente"?"#f59e0b":s.status==="mensalidade"?"#ef4444":"#2a2a2a"}}>
                {s.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-montserrat font-bold text-sm text-foreground">{s.name}</p>
                <p className="text-xs font-inter text-muted-foreground truncate">{s.workout} · Visto {s.lastSeen}</p>
                <Badge status={s.status}/>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground flex-shrink-0 ml-2"/>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Aluno Detail ─────────────────────────────────────────────────────────────

function AlunoDetail({ student,onBack,onNav }:{student:Student;onBack:()=>void;onNav:(s:Screen)=>void}) {
  const ac=AC("personal");
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"|"info"}|null>(null);
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackBtn onClick={onBack}/>
          <p className="font-montserrat font-semibold text-sm text-muted-foreground">Perfil do Aluno</p>
          <button aria-label="Mais opções"><MoreVertical size={20} className="text-muted-foreground"/></button>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-montserrat font-bold text-2xl text-black flex-shrink-0"
            style={{background:ac}}>{student.name[0]}</div>
          <div className="flex-1 min-w-0">
            <h1 className="font-montserrat font-bold text-xl text-foreground">{student.name}</h1>
            <Badge status={student.status}/>
            <p className="text-xs font-inter text-muted-foreground mt-1">Treino: {student.workout}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard icon={<Weight size={16}/>} label="Peso"   value={`${student.weight} kg`} color={ac}/>
          <StatCard icon={<Ruler size={16}/>}  label="Altura" value={`${student.height} cm`} color={ac}/>
          <StatCard icon={<User size={16}/>}   label="Idade"  value={`${student.age} anos`}  color={ac}/>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatCard icon={<Star size={16}/>}     label="Nível"    value={student.level}    color={ac}/>
          <StatCard icon={<Target size={16}/>}   label="Objetivo" value={student.goal}     color={ac}/>
          <StatCard icon={<Activity size={16}/>} label="Visto"    value={student.lastSeen} color={ac}/>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {icon:<Plus size={18}/>,         label:"Criar treino",   action:()=>onNav("criar-treino")},
            {icon:<TrendingUp size={18}/>,   label:"Ver evolução",   action:()=>onNav("evolution")},
            {icon:<ClipboardList size={18}/>,label:"Reg. avaliação", action:()=>setToast({msg:"Avaliação registrada com sucesso.",type:"success"})},
            {icon:<CreditCard size={18}/>,   label:"Mensalidade",    action:()=>setToast({msg:"Status de mensalidade atualizado.",type:"info"})},
          ].map(a=>(
            <button key={a.label} onClick={a.action}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary transition-all text-left">
              <span style={{color:ac}}>{a.icon}</span>
              <span className="text-sm font-inter font-medium text-foreground leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
        <PBtn onClick={()=>onNav("criar-treino")} ut="personal"><Plus size={20}/> Criar novo treino</PBtn>
      </div>
    </div>
  );
}

// ─── Criar Treino ─────────────────────────────────────────────────────────────

function CriarTreino({ onBack }:{onBack:()=>void}) {
  const [student,setStudent]=useState("");
  const [wname,setWname]=useState("");
  const [cat,setCat]=useState("");
  const [desc,setDesc]=useState("");
  const [exs,setExs]=useState<string[]>([]);
  const [showModal,setShowModal]=useState(false);
  const [exSearch,setExSearch]=useState("");
  const [exFilter,setExFilter]=useState("Todos");
  const [errs,setErrs]=useState<Record<string,string>>({});
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);
  const ac=AC("personal");
  const canSave=wname.trim()&&cat&&exs.length>0;
  const filtered=ALL_EX.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())&&(exFilter==="Todos"||e.cat===exFilter));

  const save=()=>{
    const e:Record<string,string>={};
    if(!wname.trim()) e.wname="Nome obrigatório.";
    if(!cat) e.cat="Categoria obrigatória.";
    if(!exs.length) e.ex="Adicione ao menos 1 exercício.";
    setErrs(e); if(Object.keys(e).length) return;
    setToast({msg:"Treino criado com sucesso.",type:"success"});
    setTimeout(onBack,1500);
  };

  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      {showModal&&(
        <div className="fixed inset-0 z-40 bg-black/80 flex items-end justify-center" onClick={()=>setShowModal(false)}>
          <div className="bg-card rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-5 pb-10" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-montserrat font-bold text-xl text-foreground">Selecionar Exercício</h2>
              <button onClick={()=>setShowModal(false)} aria-label="Fechar"><X size={24} className="text-muted-foreground"/></button>
            </div>
            <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 h-11 mb-3">
              <Search size={16} className="text-muted-foreground"/>
              <input value={exSearch} onChange={e=>setExSearch(e.target.value)} placeholder="Buscar..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none" aria-label="Buscar exercício"/>
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {["Todos","Peito","Costas","Pernas","Ombros","Braços"].map(f=>(
                <button key={f} onClick={()=>setExFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-inter font-medium whitespace-nowrap transition-all ${exFilter===f?"text-black":"bg-muted text-muted-foreground"}`}
                  style={exFilter===f?{background:ac}:undefined} aria-pressed={exFilter===f}>{f}</button>
              ))}
            </div>
            {filtered.length===0
              ? <p className="text-center text-muted-foreground text-sm py-8">Nenhum exercício encontrado.</p>
              : filtered.map(ex=>(
                <button key={ex.name} onClick={()=>{if(!exs.includes(ex.name))setExs(p=>[...p,ex.name]);setShowModal(false);}}
                  className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 py-3 text-left hover:border-primary transition-all w-full mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:AC_BG("personal",0.15)}}>
                    <Dumbbell size={18} style={{color:ac}}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter font-semibold text-sm text-foreground">{ex.name}</p>
                    <p className="text-xs text-muted-foreground font-inter">{ex.desc}</p>
                  </div>
                  <span className="text-xs font-inter px-2 py-1 rounded-full bg-muted text-muted-foreground flex-shrink-0">{ex.cat}</span>
                  {exs.includes(ex.name)&&<Check size={16} style={{color:ac}}/>}
                </button>
              ))
            }
          </div>
        </div>
      )}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <BackBtn onClick={onBack}/>
          <h1 className="font-montserrat font-bold text-2xl text-foreground">Criar Treino</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-2">Aluno (opcional)</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Nenhum",...STUDENTS.map(s=>s.name)].map(n=>{
                const v=n==="Nenhum"?"":n; const s=student===v;
                return <button key={n} onClick={()=>setStudent(v)}
                  className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all flex-shrink-0 ${s?"text-black":"bg-card border border-border text-muted-foreground"}`}
                  style={s?{background:ac}:undefined} aria-pressed={s}>{n}</button>;
              })}
            </div>
          </div>
          <Fld label="Nome do treino *" value={wname} onChange={setWname} placeholder="Ex: Upper A" error={errs.wname} icon={<Dumbbell size={18}/>}/>
          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-2">Categoria *</label>
            <div className="flex flex-wrap gap-2">
              {["Hipertrofia","Emagrecimento","Condicionamento","Mobilidade","Reabilitação"].map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-inter transition-all ${cat===c?"text-black font-semibold":"bg-card border border-border text-muted-foreground"}`}
                  style={cat===c?{background:ac}:undefined} aria-pressed={cat===c}>{c}</button>
              ))}
            </div>
            {errs.cat&&<p className="text-xs text-destructive mt-1">{errs.cat}</p>}
          </div>
          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-2">Descrição (opcional)</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Objetivo, observações..."
              className="w-full rounded-2xl bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
              rows={3} aria-label="Descrição"/>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-montserrat font-semibold text-muted-foreground">Exercícios *</label>
              <span className="text-xs font-inter text-muted-foreground">{exs.length} adicionado{exs.length!==1?"s":""}</span>
            </div>
            {exs.length===0
              ? <div className="bg-card border border-dashed border-border rounded-2xl py-8 flex flex-col items-center gap-2 mb-2">
                  <Dumbbell size={28} className="text-muted-foreground"/>
                  <p className="text-sm font-inter text-muted-foreground">Nenhum exercício adicionado</p>
                </div>
              : <div className="flex flex-col gap-2 mb-2">
                  {exs.map((ex,i)=>(
                    <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:AC_BG("personal",0.15)}}>
                          <Dumbbell size={14} style={{color:ac}}/>
                        </div>
                        <span className="text-sm font-inter font-medium text-foreground truncate">{ex}</span>
                      </div>
                      <button onClick={()=>setExs(p=>p.filter((_,j)=>j!==i))} aria-label={`Remover ${ex}`}>
                        <X size={16} className="text-muted-foreground hover:text-destructive transition-colors"/>
                      </button>
                    </div>
                  ))}
                </div>
            }
            {errs.ex&&<p className="text-xs text-destructive mb-2">{errs.ex}</p>}
            <button onClick={()=>setShowModal(true)}
              className="w-full h-12 rounded-2xl border border-dashed border-border flex items-center justify-center gap-2 text-sm font-inter font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-all">
              <Plus size={18}/> Adicionar exercício
            </button>
          </div>
          <button onClick={save} disabled={!canSave}
            className="w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            style={{background:canSave?ac:"#2a2a2a"}} aria-disabled={!canSave}>
            <Check size={20}/> Salvar treino
          </button>
          {!canSave&&<p className="text-xs text-muted-foreground text-center font-inter">Preencha nome, categoria e adicione ao menos 1 exercício.</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Workouts ─────────────────────────────────────────────────────────────────

function Workouts({ onSelect,ut }:{onSelect:(w:Workout)=>void;ut:UserType}) {
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("Todos");
  const ac=AC(ut);
  const list=WORKOUTS.filter(w=>w.name.toLowerCase().includes(search.toLowerCase())&&(filter==="Todos"||w.goal===filter));
  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="px-6 pt-14 pb-4">
        <h1 className="font-montserrat font-bold text-3xl text-foreground mb-0.5">Treinos</h1>
        <p className="text-muted-foreground text-sm font-inter">{ut==="personal"?"Gerencie rotinas e programas":"Suas rotinas disponíveis"}</p>
      </div>
      <div className="px-6 mb-4">
        {ut==="personal"
          ? <div className="grid grid-cols-2 gap-3">
              <button className="h-12 rounded-2xl border border-border flex items-center justify-center gap-2 text-foreground hover:border-primary transition-all font-inter font-semibold text-sm"><Plus size={18}/> Nova Rotina</button>
              <button className="h-12 rounded-2xl flex items-center justify-center gap-2 text-black font-inter font-semibold text-sm" style={{background:ac}}><Search size={18}/> Explorar</button>
            </div>
          : <button className="w-full h-12 rounded-2xl border border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-all font-inter font-semibold text-sm">
              <Play size={18}/> Iniciar Treinamento Livre
            </button>
        }
      </div>
      <div className="px-6 mb-3">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-12">
          <Search size={18} className="text-muted-foreground"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar treino..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-inter outline-none" aria-label="Buscar treino"/>
          {search&&<button onClick={()=>setSearch("")} aria-label="Limpar"><X size={16} className="text-muted-foreground"/></button>}
        </div>
      </div>
      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {["Todos","Hipertrofia","Emagrecimento","Condicionamento"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all ${filter===f?"text-black":"bg-card border border-border text-muted-foreground"}`}
              style={filter===f?{background:ac}:undefined} aria-pressed={filter===f}>{f}</button>
          ))}
        </div>
      </div>
      <div className="px-6 flex flex-col gap-3">
        <p className="font-montserrat font-semibold text-sm text-foreground">
          {ut==="personal"?"Modelos de treino":"Minhas rotinas"}{filter!=="Todos"&&` · ${filter}`}
        </p>
        {list.length===0
          ? <div className="flex flex-col items-center gap-3 py-12"><Dumbbell size={40} className="text-muted-foreground"/><p className="font-inter text-muted-foreground text-center">Nenhum treino encontrado.</p></div>
          : list.map(w=>(
            <div key={w.id} className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-montserrat font-bold text-lg text-foreground">{w.name}</h3>
                    <Badge status={w.status}/>
                  </div>
                  <p className="text-sm font-inter text-muted-foreground">{w.goal}</p>
                </div>
                <button className="text-muted-foreground p-1 flex-shrink-0" aria-label="Mais opções"><MoreVertical size={18}/></button>
              </div>
              <div className="flex items-center gap-4 text-xs font-inter text-muted-foreground">
                <span className="flex items-center gap-1"><Dumbbell size={12}/>{w.exerciseCount} exercícios</span>
                <span className="flex items-center gap-1"><Clock size={12}/>{w.duration}</span>
              </div>
              <button onClick={()=>onSelect(w)}
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-inter font-semibold text-sm text-black transition-all active:scale-95"
                style={{background:ac}}>
                {ut==="personal"?<><ClipboardList size={16}/> Atribuir ao aluno</>:<><Play size={16}/> Iniciar Rotina</>}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── Workout Detail ───────────────────────────────────────────────────────────

function WorkoutDetail({ workout,onBack,onToast,ut }:
  {workout:Workout;onBack:()=>void;onToast:(msg:string,t:"success"|"error"|"info")=>void;ut:UserType}) {
  const [exs,setExs]=useState(workout.exercises);
  const [cf,setCf]=useState("Volume");
  const ac=AC(ut);
  const done=exs.filter(e=>e.completed).length;
  const pct=exs.length?(done/exs.length)*100:0;
  const toggle=(id:string)=>setExs(p=>p.map(e=>{if(e.id!==id)return e;onToast(e.completed?"Exercício desmarcado.":"Exercício marcado como concluído.","success");return {...e,completed:!e.completed};}));
  const finish=()=>{
    if(!done){onToast("Conclua ao menos um exercício antes de finalizar.","error");return;}
    onToast(done<exs.length?`Treino finalizado com ${done} de ${exs.length} exercícios.`:"Treino concluído com sucesso.",done<exs.length?"info":"success");
  };
  const chartData=[{w:"S1",v:3200},{w:"S2",v:3800},{w:"S3",v:3600},{w:"S4",v:4500},{w:"S5",v:4100}];
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between mb-4">
          <BackBtn onClick={onBack}/>
          <p className="font-montserrat font-semibold text-sm text-muted-foreground">Rotina</p>
          <div className="flex gap-3">
            <button aria-label="Compartilhar"><Share2 size={20} className="text-muted-foreground"/></button>
            <button aria-label="Mais opções"><MoreVertical size={20} className="text-muted-foreground"/></button>
          </div>
        </div>
        <h1 className="font-montserrat font-bold text-3xl text-foreground">{workout.name}</h1>
        <p className="text-muted-foreground text-sm font-inter mt-1">Criado por TrainerX64 · {workout.goal}</p>
        <div className="mt-4 mb-1">
          <div className="flex justify-between text-xs font-inter text-muted-foreground mb-2"><span>Progresso</span><span>{done}/{exs.length} exercícios</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{width:`${pct}%`,background:ac}}
              role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${Math.round(pct)}%`}/>
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-xs font-inter text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={12}/>{workout.duration}</span>
          <span className="flex items-center gap-1"><Dumbbell size={12}/>{workout.exerciseCount} exercícios</span>
        </div>
      </div>
      <div className="px-6 mb-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <Caps items={["Volume","Repetições","Duração"]} active={cf} onChange={setCf} ut={ut}/>
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={90}>
              <LineChart data={chartData}>
                <XAxis dataKey="w" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis hide/>
                <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}}/>
                <Line type="monotone" dataKey="v" stroke={ac} strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="px-6 mb-4">
        <button onClick={finish}
          className="w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{background:ac}}>
          {ut==="personal"?<><ClipboardList size={20}/> Atribuir treino</>:<><Play size={20}/> Iniciar Rotina</>}
        </button>
      </div>
      <div className="px-6 flex flex-col gap-3">
        <p className="font-montserrat font-bold text-lg text-foreground">Exercícios</p>
        {exs.map(ex=>(
          <div key={ex.id} className="bg-card border rounded-2xl p-4 transition-all"
            style={{border:ex.completed?`1px solid ${ac}`:"1px solid #2a2a2a",background:ex.completed?AC_BG(ut,0.04):undefined}}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:AC_BG(ut,0.15)}}>
                  <Dumbbell size={20} style={{color:ac}}/>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-sm text-foreground">{ex.name}</h3>
                  <p className="text-xs font-inter text-muted-foreground mt-0.5">{ex.sets.length} séries</p>
                </div>
              </div>
              {ex.completed&&<CheckCircle size={20} style={{color:ac}} aria-label="Concluído"/>}
            </div>
            <div className="bg-background rounded-xl overflow-hidden mb-3" role="table" aria-label={`Séries de ${ex.name}`}>
              <div className="grid grid-cols-3 px-3 py-2 border-b border-border" role="row">
                {["Série","KG","Reps"].map(h=><span key={h} className="text-xs font-inter font-semibold text-muted-foreground text-center" role="columnheader">{h}</span>)}
              </div>
              {ex.sets.map(s=>(
                <div key={s.serie} className="grid grid-cols-3 px-3 py-2 border-b border-border last:border-0" role="row">
                  <span className="text-sm font-inter text-foreground text-center" role="cell">{s.serie}</span>
                  <span className="text-sm font-inter font-semibold text-foreground text-center" role="cell">{s.kg}</span>
                  <span className="text-sm font-inter text-foreground text-center" role="cell">{s.reps}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-10 rounded-xl border border-border flex items-center justify-center gap-1.5 text-xs font-inter font-semibold text-muted-foreground hover:border-accent hover:text-accent transition-all" aria-label={`Ver execução de ${ex.name}`}>
                <Play size={14}/> Ver execução
              </button>
              {ut==="aluno"&&(
                <button onClick={()=>toggle(ex.id)}
                  className="flex-1 h-10 rounded-xl flex items-center justify-center gap-1.5 text-xs font-inter font-semibold transition-all active:scale-95"
                  style={{background:ex.completed?"#2a2a2a":ac,color:ex.completed?"#a0a0a0":"#000"}} aria-pressed={ex.completed}>
                  <Check size={14}/> {ex.completed?"Desmarcar":"Concluído"}
                </button>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground font-inter mt-2 flex items-center gap-1">
              <Info size={10}/> Integração futura com Cloudinary para vídeos demonstrativos.
            </p>
          </div>
        ))}
        {ut==="aluno"&&<SBtn onClick={finish}>Finalizar treino</SBtn>}
      </div>
    </div>
  );
}

// ─── Evolution ────────────────────────────────────────────────────────────────

function Evolution({ ut }:{ut:UserType}) {
  const [period,setPeriod]=useState("Mês");
  const [form,setForm]=useState({peso:"",altura:"",cintura:"",braco:"",perna:"",obs:""});
  const [errs,setErrs]=useState<Record<string,string>>({});
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);
  const [hist,setHist]=useState([
    {date:"Jun 2026",peso:74.6,cintura:82,braco:38,perna:60},
    {date:"Mai 2026",peso:75.1,cintura:83,braco:37.5,perna:59.5},
    {date:"Abr 2026",peso:75.8,cintura:84,braco:37,perna:59},
  ]);
  const ac=AC(ut);
  const save=()=>{
    const e:Record<string,string>={};
    if(!form.peso||parseFloat(form.peso)<=0) e.peso="Peso inválido.";
    setErrs(e);
    if(Object.keys(e).length){setToast({msg:"Informe valores válidos para registrar sua evolução.",type:"error"});return;}
    setHist(p=>[{date:new Date().toLocaleDateString("pt-BR",{month:"short",year:"numeric"}),
      peso:parseFloat(form.peso),cintura:parseFloat(form.cintura)||0,
      braco:parseFloat(form.braco)||0,perna:parseFloat(form.perna)||0},...p]);
    setForm({peso:"",altura:"",cintura:"",braco:"",perna:"",obs:""});
    setToast({msg:"Evolução registrada com sucesso.",type:"success"});
  };
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div className="px-6 pt-14 pb-4">
        <h1 className="font-montserrat font-bold text-3xl text-foreground">{ut==="aluno"?"Progresso":"Avaliação Física"}</h1>
        <p className="text-muted-foreground text-sm font-inter mt-1">{ut==="aluno"?"Registre e acompanhe seu progresso físico.":"Registre e visualize a evolução dos alunos."}</p>
      </div>
      <div className="px-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Weight size={18}/>}   label="Peso atual"      value={`${hist[0]?.peso??"-"} kg`} color={ac}/>
          <StatCard icon={<Calendar size={18}/>} label="Último registro" value={hist[0]?.date??"-"}         color={ac}/>
          <StatCard icon={<Activity size={18}/>} label="Frequência"      value="3x" sub="Meta: 4x"          color={ac}/>
          <StatCard icon={<Zap size={18}/>}      label="Volume total"    value="17.8k kg"                   color={ac}/>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-montserrat font-semibold text-sm text-foreground mb-3">Evolução de peso</p>
          <Caps items={["Semana","Mês","3 meses","Ano"]} active={period} onChange={setPeriod} ut={ut}/>
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={110}>
              <LineChart data={MONTHS}>
                <XAxis dataKey="m" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis hide domain={["auto","auto"]}/>
                <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}}/>
                <Line type="monotone" dataKey="p" stroke={ac} strokeWidth={2.5} dot={false} name="Peso (kg)"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-montserrat font-bold text-sm text-foreground mb-4">{ut==="aluno"?"Registrar evolução":"Registrar avaliação"}</p>
          <div className="grid grid-cols-2 gap-3">
            {[{k:"peso",l:"Peso (kg)",p:"75.0"},{k:"altura",l:"Altura (cm)",p:"175"},{k:"cintura",l:"Cintura (cm)",p:"82"},{k:"braco",l:"Braço (cm)",p:"38"},{k:"perna",l:"Perna (cm)",p:"60"}].map(f=>(
              <div key={f.k} className="flex flex-col gap-1">
                <label className="text-xs font-montserrat font-semibold text-muted-foreground">{f.l}</label>
                <input type="number" value={form[f.k as keyof typeof form]} min="0"
                  onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p}
                  className={`h-11 rounded-xl bg-background border px-3 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-accent transition-colors ${errs[f.k]?"border-destructive":"border-border"}`}
                  aria-label={f.l}/>
              </div>
            ))}
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-xs font-montserrat font-semibold text-muted-foreground">Observações</label>
              <textarea value={form.obs} onChange={e=>setForm(p=>({...p,obs:e.target.value}))} placeholder="Observações opcionais..."
                className="rounded-xl bg-background border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-accent transition-colors resize-none"
                rows={2} aria-label="Observações"/>
            </div>
          </div>
          <button onClick={save}
            className="w-full h-12 rounded-2xl font-montserrat font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
            style={{background:ac}}>
            <Check size={18}/> {ut==="aluno"?"Salvar evolução":"Registrar avaliação"}
          </button>
        </div>
        <div>
          <p className="font-montserrat font-bold text-sm text-foreground mb-3">Histórico</p>
          {hist.map((e,i)=>(
            <div key={i} className="bg-card border border-border rounded-2xl px-4 py-3 mb-2 flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-montserrat font-semibold text-sm text-foreground">{e.date}</p>
                <p className="text-xs font-inter text-muted-foreground mt-0.5 truncate">Cintura:{e.cintura} · Braço:{e.braco} · Perna:{e.perna} cm</p>
              </div>
              <span className="text-2xl font-montserrat font-bold ml-4 flex-shrink-0" style={{color:ac}}>{e.peso}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

function Notifications({ ut }:{ut:UserType}) {
  const [notifs,setNotifs]=useState(NOTIFS);
  const [filter,setFilter]=useState("Todas");
  const ac=AC(ut);
  const list=notifs.filter(n=>{
    if(filter==="Todas") return true;
    if(filter==="Não lidas") return !n.read;
    if(filter==="Treinos") return n.type==="treino";
    if(filter==="Financeiro") return n.type==="financeiro";
    if(filter==="Mensagens") return n.type==="mensagem";
    return true;
  });
  const unread=notifs.filter(n=>!n.read).length;
  const icons:Record<string,React.ReactNode>={
    treino:<Dumbbell size={22} style={{color:ac}}/>,
    financeiro:<CreditCard size={22} className="text-yellow-400"/>,
    mensagem:<MessageCircle size={22} className="text-accent"/>,
    evolucao:<TrendingUp size={22} style={{color:ac}}/>,
  };
  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-foreground">Notificações</h1>
            {unread>0&&<p className="text-muted-foreground text-sm font-inter mt-0.5">{unread} não lida{unread>1?"s":""}</p>}
          </div>
          {unread>0&&<button onClick={()=>setNotifs(p=>p.map(n=>({...n,read:true})))} className="text-xs font-inter" style={{color:ac}}>Marcar todas</button>}
        </div>
      </div>
      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {["Todas","Não lidas","Treinos","Financeiro","Mensagens"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all ${filter===f?"text-black":"bg-card border border-border text-muted-foreground"}`}
              style={filter===f?{background:ac}:undefined} aria-pressed={filter===f}>{f}</button>
          ))}
        </div>
      </div>
      <div className="px-6 flex flex-col gap-2">
        {list.length===0
          ? <div className="flex flex-col items-center gap-3 py-12"><Bell size={40} className="text-muted-foreground"/><p className="font-inter text-muted-foreground text-center">Nenhuma notificação aqui.</p></div>
          : list.map(n=>(
            <div key={n.id} className="bg-card border rounded-2xl p-4 transition-all"
              style={{border:!n.read?`1px solid ${ac}`:"1px solid #2a2a2a",background:!n.read?AC_BG(ut,0.04):undefined}}
              role="article" aria-label={`${n.read?"Lida":"Não lida"}: ${n.title}`}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{background:"rgba(255,255,255,0.06)"}} aria-hidden="true">{icons[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-montserrat font-semibold text-sm text-foreground">{n.title}</p>
                    {!n.read&&<span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:ac}} aria-label="Não lida"/>}
                  </div>
                  <p className="text-xs font-inter text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] font-inter text-muted-foreground">{n.time}</span>
                    {!n.read&&<button onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}
                      className="text-[11px] font-inter" style={{color:ac}}>Marcar como lida</button>}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function ChatPage({ user, ut, onBack }: { user: AppUser; ut: UserType; onBack: () => void }) {
  const storageKey = `trainerx64-chat-${ut}`;
  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : CHAT_MOCK;
    } catch {
      return CHAT_MOCK;
    }
  });
  const [text, setText] = useState("");
  const ac = AC(ut);
  const otherName = ut === "personal" ? "Gustavo" : "Rafael";

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // fallback silencioso para MVP
    }
  }, [messages, storageKey]);

  const sendMessage = () => {
    const clean = text.trim();
    if (!clean) return;

    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg: ChatMsg = {
      id: `m-${Date.now()}`,
      from: ut,
      senderName: user.name,
      content: clean,
      time,
      read: false,
    };

    setMessages(prev => [...prev, msg]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-background pb-36 flex flex-col">
      <div className="px-6 pt-14 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <BackBtn onClick={onBack} />
          <p className="font-montserrat font-semibold text-sm text-muted-foreground">
            Chat integrado
          </p>
          <div className="w-[52px]" />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-black font-montserrat font-bold"
            style={{ background: ac }}
          >
            {otherName[0]}
          </div>
          <div>
            <h1 className="font-montserrat font-bold text-xl text-foreground">
              {ut === "personal" ? "Conversa com aluno" : "Conversa com personal"}
            </h1>
            <p className="text-xs text-muted-foreground font-inter">
              {otherName} · comunicação interna do TrainerX64
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-5 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageCircle size={42} className="text-muted-foreground mb-3" />
            <p className="text-muted-foreground font-inter text-sm">
              Nenhuma mensagem ainda.
            </p>
            <p className="text-muted-foreground font-inter text-xs mt-1">
              Envie uma mensagem para iniciar a conversa.
            </p>
          </div>
        ) : (
          messages.map(msg => {
            const mine = msg.from === ut;
            return (
              <div
                key={msg.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[78%] rounded-2xl px-4 py-3 border"
                  style={{
                    background: mine ? AC_BG(ut, 0.22) : "#1C1C1E",
                    borderColor: mine ? ac : "#2A2A2A",
                  }}
                >
                  <p className="text-[11px] font-inter text-muted-foreground mb-1">
                    {msg.senderName}
                  </p>
                  <p className="text-sm font-inter text-foreground leading-relaxed">
                    {msg.content}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] font-inter text-muted-foreground">
                      {msg.time}
                    </span>
                    {mine && <Check size={12} color={ac} />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6">
        <div className="bg-card border border-border rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-inter outline-none px-3"
            aria-label="Digite sua mensagem"
          />
          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
            style={{ background: text.trim() ? ac : "#2A2A2A" }}
            aria-label="Enviar mensagem"
          >
            <MessageCircle size={20} color={text.trim() ? "#000" : "#9CA3AF"} />
          </button>
        </div>
      </div>
    </div>
  );
}
function Profile({ user,onLogout }:{user:AppUser;onLogout:()=>void}) {
  const ac=AC(user.type);
  const [a11y,setA11y]=useState({altoContraste:false,textoAmpliado:false,leituraPorVoz:false,navegacaoSimplificada:false,feedbackSonoro:false});
  const [notifP,setNotifP]=useState({lembretes:true,atualizacoes:true,alertas:false});
  const [logoutModal,setLogoutModal]=useState(false);
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);
  const chartData=[{m:"Abr",v:12},{m:"Mai",v:15},{m:"Jun",v:14},{m:"Jul",v:18},{m:"Ago",v:16},{m:"Set",v:20}];
  const A11Y:[keyof typeof a11y,string][]=[
    ["altoContraste","Alto contraste"],["textoAmpliado","Texto ampliado"],
    ["leituraPorVoz","Leitura por voz"],["navegacaoSimplificada","Navegação simplificada"],
    ["feedbackSonoro","Feedback sonoro/vibratório"],
  ];
  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto" style={a11y.altoContraste?{filter:"contrast(1.4)"}:undefined}>
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      {logoutModal&&(
        <Modal title="Sair da conta" onClose={()=>setLogoutModal(false)}>
          <p className="mb-6">Tem certeza que deseja sair da sua conta TrainerX64?</p>
          <div className="flex gap-3">
            <SBtn onClick={()=>setLogoutModal(false)} className="flex-1">Cancelar</SBtn>
            <button onClick={()=>{setLogoutModal(false);onLogout();}}
              className="flex-1 h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center"
              style={{background:ac}}>Sair</button>
          </div>
        </Modal>
      )}
      <div className="px-6 pt-14 pb-5" style={{background:`linear-gradient(180deg,${AC_BG(user.type,0.1)} 0%,transparent 100%)`}}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center font-montserrat font-bold text-3xl text-black flex-shrink-0"
            style={{background:ac}}>{user.name[0]}</div>
          <div className="flex-1 min-w-0">
            <h1 className="font-montserrat font-bold text-2xl text-foreground">{user.name}</h1>
            <p className="text-sm font-inter text-muted-foreground truncate">{user.email}</p>
            <span className="inline-flex items-center mt-1 px-3 py-1 rounded-full text-xs font-inter font-bold text-black"
              style={{background:ac}}>{user.type==="personal"?"Personal Trainer":"Aluno"}</span>
          </div>
        </div>
        <button className="w-full h-11 rounded-2xl border font-inter font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          style={{border:`1px solid ${ac}`,color:ac}} onClick={()=>setToast({msg:"Perfil atualizado com sucesso.",type:"success"})}>
          Editar perfil
        </button>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {(user.type==="personal"
            ?[{l:"Alunos",v:"8"},{l:"Treinos",v:"48"},{l:"Avaliações",v:"12"}]
            :[{l:"Treinos",v:"12"},{l:"Sequência",v:"4"},{l:"Metas",v:"3"}]
          ).map(s=>(
            <div key={s.l} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="font-montserrat font-bold text-xl text-foreground">{s.v}</p>
              <p className="text-xs font-inter text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 flex flex-col gap-5">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-montserrat font-semibold text-sm text-foreground mb-3">Últimos 6 meses</p>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={chartData} barSize={16}>
              <XAxis dataKey="m" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}}/>
              <Bar dataKey="v" fill={ac} radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-montserrat font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-2">Notificações</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {([
              ["lembretes" as const,"Lembretes de treino","Alertas de rotina diária"],
              ["atualizacoes" as const,user.type==="personal"?"Atividade dos alunos":"Atualizações do personal","Progresso e novos treinos"],
              ["alertas" as const,"Alertas de progresso","Metas e recordes"],
            ] as [keyof typeof notifP,string,string][]).map(([k,label,sub],i,arr)=>(
              <div key={k} className={`flex items-center gap-4 px-4 py-3.5 ${i<arr.length-1?"border-b border-border":""}`}>
                <Bell size={18} className="text-muted-foreground"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-inter font-medium text-foreground">{label}</p>
                  <p className="text-xs font-inter text-muted-foreground">{sub}</p>
                </div>
                <Tog on={notifP[k]} toggle={()=>setNotifP(p=>({...p,[k]:!p[k]}))} label={label} color={ac}/>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-montserrat font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-2">Acessibilidade</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {A11Y.map(([k,label],i)=>(
              <div key={k} className={`flex items-center gap-4 px-4 py-3.5 ${i<A11Y.length-1?"border-b border-border":""}`}>
                <Settings size={18} className="text-muted-foreground"/>
                <span className="flex-1 text-sm font-inter font-medium text-foreground">{label}</span>
                <Tog on={a11y[k]} toggle={()=>setA11y(p=>({...p,[k]:!p[k]}))} label={label} color={ac}/>
              </div>
            ))}
          </div>
        </div>
        {[
          {title:"Conta",items:[{icon:<User size={18}/>,label:"Editar informações",sub:user.email},{icon:<Lock size={18}/>,label:"Alterar senha",sub:"Atualize sua senha"}]},
          {title:"Legal",items:[{icon:<FileText size={18}/>,label:"Termos de Uso",sub:"Jan 2026"},{icon:<Shield size={18}/>,label:"Política de Privacidade",sub:"LGPD compliant"},{icon:<Globe size={18}/>,label:"Idioma",sub:"Português (Brasil)"}]},
        ].map(group=>(
          <div key={group.title}>
            <p className="font-montserrat font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-2">{group.title}</p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {group.items.map((item,i)=>(
                <button key={item.label}
                  className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-all text-left ${i<group.items.length-1?"border-b border-border":""}`}>
                  <span className="text-muted-foreground w-7 flex items-center justify-center flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-inter font-medium text-foreground">{item.label}</p>
                    <p className="text-xs font-inter text-muted-foreground truncate">{item.sub}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground flex-shrink-0"/>
                </button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>setLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl border border-destructive text-destructive font-inter font-semibold text-sm hover:bg-destructive/10 transition-all">
          <LogOut size={18}/> Sair da conta
        </button>
      </div>
    </div>
  );
}

// ─── Modal Content ────────────────────────────────────────────────────────────

const TERMS_MD = (<><p className="mb-3"><strong className="text-foreground">1. Aceitação dos Termos</strong></p><p className="mb-3">Ao criar uma conta no TrainerX64, você concorda com estes Termos de Uso.</p><p className="mb-3"><strong className="text-foreground">2. Uso do Serviço</strong></p><p className="mb-3">O TrainerX64 é uma plataforma de gestão de treinos. O usuário é responsável pela veracidade das informações.</p><p className="mb-3"><strong className="text-foreground">3. Responsabilidade</strong></p><p>Consulte sempre um profissional antes de iniciar qualquer programa de exercícios.</p></>);
const PRIV_MD  = (<><p className="mb-3"><strong className="text-foreground">1. Dados Coletados</strong></p><p className="mb-3">Coletamos nome, e-mail, dados de treino e medidas físicas fornecidas voluntariamente.</p><p className="mb-3"><strong className="text-foreground">2. LGPD</strong></p><p>Em conformidade com a Lei 13.709/2018, você tem direito de acessar, corrigir e excluir seus dados.</p></>);

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen,setScreen]=useState<Screen>("welcome");
  const [user,setUser]=useState<AppUser|null>(null);
  const [selW,setSelW]=useState<Workout|null>(null);
  const [selS,setSelS]=useState<Student|null>(null);
  const [modal,setModal]=useState<"terms"|"privacy"|null>(null);
  const [gToast,setGToast]=useState<{msg:string;type:"success"|"error"|"info"}|null>(null);

  // Telas focadas (internas) não exibem a barra inferior
  const navScreens:Screen[]=["dashboard","alunos","workouts","evolution","notifications","chat","profile"];
  const ut=user?.type??"personal";
  const nav=(s:Screen)=>setScreen(s);

  return (
    <div className="min-h-screen bg-background" style={{fontFamily:"'Inter',sans-serif",maxWidth:"430px",margin:"0 auto",position:"relative"}}>
      {gToast&&<Toast message={gToast.msg} type={gToast.type} onClose={()=>setGToast(null)}/>}
      {modal==="terms"  &&<Modal title="Termos de Uso"          onClose={()=>setModal(null)}>{TERMS_MD}</Modal>}
      {modal==="privacy"&&<Modal title="Política de Privacidade" onClose={()=>setModal(null)}>{PRIV_MD}</Modal>}

      {screen==="welcome" && (
        <Welcome
          onContinue={()=>setScreen("login")}
          onLogin={()=>setScreen("login")}
        />
      )}
      {screen==="login" && (
        <Login
          onLogin={u=>{setUser(u);setScreen("dashboard");}}
          onRegister={()=>setScreen("register")}
          onShowModal={setModal}
          onBack={()=>setScreen("welcome")}
        />
      )}
      {screen==="register" &&<Register onDone={()=>setScreen("login")} onLogin={()=>setScreen("login")} onShowModal={setModal}/>}

      {screen==="dashboard"&&user&&(ut==="personal"?<PersonalDash user={user} onNav={nav}/>:<AlunoDash user={user} onNav={nav}/>)}

      {screen==="alunos"      &&ut==="personal"&&<AlunosList onSelect={s=>{setSelS(s);setScreen("aluno-detail");}}/>}
      {screen==="aluno-detail"&&selS           &&<AlunoDetail student={selS} onBack={()=>setScreen("alunos")} onNav={nav}/>}
      {screen==="criar-treino"                 &&<CriarTreino onBack={()=>setScreen(ut==="personal"?"workouts":"dashboard")}/>}

      {screen==="workouts"      &&<Workouts onSelect={w=>{setSelW(w);setScreen("workout-detail");}} ut={ut}/>}
      {screen==="workout-detail"&&selW&&<WorkoutDetail workout={selW} onBack={()=>setScreen("workouts")} onToast={(m,t)=>setGToast({msg:m,type:t})} ut={ut}/>}

      {screen==="evolution"    &&<Evolution ut={ut}/>}
      {screen==="notifications"&&<Notifications ut={ut}/>}

      {screen==="chat" && user && (
        <ChatPage
          user={user}
          ut={ut}
          onBack={() => setScreen("dashboard")}
        />
      )}
      {screen==="profile"      &&user&&<Profile user={user} onLogout={()=>{setUser(null);setScreen("welcome");}}/>}

      {navScreens.includes(screen)&&user&&<BottomNav active={screen} onNav={nav} ut={ut}/>}
    </div>
  );
}
