import {
  treinoExercicioService,
  type TreinoExercicio,
  type AdicionarExercicioTreinoDTO,
  type AtualizarExercicioTreinoDTO,
} from "../services/treinoExercicioService";

import { 
  mensalidadeService,
  type Mensalidade,
} from "../services/mensalidadeService";

import {
  exercicioService,
  type Exercicio,
  type CategoriaExercicio,
  type CriarExercicioDTO,
  type AtualizarExercicioDTO,
} from "../services/exercicioService";
import {
  treinoService,
  type Treino,
  type StatusTreino,
  type CriarTreinoDTO,
  type AtualizarTreinoDTO,
} from "../services/treinoService";

import {
  alunoService,
  type AtualizarAlunoDTO,
  type CriarAlunoDTO,
  type StatusAluno,
} from "../services/alunoService";
import {
  avaliacaoService,
  type AvaliacaoFisica,
  type CriarAvaliacaoDTO,
  type AtualizarAvaliacaoDTO,
} from "../services/avaliacaoService";
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
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "em-dia" | "pendente" | "mensalidade" | "sem-atividade";
  workout?: string;
  lastSeen: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
  level: string;
}
interface Notif {
  id: string; type: "treino" | "financeiro" | "mensagem" | "evolucao";
  title: string; description: string; time: string; read: boolean;
}

interface RegisterStepOneData {
  name: string;
  email: string;
  pw: string;
  confirm: string;
}

interface RegisterStepTwoData {
  atype: UserType | "";
  goal: string;
  terms: boolean;
}

function validateRegisterStepOne(data: RegisterStepOneData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Nome obrigatório.";
  }

  if (!data.email) {
    errors.email = "E-mail obrigatório.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "E-mail inválido.";
  }

  if (!data.pw) {
    errors.pw = "Senha obrigatória.";
  } else if (data.pw.length < 6) {
    errors.pw = "Mínimo 6 caracteres.";
  }

  if (data.pw !== data.confirm) {
    errors.confirm = "As senhas não conferem.";
  }

  return errors;
}

function validateRegisterStepTwo(data: RegisterStepTwoData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.atype) {
    errors.atype = "Selecione o tipo.";
  }

  if (!data.goal) {
    errors.goal = "Selecione um objetivo.";
  }

  if (!data.terms) {
    errors.terms = "Aceite os Termos de Uso e a Política de Privacidade.";
  }

  return errors;
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
  { id:"s1", name:"Gustavo", email:"gustavo@trainerx64.local", phone:"92999990001", status:"em-dia",        workout:"Upper",     lastSeen:"Hoje",   weight:82, height:178, age:27, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s2", name:"Serena", email:"serena@trainerx64.local", phone:"92999990002", status:"pendente",      workout:"Full Body", lastSeen:"Ontem",  weight:65, height:165, age:24, goal:"Emagrecimento",  level:"Iniciante"     },
  { id:"s3", name:"Gabriel", email:"gabriel@trainerx64.local", phone:"92999990003", status:"mensalidade",   workout:"Pull 1",    lastSeen:"3 dias", weight:75, height:172, age:30, goal:"Condicionamento",level:"Avançado"      },
  { id:"s4", name:"Lucas", email:"lucas@trainerx64.local", phone:"92999990004", status:"sem-atividade", workout:"Leg Day",   lastSeen:"7 dias", weight:90, height:182, age:32, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s5", name:"Carla", email:"carla@trainerx64.local", phone:"92999990005", status:"em-dia",        workout:"Push 2",    lastSeen:"Hoje",   weight:58, height:160, age:26, goal:"Saúde",          level:"Iniciante"     },
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

  const v1 = () => {
  const errors = validateRegisterStepOne({
    name,
    email,
    pw,
    confirm,
  });

  setErrs(errors);
  return Object.keys(errors).length === 0;
};

  const v2 = () => {
  const errors = validateRegisterStepTwo({
    atype,
    goal,
    terms,
  });

  setErrs(errors);
  return Object.keys(errors).length === 0;
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

function PersonalDash({ user,onNav,students }:{user:AppUser;onNav:(s:Screen)=>void;students:Student[]}) {
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
          <StatCard icon={<Users size={18}/>}        label="Alunos ativos"  value={String(students.length)}  color={ac}/>
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
          {students.slice(0,4).map(s=>(
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

// ─── Formulário de Aluno ──────────────────────────────────────────────────────

function StudentInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-montserrat font-semibold text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-2xl bg-card border border-border px-4 text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function StudentForm({
  student,
  saving,
  onCancel,
  onSubmit,
}: {
  student?: Student | null;
  saving: boolean;
  onCancel: () => void;
  onSubmit: (
    data: CriarAlunoDTO | AtualizarAlunoDTO,
  ) => Promise<boolean>;
}) {
  const [nome, setNome] = useState(student?.name ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [telefone, setTelefone] = useState(student?.phone ?? "");
  const [status, setStatus] = useState<StatusAluno>(
    student?.status ?? "em-dia",
  );
  const [treino, setTreino] = useState(student?.workout ?? "");
  const [objetivo, setObjetivo] = useState(student?.goal ?? "");
  const [nivel, setNivel] = useState(student?.level ?? "Iniciante");
  const [peso, setPeso] = useState(student?.weight?.toString() ?? "");
  const [altura, setAltura] = useState(student?.height?.toString() ?? "");
  const [idade, setIdade] = useState(student?.age?.toString() ?? "");
  const [error, setError] = useState("");

  const ac = AC("personal");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (
      !nome.trim() ||
      !email.trim() ||
      !objetivo.trim() ||
      !nivel.trim() ||
      !peso ||
      !altura ||
      !idade
    ) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (
      Number(peso) <= 0 ||
      Number(altura) <= 0 ||
      Number(idade) <= 0
    ) {
      setError("Peso, altura e idade devem ser maiores que zero.");
      return;
    }

    const sucesso = await onSubmit({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim() || undefined,
      status,
      treino: treino.trim() || undefined,
      objetivo: objetivo.trim(),
      nivel,
      peso: Number(peso),
      altura: Number(altura),
      idade: Number(idade),
    });

    if (sucesso) {
      onCancel();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={student ? "Editar aluno" : "Cadastrar aluno"}
    >
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl bg-background border border-border p-6 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-foreground">
              {student ? "Editar aluno" : "Novo aluno"}
            </h2>
            <p className="text-sm text-muted-foreground font-inter mt-1">
              {student
                ? "Atualize os dados cadastrados."
                : "Preencha os dados para cadastrar um novo aluno."}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="w-11 h-11 rounded-2xl bg-card border border-border flex items-center justify-center text-muted-foreground disabled:opacity-50"
            aria-label="Fechar formulário"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <StudentInput
            label="Nome completo"
            value={nome}
            onChange={setNome}
            required
          />

          <StudentInput
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />

          <StudentInput
            label="Telefone"
            value={telefone}
            onChange={setTelefone}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-montserrat font-semibold text-muted-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as StatusAluno)
              }
              className="h-14 w-full rounded-2xl bg-card border border-border px-4 text-foreground outline-none focus:border-accent"
            >
              <option value="em-dia">Em dia</option>
              <option value="pendente">Avaliação pendente</option>
              <option value="mensalidade">Mensalidade</option>
              <option value="sem-atividade">Sem atividade</option>
            </select>
          </div>

          <StudentInput
            label="Treino atual"
            value={treino}
            onChange={setTreino}
          />

          <StudentInput
            label="Objetivo"
            value={objetivo}
            onChange={setObjetivo}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-montserrat font-semibold text-muted-foreground">
              Nível
            </label>
            <select
              value={nivel}
              onChange={(event) => setNivel(event.target.value)}
              className="h-14 w-full rounded-2xl bg-card border border-border px-4 text-foreground outline-none focus:border-accent"
            >
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StudentInput
              label="Peso (kg)"
              type="number"
              min={1}
              value={peso}
              onChange={setPeso}
              required
            />
            <StudentInput
              label="Altura (cm)"
              type="number"
              min={1}
              value={altura}
              onChange={setAltura}
              required
            />
            <StudentInput
              label="Idade"
              type="number"
              min={1}
              value={idade}
              onChange={setIdade}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <SBtn onClick={onCancel}>Cancelar</SBtn>
            <button
              type="submit"
              disabled={saving}
              className="h-14 rounded-2xl font-montserrat font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              style={{ background: saving ? "#2a2a2a" : ac }}
            >
              {saving ? (
                <>
                  <RefreshCw size={18} className="animate-spin text-white" />
                  <span className="text-white">Salvando...</span>
                </>
              ) : student ? (
                "Salvar alterações"
              ) : (
                "Cadastrar aluno"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Alunos List ──────────────────────────────────────────────────────────────

function AlunosList({
  students,
  loading,
  onSelect,
  onCreateStudent,
}: {
  students: Student[];
  loading: boolean;
  onSelect: (student: Student) => void;
  onCreateStudent: () => void;
}) {
  const [filter,setFilter]=useState("Todos");
  const [search,setSearch]=useState("");
  const ac=AC("personal");
  const SM:Record<string,string>={"Em dia":"em-dia","Pendente":"pendente","Mensalidade":"mensalidade"};
  const list=students.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())&&(filter==="Todos"||s.status===SM[filter]));

  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="px-6 pt-14 pb-4" style={{background:"linear-gradient(180deg,rgba(0,230,118,0.06) 0%,transparent 100%)"}}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-montserrat font-bold text-3xl text-foreground">Meus Alunos</h1>
          <button
            onClick={onCreateStudent}
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-black transition-all active:scale-95"
            style={{background:ac}}
            aria-label="Cadastrar novo aluno"
            title="Cadastrar novo aluno"
          >
            <UserPlus size={20}/>
          </button>
        </div>
        <p className="text-muted-foreground text-sm font-inter">{students.length} alunos cadastrados</p>
      </div>

      <div className="px-6 mb-3">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-12">
          <Search size={18} className="text-muted-foreground"/>
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar aluno..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-inter outline-none"
            aria-label="Buscar aluno"
          />
          {search&&<button onClick={()=>setSearch("")} aria-label="Limpar"><X size={16} className="text-muted-foreground"/></button>}
        </div>
      </div>

      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {["Todos","Em dia","Pendente","Mensalidade"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all ${filter===f?"text-black":"bg-card border border-border text-muted-foreground"}`}
              style={filter===f?{background:ac}:undefined}
              aria-pressed={filter===f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-2">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <RefreshCw size={32} className="text-muted-foreground animate-spin"/>
            <p className="font-inter text-muted-foreground text-center">Carregando alunos...</p>
          </div>
        ) : list.length===0 ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <Users size={40} className="text-muted-foreground"/>
            <p className="font-inter text-muted-foreground text-center">Nenhum aluno encontrado.</p>
          </div>
        ) : list.map(s=>(
          <button
            key={s.id}
            onClick={()=>onSelect(s)}
            className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between w-full hover:border-primary transition-all text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-montserrat font-bold text-sm text-black flex-shrink-0"
                style={{background:s.status==="em-dia"?ac:s.status==="pendente"?"#f59e0b":s.status==="mensalidade"?"#ef4444":"#2a2a2a"}}
              >
                {s.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-montserrat font-bold text-sm text-foreground">{s.name}</p>
                <p className="text-xs font-inter text-muted-foreground truncate">
                  {s.workout || "Sem treino"} · Visto {s.lastSeen}
                </p>
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

function AlunoDetail({
  student,
  onBack,
  onNav,
  onEdit,
  onDelete,
  onOpenEvaluations,
  onOpenFinance,
  deleting,
}: {
  student: Student;
  onBack: () => void;
  onNav: (s: Screen) => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpenEvaluations: () => void;
  onOpenFinance: () => void;
  deleting: boolean;
}) {
  const ac=AC("personal");
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"|"info"}|null>(null);

  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between mb-6">
          <BackBtn onClick={onBack}/>
          <p className="font-montserrat font-semibold text-sm text-muted-foreground">Perfil do Aluno</p>
          <button onClick={onEdit} aria-label="Editar aluno" title="Editar aluno">
            <Settings size={20} className="text-muted-foreground"/>
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-montserrat font-bold text-2xl text-black flex-shrink-0"
            style={{background:ac}}
          >
            {student.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-montserrat font-bold text-xl text-foreground">{student.name}</h1>
            <Badge status={student.status}/>
            <p className="text-xs font-inter text-muted-foreground mt-1">
              Treino: {student.workout || "Sem treino vinculado"}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 mb-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} style={{color:ac}}/>
            <span className="break-all">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User size={16} style={{color:ac}}/>
            <span>{student.phone || "Telefone não informado"}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard icon={<Weight size={16}/>} label="Peso" value={`${student.weight} kg`} color={ac}/>
          <StatCard icon={<Ruler size={16}/>} label="Altura" value={`${student.height} cm`} color={ac}/>
          <StatCard icon={<User size={16}/>} label="Idade" value={`${student.age} anos`} color={ac}/>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatCard icon={<Star size={16}/>} label="Nível" value={student.level} color={ac}/>
          <StatCard icon={<Target size={16}/>} label="Objetivo" value={student.goal} color={ac}/>
          <StatCard icon={<Activity size={16}/>} label="Visto" value={student.lastSeen} color={ac}/>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {icon:<Plus size={18}/>,label:"Criar treino",action:()=>onNav("criar-treino")},
            {icon:<TrendingUp size={18}/>,label:"Ver evolução",action:onOpenEvaluations},
            {icon:<ClipboardList size={18}/>,label:"Reg. avaliação",action:onOpenEvaluations},
            { icon: <CreditCard size={18} />, label: "Mensalidade", action: onOpenFinance },
          ].map(a=>(
            <button
              key={a.label}
              onClick={a.action}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-primary transition-all text-left"
            >
              <span style={{color:ac}}>{a.icon}</span>
              <span className="text-sm font-inter font-medium text-foreground leading-tight">{a.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="w-full h-14 rounded-2xl font-montserrat font-bold text-base text-black flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{background:ac}}
          >
            <Settings size={19}/> Editar aluno
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="w-full h-14 rounded-2xl font-montserrat font-bold text-base border border-destructive text-destructive flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {deleting ? (
              <RefreshCw size={19} className="animate-spin"/>
            ) : (
              <X size={19}/>
            )}
            {deleting ? "Excluindo..." : "Excluir aluno"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Criar Treino ─────────────────────────────────────────────────────────────

type ExercicioSelecionadoForm = AdicionarExercicioTreinoDTO;

function CriarTreino({
  onBack,
  exercicios,
  loadingExercicios,
  saving,
  onSubmit,
}: {
  onBack: () => void;
  exercicios: Exercicio[];
  loadingExercicios: boolean;
  saving: boolean;
  onSubmit: (
    treino: CriarTreinoDTO,
    exercicios: AdicionarExercicioTreinoDTO[],
  ) => Promise<boolean>;
}) {
  const [wname, setWname] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [desc, setDesc] = useState("");
  const [duracao, setDuracao] = useState("");
  const [status, setStatus] = useState<StatusTreino>("disponivel");
  const [selecionados, setSelecionados] = useState<ExercicioSelecionadoForm[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [exSearch, setExSearch] = useState("");
  const [exFilter, setExFilter] = useState("Todos");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const ac = AC("personal");

  const filtered = exercicios.filter((exercicio) =>
    exercicio.nome.toLowerCase().includes(exSearch.toLowerCase()) &&
    (exFilter === "Todos" || exercicio.categoria === exFilter)
  );

  function adicionarExercicio(exercicio: Exercicio) {
    if (selecionados.some((item) => item.exercicioId === exercicio.id)) {
      return;
    }

    setSelecionados((prev) => [
      ...prev,
      {
        exercicioId: exercicio.id,
        ordem: prev.length + 1,
        series: 3,
        repeticoes: 10,
        carga: 0,
      },
    ]);
    setShowModal(false);
  }

  function atualizarSelecionado(
    exercicioId: string,
    campo: "series" | "repeticoes" | "carga",
    valor: number,
  ) {
    setSelecionados((prev) =>
      prev.map((item) =>
        item.exercicioId === exercicioId
          ? { ...item, [campo]: valor }
          : item,
      ),
    );
  }

  function removerSelecionado(exercicioId: string) {
    setSelecionados((prev) =>
      prev
        .filter((item) => item.exercicioId !== exercicioId)
        .map((item, index) => ({ ...item, ordem: index + 1 })),
    );
  }

  async function save() {
    const errors: Record<string, string> = {};

    if (!wname.trim()) errors.wname = "Nome obrigatório.";
    if (!objetivo.trim()) errors.objetivo = "Objetivo obrigatório.";
    if (duracao && (!Number.isInteger(Number(duracao)) || Number(duracao) <= 0)) {
      errors.duracao = "A duração deve ser um número inteiro maior que zero.";
    }
    if (!selecionados.length) errors.ex = "Adicione ao menos 1 exercício.";
    if (
      selecionados.some(
        (item) =>
          item.series < 1 ||
          item.repeticoes < 1 ||
          (item.carga !== undefined && item.carga < 0),
      )
    ) {
      errors.ex = "Revise séries, repetições e carga dos exercícios.";
    }

    setErrs(errors);
    if (Object.keys(errors).length) return;

    const sucesso = await onSubmit(
      {
        nome: wname.trim(),
        objetivo: objetivo.trim(),
        descricao: desc.trim() || undefined,
        duracao: duracao ? Number(duracao) : undefined,
        status,
      },
      selecionados,
    );

    if (sucesso) onBack();
  }

  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black/80 flex items-end justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-5 pb-10" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-montserrat font-bold text-xl text-foreground">Selecionar exercício</h2>
              <button onClick={() => setShowModal(false)} aria-label="Fechar"><X size={24} className="text-muted-foreground"/></button>
            </div>

            <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 h-11 mb-3">
              <Search size={16} className="text-muted-foreground"/>
              <input
                value={exSearch}
                onChange={(event) => setExSearch(event.target.value)}
                placeholder="Buscar exercício..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                aria-label="Buscar exercício"
              />
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {["Todos", "Peito", "Costas", "Pernas", "Braços", "Ombros", "Abdômen", "Glúteos", "Panturrilha", "Outro"].map((filtro) => (
                <button
                  key={filtro}
                  onClick={() => setExFilter(filtro)}
                  className={`px-3 py-1.5 rounded-full text-xs font-inter font-medium whitespace-nowrap transition-all ${exFilter === filtro ? "text-black" : "bg-muted text-muted-foreground"}`}
                  style={exFilter === filtro ? { background: ac } : undefined}
                  aria-pressed={exFilter === filtro}
                >
                  {filtro}
                </button>
              ))}
            </div>

            {loadingExercicios ? (
              <div className="flex flex-col items-center gap-2 py-8">
                <RefreshCw size={22} className="animate-spin text-muted-foreground"/>
                <p className="text-xs text-muted-foreground font-inter">Buscando exercícios no banco...</p>
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">Nenhum exercício encontrado.</p>
            ) : (
              filtered.map((exercicio) => {
                const adicionado = selecionados.some((item) => item.exercicioId === exercicio.id);
                return (
                  <button
                    key={exercicio.id}
                    disabled={adicionado}
                    onClick={() => adicionarExercicio(exercicio)}
                    className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 py-3 text-left hover:border-primary transition-all w-full mb-2 disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: AC_BG("personal", 0.15) }}>
                      <Dumbbell size={18} style={{ color: ac }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-semibold text-sm text-foreground">{exercicio.nome}</p>
                      <p className="text-xs text-muted-foreground font-inter truncate">{exercicio.descricao || "Sem descrição"}</p>
                    </div>
                    {adicionado ? <Check size={16} style={{ color: ac }}/> : <Plus size={16} className="text-muted-foreground"/>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <BackBtn onClick={onBack}/>
          <div>
            <h1 className="font-montserrat font-bold text-2xl text-foreground">Criar treino</h1>
            <p className="text-xs text-muted-foreground font-inter mt-1">Os dados serão salvos no PostgreSQL.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Fld label="Nome do treino *" value={wname} onChange={setWname} placeholder="Ex: Upper A" error={errs.wname} icon={<Dumbbell size={18}/>}/>
          <Fld label="Objetivo *" value={objetivo} onChange={setObjetivo} placeholder="Ex: Hipertrofia" error={errs.objetivo} icon={<Target size={18}/>}/>
          <Fld label="Duração estimada (min)" value={duracao} onChange={setDuracao} placeholder="Ex: 65" type="number" error={errs.duracao} icon={<Clock size={18}/>}/>

          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-2">Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusTreino)}
              className="h-14 w-full rounded-2xl bg-card border border-border px-4 text-foreground outline-none focus:border-primary"
            >
              <option value="disponivel">Disponível</option>
              <option value="andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-2">Descrição</label>
            <textarea
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              placeholder="Objetivo, observações..."
              className="w-full rounded-2xl bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-montserrat font-semibold text-muted-foreground">Exercícios *</label>
              <span className="text-xs font-inter text-muted-foreground">{selecionados.length} adicionado{selecionados.length !== 1 ? "s" : ""}</span>
            </div>

            {selecionados.length === 0 ? (
              <div className="bg-card border border-dashed border-border rounded-2xl py-8 flex flex-col items-center gap-2 mb-2">
                <Dumbbell size={28} className="text-muted-foreground"/>
                <p className="text-sm font-inter text-muted-foreground">Nenhum exercício adicionado</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mb-2">
                {selecionados.map((item) => {
                  const exercicio = exercicios.find((ex) => ex.id === item.exercicioId);
                  if (!exercicio) return null;

                  return (
                    <div key={item.exercicioId} className="bg-card border border-border rounded-2xl p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <p className="font-inter font-semibold text-sm text-foreground truncate">{item.ordem}. {exercicio.nome}</p>
                          <p className="text-xs text-muted-foreground">{exercicio.categoria}</p>
                        </div>
                        <button onClick={() => removerSelecionado(item.exercicioId)} aria-label={`Remover ${exercicio.nome}`}>
                          <X size={18} className="text-destructive"/>
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[11px] text-muted-foreground">Séries</label>
                          <input
                            type="number"
                            min={1}
                            value={item.series}
                            onChange={(event) => atualizarSelecionado(item.exercicioId, "series", Number(event.target.value))}
                            className="w-full h-10 rounded-xl bg-background border border-border px-3 text-foreground outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-muted-foreground">Reps</label>
                          <input
                            type="number"
                            min={1}
                            value={item.repeticoes}
                            onChange={(event) => atualizarSelecionado(item.exercicioId, "repeticoes", Number(event.target.value))}
                            className="w-full h-10 rounded-xl bg-background border border-border px-3 text-foreground outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-muted-foreground">Carga</label>
                          <input
                            type="number"
                            min={0}
                            step="0.5"
                            value={item.carga ?? 0}
                            onChange={(event) => atualizarSelecionado(item.exercicioId, "carga", Number(event.target.value))}
                            className="w-full h-10 rounded-xl bg-background border border-border px-3 text-foreground outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {errs.ex && <p className="text-xs text-destructive mb-2">{errs.ex}</p>}
            <button
              onClick={() => setShowModal(true)}
              className="w-full h-12 rounded-2xl border border-dashed border-border flex items-center justify-center gap-2 text-sm font-inter font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <Plus size={18}/> Adicionar exercício
            </button>
          </div>

          <PBtn onClick={save} loading={saving} disabled={saving} ut="personal">
            <Check size={18}/> Salvar treino e exercícios
          </PBtn>
        </div>
      </div>
    </div>
  );
}

// ─── Gerenciador de Exercícios ────────────────────────────────────────────────

function ExerciseManagerModal({
  exercicios,
  saving,
  deleting,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: {
  exercicios: Exercicio[];
  saving: boolean;
  deleting: boolean;
  onClose: () => void;
  onCreate: (data: CriarExercicioDTO) => Promise<boolean>;
  onUpdate: (id: string, data: AtualizarExercicioDTO) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}) {
  const categorias: CategoriaExercicio[] = ["Peito", "Costas", "Pernas", "Braços", "Ombros", "Abdômen", "Glúteos", "Panturrilha", "Outro"];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<CategoriaExercicio>("Peito");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [search, setSearch] = useState("");

  const lista = exercicios.filter((exercicio) =>
    exercicio.nome.toLowerCase().includes(search.toLowerCase()),
  );

  function limparFormulario() {
    setEditingId(null);
    setNome("");
    setCategoria("Peito");
    setDescricao("");
    setErro("");
  }

  function iniciarEdicao(exercicio: Exercicio) {
    setEditingId(exercicio.id);
    setNome(exercicio.nome);
    setCategoria(exercicio.categoria);
    setDescricao(exercicio.descricao ?? "");
    setErro("");
  }

  async function salvar() {
    if (!nome.trim()) {
      setErro("Informe o nome do exercício.");
      return;
    }

    const data = {
      nome: nome.trim(),
      categoria,
      descricao: descricao.trim() || undefined,
    };

    const sucesso = editingId
      ? await onUpdate(editingId, data)
      : await onCreate(data);

    if (sucesso) limparFormulario();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={onClose}>
      <div className="bg-background rounded-t-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 pb-10 border border-border" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-montserrat font-bold text-xl text-foreground">Gerenciar exercícios</h2>
            <p className="text-xs text-muted-foreground mt-1">CRUD real de exercícios.</p>
          </div>
          <button onClick={onClose} aria-label="Fechar"><X size={24} className="text-muted-foreground"/></button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 mb-5 flex flex-col gap-3">
          <p className="font-montserrat font-semibold text-sm text-foreground">{editingId ? "Editar exercício" : "Novo exercício"}</p>
          <Fld label="Nome" value={nome} onChange={setNome} placeholder="Ex: Supino inclinado"/>
          <div>
            <label className="text-sm font-montserrat font-semibold text-muted-foreground block mb-1.5">Categoria</label>
            <select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value as CategoriaExercicio)}
              className="h-14 w-full rounded-2xl bg-background border border-border px-4 text-foreground outline-none"
            >
              {categorias.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <Fld label="Descrição" value={descricao} onChange={setDescricao} placeholder="Descrição técnica opcional"/>
          {erro && <p className="text-xs text-destructive">{erro}</p>}
          <div className="grid grid-cols-2 gap-2">
            {editingId ? <SBtn onClick={limparFormulario}>Cancelar edição</SBtn> : <SBtn onClick={onClose}>Fechar</SBtn>}
            <PBtn onClick={salvar} loading={saving} ut="personal">{editingId ? "Atualizar" : "Cadastrar"}</PBtn>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-12 mb-3">
          <Search size={18} className="text-muted-foreground"/>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar exercício..." className="flex-1 bg-transparent text-foreground outline-none text-sm"/>
        </div>

        <div className="flex flex-col gap-2">
          {lista.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhum exercício cadastrado.</p>
          ) : lista.map((exercicio) => (
            <div key={exercicio.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-inter font-semibold text-sm text-foreground">{exercicio.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">{exercicio.categoria} · {exercicio.descricao || "Sem descrição"}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => iniciarEdicao(exercicio)} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center" aria-label={`Editar ${exercicio.nome}`}>
                    <Settings size={16} className="text-accent"/>
                  </button>
                  <button disabled={deleting} onClick={() => onDelete(exercicio.id)} className="w-9 h-9 rounded-xl border border-destructive flex items-center justify-center disabled:opacity-50" aria-label={`Excluir ${exercicio.nome}`}>
                    <X size={16} className="text-destructive"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Workouts ─────────────────────────────────────────────────────────────────

function Workouts({
  treinos,
  loading,
  exercicios,
  savingExercicio,
  deletingExercicio,
  onSelect,
  onCreateWorkout,
  onCreateExercicio,
  onUpdateExercicio,
  onDeleteExercicio,
  ut,
}: {
  treinos: Treino[];
  loading: boolean;
  exercicios: Exercicio[];
  savingExercicio: boolean;
  deletingExercicio: boolean;
  onSelect: (id: string) => void;
  onCreateWorkout: () => void;
  onCreateExercicio: (data: CriarExercicioDTO) => Promise<boolean>;
  onUpdateExercicio: (id: string, data: AtualizarExercicioDTO) => Promise<boolean>;
  onDeleteExercicio: (id: string) => Promise<void>;
  ut: UserType;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [showExercises, setShowExercises] = useState(false);
  const ac = AC(ut);

  const list = treinos.filter((treino) =>
    treino.nome.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "Todos" || treino.objetivo === filter)
  );

  return (
    <div className="min-h-screen bg-background pb-36">
      {showExercises && (
        <ExerciseManagerModal
          exercicios={exercicios}
          saving={savingExercicio}
          deleting={deletingExercicio}
          onClose={() => setShowExercises(false)}
          onCreate={onCreateExercicio}
          onUpdate={onUpdateExercicio}
          onDelete={onDeleteExercicio}
        />
      )}

      <div className="px-6 pt-14 pb-4">
        <h1 className="font-montserrat font-bold text-3xl text-foreground mb-0.5">Treinos</h1>
        <p className="text-muted-foreground text-sm font-inter">
          {ut === "personal" ? "Gerencie treinos e exercícios reais" : "Suas rotinas disponíveis"}
        </p>
      </div>

      {ut === "personal" && (
        <div className="px-6 mb-4 grid grid-cols-2 gap-3">
          <button onClick={onCreateWorkout} className="h-12 rounded-2xl border border-border flex items-center justify-center gap-2 text-foreground hover:border-primary transition-all font-inter font-semibold text-sm">
            <Plus size={18}/> Nova rotina
          </button>
          <button onClick={() => setShowExercises(true)} className="h-12 rounded-2xl flex items-center justify-center gap-2 text-black font-inter font-semibold text-sm" style={{ background: ac }}>
            <Dumbbell size={18}/> Exercícios
          </button>
        </div>
      )}

      <div className="px-6 mb-3">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 h-12">
          <Search size={18} className="text-muted-foreground"/>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar treino..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-inter outline-none" aria-label="Buscar treino"/>
          {search && <button onClick={() => setSearch("")} aria-label="Limpar"><X size={16} className="text-muted-foreground"/></button>}
        </div>
      </div>

      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {["Todos", "Hipertrofia", "Emagrecimento", "Condicionamento", "Mobilidade", "Reabilitação"].map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFilter(filtro)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap transition-all ${filter === filtro ? "text-black" : "bg-card border border-border text-muted-foreground"}`}
              style={filter === filtro ? { background: ac } : undefined}
              aria-pressed={filter === filtro}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-3">
        <p className="font-montserrat font-semibold text-sm text-foreground">{ut === "personal" ? "Treinos cadastrados" : "Minhas rotinas"}</p>

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <RefreshCw size={28} className="animate-spin text-muted-foreground"/>
            <p className="text-sm text-muted-foreground">Carregando treinos...</p>
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Dumbbell size={38} className="text-muted-foreground"/>
            <p className="text-sm font-inter text-muted-foreground">Nenhum treino encontrado.</p>
            {ut === "personal" && <button onClick={onCreateWorkout} className="text-sm font-semibold" style={{ color: ac }}>Criar primeiro treino</button>}
          </div>
        ) : (
          list.map((treino) => (
            <div key={treino.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 pr-2">
                  <h3 className="font-montserrat font-bold text-lg text-foreground truncate">{treino.nome}</h3>
                  <p className="text-xs font-inter text-muted-foreground mt-0.5">{treino.objetivo} · {treino.duracao ? `${treino.duracao} min` : "Sem duração"}</p>
                </div>
                <Badge status={treino.status}/>
              </div>

              {treino.descricao && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{treino.descricao}</p>}

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Dumbbell size={13}/>{treino._count?.exercicios ?? treino.exercicios?.length ?? 0} exercícios</span>
                <span className="text-accent">Persistido no banco</span>
              </div>

              <button onClick={() => onSelect(treino.id)} className="w-full h-11 rounded-xl font-inter font-semibold text-sm text-black flex items-center justify-center gap-2 active:scale-95" style={{ background: ac }}>
                <ChevronRight size={17}/> {ut === "personal" ? "Abrir e gerenciar" : "Ver rotina"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Workout Detail ───────────────────────────────────────────────────────────

function WorkoutDetail({
  workout,
  exercicios,
  loadingExercicios,
  savingTreino,
  deletingTreino,
  savingVinculo,
  onBack,
  onUpdateTreino,
  onDeleteTreino,
  onAddExercicio,
  onUpdateExercicio,
  onRemoveExercicio,
  onToast,
  ut,
}: {
  workout: Treino;
  exercicios: Exercicio[];
  loadingExercicios: boolean;
  savingTreino: boolean;
  deletingTreino: boolean;
  savingVinculo: boolean;
  onBack: () => void;
  onUpdateTreino: (id: string, data: AtualizarTreinoDTO) => Promise<boolean>;
  onDeleteTreino: (id: string) => Promise<void>;
  onAddExercicio: (treinoId: string, data: AdicionarExercicioTreinoDTO) => Promise<boolean>;
  onUpdateExercicio: (treinoId: string, vinculoId: string, data: AtualizarExercicioTreinoDTO) => Promise<boolean>;
  onRemoveExercicio: (treinoId: string, vinculoId: string) => Promise<void>;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
  ut: UserType;
}) {
  const [cf, setCf] = useState("Volume");
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [nome, setNome] = useState(workout.nome);
  const [objetivo, setObjetivo] = useState(workout.objetivo);
  const [descricao, setDescricao] = useState(workout.descricao ?? "");
  const [duracao, setDuracao] = useState(workout.duracao?.toString() ?? "");
  const [status, setStatus] = useState<StatusTreino>(workout.status);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [series, setSeries] = useState("3");
  const [repeticoes, setRepeticoes] = useState("10");
  const [carga, setCarga] = useState("0");
  const ac = AC(ut);
  const exerciciosVinculados = workout.exercicios ?? [];
  const idsVinculados = new Set(exerciciosVinculados.map((item) => item.exercicioId));
  const exerciciosDisponiveis = exercicios.filter((item) => !idsVinculados.has(item.id));

  useEffect(() => {
    setNome(workout.nome);
    setObjetivo(workout.objetivo);
    setDescricao(workout.descricao ?? "");
    setDuracao(workout.duracao?.toString() ?? "");
    setStatus(workout.status);
  }, [workout]);

  const chartData = [
    { w: "S1", v: 3200 },
    { w: "S2", v: 3800 },
    { w: "S3", v: 3600 },
    { w: "S4", v: 4500 },
    { w: "S5", v: 4100 },
  ];

  async function salvarTreino() {
    if (!nome.trim() || !objetivo.trim()) {
      onToast("Nome e objetivo são obrigatórios.", "error");
      return;
    }
    if (duracao && (!Number.isInteger(Number(duracao)) || Number(duracao) <= 0)) {
      onToast("A duração deve ser um número inteiro maior que zero.", "error");
      return;
    }

    const sucesso = await onUpdateTreino(workout.id, {
      nome: nome.trim(),
      objetivo: objetivo.trim(),
      descricao: descricao.trim() || undefined,
      duracao: duracao ? Number(duracao) : undefined,
      status,
    });
    if (sucesso) setShowEdit(false);
  }

  async function adicionarExercicio() {
    if (!selectedExerciseId) {
      onToast("Selecione um exercício.", "error");
      return;
    }
    if (Number(series) < 1 || Number(repeticoes) < 1 || Number(carga) < 0) {
      onToast("Revise séries, repetições e carga.", "error");
      return;
    }

    const sucesso = await onAddExercicio(workout.id, {
      exercicioId: selectedExerciseId,
      ordem: exerciciosVinculados.length + 1,
      series: Number(series),
      repeticoes: Number(repeticoes),
      carga: Number(carga),
    });

    if (sucesso) {
      setShowAdd(false);
      setSelectedExerciseId("");
      setSeries("3");
      setRepeticoes("10");
      setCarga("0");
    }
  }

  async function editarVinculo(item: TreinoExercicio) {
    const novasSeries = window.prompt("Séries:", String(item.series));
    if (novasSeries === null) return;
    const novasReps = window.prompt("Repetições:", String(item.repeticoes));
    if (novasReps === null) return;
    const novaCarga = window.prompt("Carga (kg):", String(item.carga ?? 0));
    if (novaCarga === null) return;

    await onUpdateExercicio(workout.id, item.id, {
      series: Number(novasSeries),
      repeticoes: Number(novasReps),
      carga: Number(novaCarga),
    });
  }

  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setShowEdit(false)}>
          <div className="bg-background rounded-t-3xl w-full max-w-lg p-6 pb-10 border border-border max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="font-montserrat font-bold text-xl text-foreground">Editar treino</h2><button onClick={() => setShowEdit(false)}><X size={24} className="text-muted-foreground"/></button></div>
            <div className="flex flex-col gap-4">
              <Fld label="Nome" value={nome} onChange={setNome}/>
              <Fld label="Objetivo" value={objetivo} onChange={setObjetivo}/>
              <Fld label="Duração (min)" value={duracao} onChange={setDuracao} type="number"/>
              <Fld label="Descrição" value={descricao} onChange={setDescricao}/>
              <select value={status} onChange={(event) => setStatus(event.target.value as StatusTreino)} className="h-14 rounded-2xl bg-card border border-border px-4 text-foreground outline-none">
                <option value="disponivel">Disponível</option><option value="andamento">Em andamento</option><option value="concluido">Concluído</option>
              </select>
              <PBtn onClick={salvarTreino} loading={savingTreino} ut={ut}>Salvar alterações</PBtn>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center" onClick={() => setShowAdd(false)}>
          <div className="bg-background rounded-t-3xl w-full max-w-lg p-6 pb-10 border border-border" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="font-montserrat font-bold text-xl text-foreground">Adicionar exercício</h2><button onClick={() => setShowAdd(false)}><X size={24} className="text-muted-foreground"/></button></div>
            {loadingExercicios ? <p className="text-sm text-muted-foreground">Carregando exercícios...</p> : (
              <div className="flex flex-col gap-4">
                <select value={selectedExerciseId} onChange={(event) => setSelectedExerciseId(event.target.value)} className="h-14 rounded-2xl bg-card border border-border px-4 text-foreground outline-none">
                  <option value="">Selecione um exercício</option>
                  {exerciciosDisponiveis.map((item) => <option key={item.id} value={item.id}>{item.nome} · {item.categoria}</option>)}
                </select>
                <div className="grid grid-cols-3 gap-2">
                  <Fld label="Séries" value={series} onChange={setSeries} type="number"/>
                  <Fld label="Reps" value={repeticoes} onChange={setRepeticoes} type="number"/>
                  <Fld label="Carga" value={carga} onChange={setCarga} type="number"/>
                </div>
                <PBtn onClick={adicionarExercicio} loading={savingVinculo} ut={ut}>Adicionar à ficha</PBtn>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between mb-4">
          <BackBtn onClick={onBack}/>
          <p className="font-montserrat font-semibold text-sm text-muted-foreground">Rotina</p>
          {ut === "personal" ? (
            <div className="flex gap-2">
              <button onClick={() => setShowEdit(true)} aria-label="Editar treino" className="w-10 h-10 rounded-xl border border-border flex items-center justify-center"><Settings size={18} className="text-accent"/></button>
              <button disabled={deletingTreino} onClick={() => onDeleteTreino(workout.id)} aria-label="Excluir treino" className="w-10 h-10 rounded-xl border border-destructive flex items-center justify-center disabled:opacity-50"><X size={18} className="text-destructive"/></button>
            </div>
          ) : <button aria-label="Compartilhar" onClick={() => onToast("Compartilhamento ainda não implementado no MVP.", "info")}><Share2 size={20} className="text-muted-foreground"/></button>}
        </div>

        <h1 className="font-montserrat font-bold text-3xl text-foreground">{workout.nome}</h1>
        <p className="text-muted-foreground text-sm font-inter mt-1">TrainerX64 · {workout.objetivo}</p>
        {workout.descricao && <p className="text-xs text-gray-400 mt-2 italic bg-card p-3 rounded-xl border border-border">{workout.descricao}</p>}
        <div className="flex gap-4 mt-4 text-xs font-inter text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={12}/>{workout.duracao ? `${workout.duracao} min` : "N/A"}</span>
          <span className="flex items-center gap-1"><Dumbbell size={12}/>{exerciciosVinculados.length} exercícios</span>
          <Badge status={workout.status}/>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <Caps items={["Volume", "Repetições", "Duração"]} active={cf} onChange={setCf} ut={ut}/>
          <div className="mt-3"><ResponsiveContainer width="100%" height={90}><LineChart data={chartData}><XAxis dataKey="w" tick={{ fill: "#a0a0a0", fontSize: 11 }} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip contentStyle={{ background: "#1c1c1e", border: "1px solid #2a2a2a", borderRadius: "12px", color: "#fff" }}/><Line type="monotone" dataKey="v" stroke={ac} strokeWidth={2.5} dot={false}/></LineChart></ResponsiveContainer></div>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-montserrat font-bold text-lg text-foreground">Exercícios da ficha</p>
          {ut === "personal" && <button onClick={() => setShowAdd(true)} className="text-xs font-semibold flex items-center gap-1" style={{ color: ac }}><Plus size={15}/> Adicionar</button>}
        </div>

        {exerciciosVinculados.length === 0 ? (
          <p className="text-sm text-muted-foreground italic text-center py-6">Nenhum exercício vinculado a este treino.</p>
        ) : exerciciosVinculados.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: AC_BG(ut, 0.12) }}><Dumbbell size={22} style={{ color: ac }}/></div>
                <div className="min-w-0"><h3 className="font-montserrat font-bold text-sm text-foreground truncate">{item.ordem}. {item.exercicio.nome}</h3><p className="text-[11px] text-muted-foreground mt-0.5">{item.exercicio.categoria}</p></div>
              </div>
              {ut === "personal" && <div className="flex gap-2"><button disabled={savingVinculo} onClick={() => editarVinculo(item)} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center"><Settings size={15} className="text-accent"/></button><button disabled={savingVinculo} onClick={() => onRemoveExercicio(workout.id, item.id)} className="w-9 h-9 rounded-xl border border-destructive flex items-center justify-center"><X size={15} className="text-destructive"/></button></div>}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-background rounded-xl p-3"><p className="text-xs text-muted-foreground">Séries</p><p className="font-montserrat font-bold text-foreground">{item.series}</p></div>
              <div className="bg-background rounded-xl p-3"><p className="text-xs text-muted-foreground">Reps</p><p className="font-montserrat font-bold text-foreground">{item.repeticoes}</p></div>
              <div className="bg-background rounded-xl p-3"><p className="text-xs text-muted-foreground">Carga</p><p className="font-montserrat font-bold text-foreground">{item.carga ?? 0} kg</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Evolution ────────────────────────────────────────────────────────────────

function EvaluationInput({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-montserrat font-semibold text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        step="0.1"
        min="0"
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl bg-background border border-border px-3 text-foreground text-sm outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

function Evolution({
  ut,
  student,
  onBack,
}: {
  ut: UserType;
  student?: Student | null;
  onBack?: () => void;
}) {
  const [period,setPeriod]=useState("Mês");
  const [evaluations,setEvaluations]=useState<AvaliacaoFisica[]>([]);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeletingId]=useState<string|null>(null);
  const [editing,setEditing]=useState<AvaliacaoFisica|null>(null);
  const [toast,setToast]=useState<{msg:string;type:"success"|"error"}|null>(null);

  const emptyForm = {
    peso:"",
    altura:"",
    percentualGordura:"",
    massaMuscular:"",
    braco:"",
    peitoral:"",
    cintura:"",
    quadril:"",
    coxa:"",
    panturrilha:"",
    observacoes:"",
    dataAvaliacao:new Date().toISOString().slice(0,10),
  };

  const [form,setForm]=useState(emptyForm);
  const ac=AC(ut);
  const realMode=ut==="personal"&&!!student;

  useEffect(()=>{
    if(!realMode||!student) return;

    async function carregarAvaliacoes() {
      try {
        setLoading(true);
        const data=await avaliacaoService.listarAvaliacoesDoAluno(student.id);
        setEvaluations(data);
      } catch(error) {
        setToast({
          msg:error instanceof Error?error.message:"Erro ao carregar avaliações.",
          type:"error",
        });
      } finally {
        setLoading(false);
      }
    }

    carregarAvaliacoes();
  },[realMode,student?.id]);

  useEffect(()=>{
    if(!editing) return;

    setForm({
      peso:String(editing.peso),
      altura:String(editing.altura),
      percentualGordura:editing.percentualGordura?.toString()??"",
      massaMuscular:editing.massaMuscular?.toString()??"",
      braco:editing.braco?.toString()??"",
      peitoral:editing.peitoral?.toString()??"",
      cintura:editing.cintura?.toString()??"",
      quadril:editing.quadril?.toString()??"",
      coxa:editing.coxa?.toString()??"",
      panturrilha:editing.panturrilha?.toString()??"",
      observacoes:editing.observacoes??"",
      dataAvaliacao:new Date(editing.dataAvaliacao).toISOString().slice(0,10),
    });
  },[editing]);

  function resetForm() {
    setEditing(null);
    setForm({
      ...emptyForm,
      dataAvaliacao:new Date().toISOString().slice(0,10),
    });
  }

  function optionalNumber(value:string):number|undefined {
    return value.trim()===""?undefined:Number(value);
  }

  async function save() {
    if(!realMode||!student) {
      setToast({
        msg:"Para registrar uma avaliação real, acesse o perfil de um aluno pelo Personal.",
        type:"error",
      });
      return;
    }

    if(!form.peso||Number(form.peso)<=0||!form.altura||Number(form.altura)<=0) {
      setToast({msg:"Peso e altura devem ser maiores que zero.",type:"error"});
      return;
    }

    const data:CriarAvaliacaoDTO={
      peso:Number(form.peso),
      altura:Number(form.altura),
      percentualGordura:optionalNumber(form.percentualGordura),
      massaMuscular:optionalNumber(form.massaMuscular),
      braco:optionalNumber(form.braco),
      peitoral:optionalNumber(form.peitoral),
      cintura:optionalNumber(form.cintura),
      quadril:optionalNumber(form.quadril),
      coxa:optionalNumber(form.coxa),
      panturrilha:optionalNumber(form.panturrilha),
      observacoes:form.observacoes.trim()||undefined,
      dataAvaliacao:new Date(`${form.dataAvaliacao}T12:00:00`).toISOString(),
    };

    try {
      setSaving(true);

      if(editing) {
        const atualizada=await avaliacaoService.atualizarAvaliacao(
          editing.id,
          data as AtualizarAvaliacaoDTO,
        );

        setEvaluations(prev=>
          prev.map(item=>item.id===atualizada.id?atualizada:item)
        );

        setToast({msg:"Avaliação atualizada com sucesso.",type:"success"});
      } else {
        const nova=await avaliacaoService.criarAvaliacao(student.id,data);
        setEvaluations(prev=>[nova,...prev]);
        setToast({msg:"Avaliação registrada com sucesso.",type:"success"});
      }

      resetForm();
    } catch(error) {
      setToast({
        msg:error instanceof Error?error.message:"Erro ao salvar avaliação.",
        type:"error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvaluation(id:string) {
    const confirmar=window.confirm("Deseja realmente excluir esta avaliação física?");
    if(!confirmar) return;

    try {
      setDeletingId(id);
      await avaliacaoService.excluirAvaliacao(id);
      setEvaluations(prev=>prev.filter(item=>item.id!==id));

      if(editing?.id===id) {
        resetForm();
      }

      setToast({msg:"Avaliação excluída com sucesso.",type:"success"});
    } catch(error) {
      setToast({
        msg:error instanceof Error?error.message:"Erro ao excluir avaliação.",
        type:"error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  const chartData=[...evaluations]
    .reverse()
    .map(item=>({
      date:new Date(item.dataAvaliacao).toLocaleDateString("pt-BR",{month:"short"}),
      peso:item.peso,
    }));

  const latest=evaluations[0];

  return (
    <div className="min-h-screen bg-background pb-36 overflow-y-auto">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}

      <div className="px-6 pt-14 pb-4">
        {realMode&&onBack&&(
          <div className="mb-5">
            <BackBtn onClick={onBack}/>
          </div>
        )}

        <h1 className="font-montserrat font-bold text-3xl text-foreground">
          {realMode?`Avaliações de ${student?.name}`:ut==="aluno"?"Progresso":"Avaliação Física"}
        </h1>
        <p className="text-muted-foreground text-sm font-inter mt-1">
          {realMode
            ?"Registre, edite e acompanhe o histórico físico deste aluno."
            :ut==="aluno"
              ?"Acompanhe seu progresso físico."
              :"Selecione um aluno em Meus Alunos para registrar avaliações reais."}
        </p>
      </div>

      <div className="px-6 flex flex-col gap-5">
        {realMode ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<Weight size={18}/>}
                label="Peso atual"
                value={latest?`${latest.peso} kg`:"-"}
                color={ac}
              />
              <StatCard
                icon={<Calendar size={18}/>}
                label="Última avaliação"
                value={latest
                  ?new Date(latest.dataAvaliacao).toLocaleDateString("pt-BR")
                  :"-"}
                color={ac}
              />
              <StatCard
                icon={<Activity size={18}/>}
                label="Gordura corporal"
                value={latest?.percentualGordura!=null?`${latest.percentualGordura}%`:"-"}
                color={ac}
              />
              <StatCard
                icon={<Zap size={18}/>}
                label="Massa muscular"
                value={latest?.massaMuscular!=null?`${latest.massaMuscular} kg`:"-"}
                color={ac}
              />
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="font-montserrat font-semibold text-sm text-foreground mb-3">
                Evolução de peso
              </p>
              <Caps items={["Semana","Mês","3 meses","Ano"]} active={period} onChange={setPeriod} ut={ut}/>
              <div className="mt-3">
                {chartData.length>0 ? (
                  <ResponsiveContainer width="100%" height={130}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" tick={{fill:"#a0a0a0",fontSize:11}} axisLine={false} tickLine={false}/>
                      <YAxis hide domain={["auto","auto"]}/>
                      <Tooltip contentStyle={{background:"#1c1c1e",border:"1px solid #2a2a2a",borderRadius:"12px",color:"#fff"}}/>
                      <Line type="monotone" dataKey="peso" stroke={ac} strokeWidth={2.5} dot name="Peso (kg)"/>
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-8 text-sm text-center text-muted-foreground">
                    Nenhuma avaliação cadastrada para gerar o gráfico.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="font-montserrat font-bold text-sm text-foreground">
                  {editing?"Editar avaliação":"Registrar avaliação"}
                </p>
                {editing&&(
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-inter"
                    style={{color:ac}}
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <EvaluationInput label="Peso (kg)" value={form.peso} onChange={value=>setForm(prev=>({...prev,peso:value}))} required/>
                <EvaluationInput label="Altura (cm)" value={form.altura} onChange={value=>setForm(prev=>({...prev,altura:value}))} required/>
                <EvaluationInput label="Gordura (%)" value={form.percentualGordura} onChange={value=>setForm(prev=>({...prev,percentualGordura:value}))}/>
                <EvaluationInput label="Massa muscular (kg)" value={form.massaMuscular} onChange={value=>setForm(prev=>({...prev,massaMuscular:value}))}/>
                <EvaluationInput label="Braço (cm)" value={form.braco} onChange={value=>setForm(prev=>({...prev,braco:value}))}/>
                <EvaluationInput label="Peitoral (cm)" value={form.peitoral} onChange={value=>setForm(prev=>({...prev,peitoral:value}))}/>
                <EvaluationInput label="Cintura (cm)" value={form.cintura} onChange={value=>setForm(prev=>({...prev,cintura:value}))}/>
                <EvaluationInput label="Quadril (cm)" value={form.quadril} onChange={value=>setForm(prev=>({...prev,quadril:value}))}/>
                <EvaluationInput label="Coxa (cm)" value={form.coxa} onChange={value=>setForm(prev=>({...prev,coxa:value}))}/>
                <EvaluationInput label="Panturrilha (cm)" value={form.panturrilha} onChange={value=>setForm(prev=>({...prev,panturrilha:value}))}/>

                <div className="col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-montserrat font-semibold text-muted-foreground">
                    Data da avaliação
                  </label>
                  <input
                    type="date"
                    value={form.dataAvaliacao}
                    onChange={event=>setForm(prev=>({...prev,dataAvaliacao:event.target.value}))}
                    className="h-11 rounded-xl bg-background border border-border px-3 text-foreground text-sm outline-none focus:border-accent"
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-montserrat font-semibold text-muted-foreground">
                    Observações
                  </label>
                  <textarea
                    value={form.observacoes}
                    onChange={event=>setForm(prev=>({...prev,observacoes:event.target.value}))}
                    placeholder="Observações opcionais..."
                    rows={3}
                    className="rounded-xl bg-background border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-accent resize-none"
                  />
                </div>
              </div>

              <button
                onClick={save}
                disabled={saving}
                className="w-full h-12 rounded-2xl font-montserrat font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-95 mt-4 disabled:opacity-50"
                style={{background:ac}}
              >
                {saving
                  ?<RefreshCw size={18} className="animate-spin"/>
                  :<Check size={18}/>}
                {saving
                  ?"Salvando..."
                  :editing
                    ?"Salvar alterações"
                    :"Registrar avaliação"}
              </button>
            </div>

            <div>
              <p className="font-montserrat font-bold text-sm text-foreground mb-3">
                Histórico de avaliações
              </p>

              {loading ? (
                <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
                  <RefreshCw size={20} className="animate-spin"/>
                  <span className="text-sm">Carregando avaliações...</span>
                </div>
              ) : evaluations.length===0 ? (
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                  <ClipboardList size={34} className="text-muted-foreground mx-auto mb-3"/>
                  <p className="text-sm text-muted-foreground">
                    Nenhuma avaliação física cadastrada.
                  </p>
                </div>
              ) : evaluations.map(item=>(
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-4 mb-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-montserrat font-semibold text-sm text-foreground">
                        {new Date(item.dataAvaliacao).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-xs font-inter text-muted-foreground mt-1">
                        Peso: {item.peso} kg · Altura: {item.altura} cm
                      </p>
                      <p className="text-xs font-inter text-muted-foreground mt-1">
                        Gordura: {item.percentualGordura??"-"}% · Massa muscular: {item.massaMuscular??"-"} kg
                      </p>
                      <p className="text-xs font-inter text-muted-foreground mt-1">
                        Braço: {item.braco??"-"} · Cintura: {item.cintura??"-"} · Coxa: {item.coxa??"-"} cm
                      </p>
                      {item.observacoes&&(
                        <p className="text-xs font-inter text-foreground mt-2">
                          {item.observacoes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={()=>setEditing(item)}
                        className="w-9 h-9 rounded-xl border border-border flex items-center justify-center"
                        aria-label="Editar avaliação"
                      >
                        <Settings size={16} style={{color:ac}}/>
                      </button>
                      <button
                        type="button"
                        onClick={()=>deleteEvaluation(item.id)}
                        disabled={deletingId===item.id}
                        className="w-9 h-9 rounded-xl border border-destructive/50 text-destructive flex items-center justify-center disabled:opacity-50"
                        aria-label="Excluir avaliação"
                      >
                        {deletingId===item.id
                          ?<RefreshCw size={16} className="animate-spin"/>
                          :<X size={16}/>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={<Weight size={18}/>} label="Peso atual" value="74.6 kg" color={ac}/>
              <StatCard icon={<Calendar size={18}/>} label="Último registro" value="Jun 2026" color={ac}/>
              <StatCard icon={<Activity size={18}/>} label="Frequência" value="3x" sub="Meta: 4x" color={ac}/>
              <StatCard icon={<Zap size={18}/>} label="Volume total" value="17.8k kg" color={ac}/>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="font-montserrat font-semibold text-sm text-foreground mb-3">
                Evolução de peso
              </p>
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

            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <ClipboardList size={34} className="text-muted-foreground mx-auto mb-3"/>
              <p className="font-montserrat font-semibold text-sm text-foreground">
                Dados demonstrativos do MVP
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                O CRUD real de avaliações é acessado pelo Personal no perfil de um aluno.
              </p>
            </div>
          </>
        )}
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

const TERMS_MD = (
  <>
    <h2 className="text-2xl font-bold mb-4 text-foreground">
      Termos de Uso — Aplicativo TrainerX64
    </h2>

    <p className="mb-4">
      <strong>Versão:</strong> 1.0<br />
      <strong>Última Atualização:</strong> Versão 1.1<br />
      <strong>Data de Publicação:</strong> 05 de julho de 2026
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      1. Aceitação dos Termos
    </h3>

    <p className="mb-3">
      Bem-vindo ao <strong>TrainerX64</strong>. Estes Termos de Uso estabelecem
      as condições para utilização do aplicativo. Ao criar uma conta,
      acessar ou utilizar qualquer funcionalidade do TrainerX64, o usuário
      declara que leu, compreendeu e concorda integralmente com as
      disposições deste documento.
    </p>

    <p className="mb-4">
      Caso não concorde com estes Termos de Uso, recomenda-se não utilizar
      o aplicativo.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      2. Sobre o Aplicativo
    </h3>

    <p className="mb-3">
      O <strong>TrainerX64</strong> é um aplicativo desenvolvido como um
      MVP (Minimum Viable Product) com o objetivo de facilitar a comunicação
      entre personal trainers e alunos, auxiliando na organização dos
      treinamentos e no acompanhamento da evolução física.
    </p>

    <p className="mb-2">
      O aplicativo oferece, entre outras, as seguintes funcionalidades:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Cadastro e autenticação de usuários;</li>
      <li>Gerenciamento de perfis de alunos e personal trainers;</li>
      <li>Criação, edição e consulta de fichas de treino;</li>
      <li>Registro da execução dos treinos;</li>
      <li>Acompanhamento da evolução do aluno;</li>
      <li>Visualização de vídeos demonstrativos dos exercícios;</li>
      <li>Histórico de atividades realizadas;</li>
      <li>Sistema de notificações e lembretes;</li>
      <li>Gerenciamento básico de pagamentos e consultorias.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      3. Perfis de Usuário
    </h3>

    <p className="mb-3">
      O TrainerX64 disponibiliza dois perfis de acesso:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>
        <strong>Aluno:</strong> pode visualizar fichas de treino, registrar
        exercícios realizados, acompanhar sua evolução física, visualizar
        vídeos demonstrativos e receber lembretes.
      </li>

      <li>
        <strong>Personal Trainer:</strong> pode cadastrar e gerenciar alunos,
        criar, editar e atualizar fichas de treino, além de acompanhar o
        desempenho e evolução dos alunos.
      </li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      4. Responsabilidades do Usuário
    </h3>

    <p className="mb-2">
      Ao utilizar o TrainerX64, o usuário compromete-se a:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Fornecer informações verdadeiras e atualizadas;</li>
      <li>Manter sua senha em sigilo;</li>
      <li>Não compartilhar sua conta com terceiros;</li>
      <li>Utilizar o aplicativo apenas para fins legais;</li>
      <li>
        Não realizar qualquer tentativa de comprometer a segurança do
        sistema.
      </li>
    </ul>

    <p className="mb-4">
      O usuário é responsável por todas as ações realizadas utilizando sua
      conta.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      5. Responsabilidade sobre os Treinos
    </h3>

    <p className="mb-3">
      O TrainerX64 é uma ferramenta tecnológica de apoio ao gerenciamento
      de treinos.
    </p>

    <p className="mb-3">
      A elaboração, prescrição, intensidade e adequação dos exercícios são
      de responsabilidade exclusiva do Personal Trainer responsável pelo
      aluno.
    </p>

    <p className="mb-4">
      O aplicativo não substitui acompanhamento médico, fisioterapêutico
      ou qualquer outro acompanhamento profissional relacionado à saúde.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      6. Disponibilidade do Serviço
    </h3>

    <p className="mb-4">
      Por se tratar de um projeto desenvolvido no formato MVP, o aplicativo
      poderá passar por atualizações, melhorias, manutenções programadas e
      eventuais indisponibilidades temporárias.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      7. Propriedade Intelectual
    </h3>

    <p className="mb-4">
      Todo o conteúdo disponibilizado no TrainerX64, incluindo código-fonte,
      identidade visual, logotipo, layout, banco de dados, imagens, textos,
      vídeos e demais elementos do aplicativo são protegidos por direitos de
      propriedade intelectual. É proibida sua reprodução, distribuição,
      modificação ou utilização sem autorização da equipe desenvolvedora.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      8. Limitação de Responsabilidade
    </h3>

    <p className="mb-2">
      A equipe do TrainerX64 não se responsabiliza por:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Problemas decorrentes de falhas na conexão com a internet;</li>
      <li>Danos causados por uso inadequado do aplicativo;</li>
      <li>Informações cadastradas incorretamente pelos usuários;</li>
      <li>Falhas decorrentes de dispositivos incompatíveis;</li>
      <li>Danos causados pela execução inadequada dos exercícios.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      9. Alterações dos Termos
    </h3>

    <p className="mb-4">
      Estes Termos de Uso poderão ser atualizados sempre que necessário para
      adequação do aplicativo, inclusão de novas funcionalidades ou
      atendimento à legislação aplicável.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      10. Aceite dos Termos
    </h3>

    <p className="mb-4">
      O aceite destes Termos ocorre durante o cadastro do usuário, mediante
      a seleção da opção de concordância apresentada no aplicativo.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      11. Foro
    </h3>

    <p>
      Fica eleito o Foro da Comarca de Manaus, Estado do Amazonas, para
      dirimir quaisquer dúvidas ou controvérsias decorrentes da utilização
      do TrainerX64, observada a legislação brasileira aplicável.
    </p>
  </>
);
const PRIV_MD = (
  <>
    <h2 className="text-2xl font-bold mb-4 text-foreground">
      Política de Privacidade — Aplicativo TrainerX64
    </h2>

    <p className="mb-4">
      <strong>Versão:</strong> 1.0<br />
      <strong>Última Atualização:</strong> Versão 1.1<br />
      <strong>Data de Publicação:</strong> 05 de julho de 2026
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      1. Introdução
    </h3>

    <p className="mb-4">
      Esta Política de Privacidade descreve como o TrainerX64 coleta,
      utiliza, armazena e protege os dados pessoais de seus usuários.
      Ao utilizar o aplicativo, o usuário declara estar ciente das
      práticas aqui descritas e concorda com o tratamento de seus dados
      conforme esta Política e a Lei Geral de Proteção de Dados (LGPD –
      Lei nº 13.709/2018).
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      2. Dados Coletados
    </h3>

    <p className="mb-2">
      Durante a utilização do aplicativo poderão ser coletados:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Nome completo;</li>
      <li>Endereço de e-mail;</li>
      <li>Senha protegida por mecanismos de segurança;</li>
      <li>Tipo de usuário (Aluno ou Personal Trainer);</li>
      <li>Fichas de treino cadastradas;</li>
      <li>Histórico de treinos realizados;</li>
      <li>Evolução física registrada;</li>
      <li>Feedbacks referentes aos exercícios;</li>
      <li>Data e horário de acesso ao aplicativo;</li>
      <li>Informações técnicas necessárias para o funcionamento da plataforma.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      3. Finalidade da Coleta
    </h3>

    <p className="mb-2">
      Os dados coletados são utilizados para:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Permitir a criação e gerenciamento da conta;</li>
      <li>Disponibilizar as funcionalidades do aplicativo;</li>
      <li>Gerenciar fichas de treino;</li>
      <li>Acompanhar a evolução dos alunos;</li>
      <li>Facilitar a comunicação entre aluno e personal trainer;</li>
      <li>Melhorar a experiência de utilização;</li>
      <li>Garantir a segurança da plataforma;</li>
      <li>Cumprir obrigações legais quando aplicável.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      4. Compartilhamento de Dados
    </h3>

    <p className="mb-3">
      O TrainerX64 não comercializa dados pessoais dos usuários.
    </p>

    <p className="mb-2">
      As informações poderão ser compartilhadas apenas:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Entre o aluno e o Personal Trainer responsável;</li>
      <li>Quando houver obrigação legal;</li>
      <li>Quando necessário para prevenção de fraudes e proteção do sistema.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      5. Armazenamento e Segurança
    </h3>

    <p className="mb-4">
      O TrainerX64 adota medidas técnicas e administrativas destinadas à
      proteção dos dados pessoais contra acessos não autorizados,
      alterações, perda ou divulgação indevida.
      Apesar dos esforços empregados, nenhum sistema pode garantir
      segurança absoluta.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      6. Responsabilidades do Usuário
    </h3>

    <p className="mb-2">
      O usuário compromete-se a:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Manter sua senha em sigilo;</li>
      <li>Não compartilhar sua conta com terceiros;</li>
      <li>Fornecer informações verdadeiras;</li>
      <li>Manter seus dados sempre atualizados;</li>
      <li>Utilizar o aplicativo de forma responsável.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      7. Direitos do Usuário
    </h3>

    <p className="mb-2">
      Nos termos da LGPD, o usuário poderá solicitar:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-1">
      <li>Confirmação da existência de tratamento dos dados;</li>
      <li>Acesso às informações armazenadas;</li>
      <li>Correção de dados incorretos;</li>
      <li>Atualização cadastral;</li>
      <li>Exclusão dos dados, quando legalmente possível;</li>
      <li>Informações sobre o tratamento realizado.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      8. Retenção dos Dados
    </h3>

    <p className="mb-4">
      Os dados serão armazenados apenas pelo período necessário ao
      funcionamento do aplicativo ou conforme exigido pela legislação
      vigente.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      9. Atualizações desta Política
    </h3>

    <p className="mb-4">
      Esta Política de Privacidade poderá ser alterada sempre que houver
      mudanças nas funcionalidades do aplicativo, na legislação aplicável
      ou na forma de tratamento dos dados pessoais.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      10. Contato
    </h3>

    <p className="mb-4">
      Em caso de dúvidas relacionadas à privacidade e ao tratamento de
      dados pessoais, o usuário poderá entrar em contato pelos canais
      oficiais disponibilizados pela equipe do TrainerX64.
    </p>

    <h3 className="text-lg font-semibold mt-5 mb-2">
      11. Disposições Finais
    </h3>

    <p>
      Ao utilizar o TrainerX64, o usuário declara que leu,
      compreendeu e concorda com esta Política de Privacidade,
      autorizando o tratamento de seus dados para as finalidades
      descritas neste documento, em conformidade com a Lei Geral
      de Proteção de Dados Pessoais (LGPD).
    </p>
  </>
);


function FinanceModal({
  student,
  alunosInadimplentes,
  onClose,
  onCadastrar,
  onDarBaixa,
  saving,
}: {
  student: Student;
  alunosInadimplentes: any[];
  onClose: () => void;
  onCadastrar: (alunoId: string, valor: number, dataVencimento: string) => Promise<boolean>;
  onDarBaixa: (id: string) => Promise<void>;
  saving: boolean;
}) {
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState(new Date().toISOString().slice(0, 10));
  const ac = AC("personal");

  // Localiza as faturas pendentes desse aluno que vieram do banco de dados
  const dadosInadimplente = alunosInadimplentes.find(a => a.id === student.id);
  const faturasPendentes = dadosInadimplente?.mensalidades ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valor || Number(valor) <= 0) return;
    const sucesso = await onCadastrar(student.id, Number(valor), vencimento);
    if (sucesso) {
      setValor("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center">
      <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl bg-card border border-border p-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-montserrat font-bold text-xl text-foreground">Financeiro: {student.name}</h2>
            <p className="text-xs text-muted-foreground font-inter">Status cadastral: {student.status}</p>
          </div>
          <button onClick={onClose}><X size={24} className="text-muted-foreground" /></button>
        </div>

        {/* Formulário de Cobrança */}
        <form onSubmit={handleSubmit} className="bg-background border border-border p-4 rounded-2xl mb-6 flex flex-col gap-3">
          <p className="text-xs font-montserrat font-bold text-foreground uppercase tracking-wider">Gerar Nova Cobrança</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-inter text-muted-foreground">Valor (R$)</label>
              <input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="150.00" className="h-10 rounded-xl bg-card border border-border px-3 text-sm text-foreground outline-none focus:border-accent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-inter text-muted-foreground">Vencimento</label>
              <input type="date" value={vencimento} onChange={e => setVencimento(e.target.value)} className="h-10 rounded-xl bg-card border border-border px-3 text-sm text-foreground outline-none focus:border-accent" />
            </div>
          </div>
          <button type="submit" disabled={saving || !valor} className="h-10 rounded-xl font-inter font-bold text-xs text-black flex items-center justify-center gap-1 disabled:opacity-40" style={{ background: ac }}>
            {saving ? <RefreshCw size={14} className="animate-spin text-white" /> : <Plus size={14} />}
            Lançar Mensalidade
          </button>
        </form>

        {/* Listagem de Pendências financeiras */}
        <div>
          <p className="text-xs font-montserrat font-bold text-foreground uppercase tracking-wider mb-3">Mensalidades em Aberto</p>
          {faturasPendentes.length === 0 ? (
            <p className="text-sm text-muted-foreground font-inter italic bg-background p-4 rounded-2xl text-center border border-border">
              Nenhuma mensalidade pendente encontrada para este aluno.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {faturasPendentes.map((fatura: any) => (
                <div key={fatura.id} className="bg-background border border-border p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-montserrat font-bold text-sm text-destructive">R$ {fatura.valor.toFixed(2)}</p>
                    <p className="text-xs font-inter text-muted-foreground">Vence em: {new Date(fatura.dataVencimento).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <button onClick={() => onDarBaixa(fatura.id)} disabled={saving} className="h-8 px-3 rounded-lg text-xs font-inter font-semibold bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-black transition-colors flex items-center gap-1">
                    {saving ? <RefreshCw size={12} className="animate-spin" /> : <Check size={12} />}
                    Recebido
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen,setScreen]=useState<Screen>("welcome");
  const [user,setUser]=useState<AppUser|null>(null);
  const [selW,setSelW]=useState<Treino|null>(null);
  const [selS,setSelS]=useState<Student|null>(null);
  const [modal,setModal]=useState<"terms"|"privacy"|null>(null);
  const [gToast,setGToast]=useState<{msg:string;type:"success"|"error"|"info"}|null>(null);

  const [students,setStudents]=useState<Student[]>(STUDENTS);
  const [loadingStudents,setLoadingStudents]=useState(true);
  const [savingStudent,setSavingStudent]=useState(false);
  const [deletingStudent,setDeletingStudent]=useState(false);
  const [studentFormMode,setStudentFormMode]=useState<"create"|"edit"|null>(null);

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [loadingExercicios, setLoadingExercicios] = useState(true);
  const [savingExercicio, setSavingExercicio] = useState(false);
  const [deletingExercicio, setDeletingExercicio] = useState(false);

  
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loadingTreinos, setLoadingTreinos] = useState(true);
  const [savingTreino, setSavingTreino] = useState(false);
  const [deletingTreino, setDeletingTreino] = useState(false);

  // ─── Estados do Vínculo Treino ↔ Exercício ──────────────────────────────
  const [exerciciosDoTreino, setExerciciosDoTreino] = useState<TreinoExercicio[]>([]);
  const [loadingExerciciosDoTreino, setLoadingExerciciosDoTreino] = useState(false);
  const [savingExercicioTreino, setSavingExercicioTreino] = useState(false);


  // ─── Estados do Módulo Financeiro ───────────────────────────────────────
  const [alunosInadimplentes, setAlunosInadimplentes] = useState<any[]>([]);
  const [loadingFinanceiro, setLoadingFinanceiro] = useState(false);
  const [savingMensalidade, setSavingMensalidade] = useState(false);
  const [financeStudent, setFinanceStudent] = useState<Student | null>(null);

  useEffect(() => {
    async function carregarExercicios() {
      try {
        setLoadingExercicios(true);
        const data = await exercicioService.listarExercicios();
        setExercicios(data);
      } catch (error) {
        setGToast({
          msg: error instanceof Error ? error.message : "Erro ao carregar exercícios.",
          type: "error",
        });
      } finally {
        setLoadingExercicios(false);
      }
    }
    carregarExercicios();
  }, []);

  useEffect(() => {
    async function carregarTreinos() {
      try {
        setLoadingTreinos(true);
        const data = await treinoService.listarTreinos();
        setTreinos(data);
      } catch (error) {
        setGToast({
          msg: error instanceof Error ? error.message : "Erro ao carregar treinos.",
          type: "error",
        });
      } finally {
        setLoadingTreinos(false);
      }
    }
    carregarTreinos();
  }, []);

  useEffect(() => {
    carregarAlunosInadimplentes();
  }, []);

  // ─── Ações de Exercícios ──────────────────────────────────────────────────
  async function handleCreateExercicio(data: CriarExercicioDTO): Promise<boolean> {
    try {
      setSavingExercicio(true);
      const novoExercicio = await exercicioService.criarExercicio(data);
      setExercicios((prev) => [...prev, novoExercicio]);
      setGToast({ msg: "Exercício criado com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao criar exercício.", type: "error" });
      return false;
    } finally {
      setSavingExercicio(false);
    }
  }

  async function handleUpdateExercicio(exercicioId: string, data: AtualizarExercicioDTO): Promise<boolean> {
    try {
      setSavingExercicio(true);
      const exercicioAtualizado = await exercicioService.atualizarExercicio(exercicioId, data);
      setExercicios((prev) => prev.map((ex) => ex.id === exercicioId ? exercicioAtualizado : ex));
      setGToast({ msg: "Exercício atualizado com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao atualizar exercício.", type: "error" });
      return false;
    } finally {
      setSavingExercicio(false);
    }
  }

  async function handleDeleteExercicio(exercicioId: string): Promise<void> {
    const confirmar = window.confirm("Deseja realmente excluir este exercício?");
    if (!confirmar) return;
    try {
      setDeletingExercicio(true);
      await exercicioService.excluirExercicio(exercicioId);
      setExercicios((prev) => prev.filter((ex) => ex.id !== exercicioId));
      setGToast({ msg: "Exercício excluído com sucesso.", type: "success" });
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao excluir exercício.", type: "error" });
    } finally {
      setDeletingExercicio(false);
    }
  }

  // ─── Ações de Treinos ─────────────────────────────────────────────────────
  async function handleCreateTreino(data: CriarTreinoDTO): Promise<boolean> {
    try {
      setSavingTreino(true);
      const novoTreino = await treinoService.criarTreino(data);
      setTreinos((prev) => [...prev, novoTreino]);
      setGToast({ msg: "Treino criado com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao criar treino.", type: "error" });
      return false;
    } finally {
      setSavingTreino(false);
    }
  }

  async function handleUpdateTreino(treinoId: string, data: AtualizarTreinoDTO): Promise<boolean> {
    try {
      setSavingTreino(true);
      const treinoAtualizado = await treinoService.atualizarTreino(treinoId, data);
      const treinoCompleto = await treinoService.buscarTreinoPorId(treinoId);
      setTreinos((prev) => prev.map((t) => t.id === treinoId ? { ...treinoAtualizado, _count: { exercicios: treinoCompleto.exercicios?.length ?? 0 } } : t));
      if (selW?.id === treinoId) setSelW(treinoCompleto);
      setGToast({ msg: "Treino atualizado com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao atualizar treino.", type: "error" });
      return false;
    } finally {
      setSavingTreino(false);
    }
  }

  async function handleDeleteTreino(treinoId: string): Promise<void> {
    const confirmar = window.confirm("Deseja realmente excluir este treino?");
    if (!confirmar) return;
    try {
      setDeletingTreino(true);
      await treinoService.excluirTreino(treinoId);
      setTreinos((prev) => prev.filter((t) => t.id !== treinoId));
      if (selW?.id === treinoId) {
        setSelW(null);
        setScreen("workouts");
      }
      setGToast({ msg: "Treino excluído com sucesso.", type: "success" });
    } catch (error) {
      setGToast({ msg: error instanceof Error ? error.message : "Erro ao excluir treino.", type: "error" });
    } finally {
      setDeletingTreino(false);
    }
  }

  // Coloque perto das outras funções "handle..." do App.tsx
  async function handleSelectTreino(treinoId: string) {
    try {
      setLoadingTreinos(true);
      // Busca o treino atualizado direto da API (com os exercícios inclusos)
      const treinoCompleto = await treinoService.buscarTreinoPorId(treinoId);
      setSelW(treinoCompleto); // Guarda o treino selecionado no estado
      setScreen("workout-detail"); // Muda para a tela de detalhes do treino
    } catch (error) {
      setGToast({
        msg: "Erro ao abrir detalhes do treino.",
        type: "error",
      });
    } finally {
      setLoadingTreinos(false);
    }
  }

  // ─── Funções de Ação do Módulo Financeiro ─────────────────────────────────
  async function carregarAlunosInadimplentes() {
    try {
      setLoadingFinanceiro(true);
      const data = await mensalidadeService.listarPendentes();
      setAlunosInadimplentes(data);
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao carregar pendências financeiras.",
        type: "error",
      });
    } finally {
      setLoadingFinanceiro(false);
    }
  }

  async function handleCadastrarMensalidade(alunoId: string, valor: number, dataVencimento: string): Promise<boolean> {
    try {
      setSavingMensalidade(true);
      await mensalidadeService.cadastrar({ alunoId, valor, dataVencimento });
      setGToast({ msg: "Mensalidade gerada com sucesso!", type: "success" });
      
      // Atualiza as listas locais para refletir o novo status instantaneamente
      await carregarAlunosInadimplentes();
      const alunosAtualizados = await alunoService.listarAlunos();
      setStudents(alunosAtualizados);
      return true;
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao cadastrar mensalidade.",
        type: "error",
      });
      return false;
    } finally {
      setSavingMensalidade(false);
    }
  }

  async function handleDarBaixaMensalidade(mensalidadeId: string): Promise<void> {
    try {
      setSavingMensalidade(true);
      await mensalidadeService.darBaixa(mensalidadeId);
      setGToast({ msg: "Mensalidade marcada como recebida com sucesso!", type: "success" });
      
      // Atualiza o financeiro e o perfil dos alunos após o pagamento
      await carregarAlunosInadimplentes();
      const alunosAtualizados = await alunoService.listarAlunos();
      setStudents(alunosAtualizados);
      
      // Se o aluno estiver selecionado na tela de detalhes, atualiza o status dele visualmente
      if (selS) {
        const alunoAtualizado = alunosAtualizados.find(a => a.id === selS.id);
        if (alunoAtualizado) setSelS(alunoAtualizado);
      }
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao registrar recebimento.",
        type: "error",
      });
    } finally {
      setSavingMensalidade(false);
    }
  }

  async function atualizarTreinoSelecionado(treinoId: string): Promise<void> {
    const treinoCompleto = await treinoService.buscarTreinoPorId(treinoId);
    setSelW(treinoCompleto);
    setTreinos((prev) =>
      prev.map((treino) =>
        treino.id === treinoId
          ? { ...treino, _count: { exercicios: treinoCompleto.exercicios?.length ?? 0 } }
          : treino,
      ),
    );
  }

  // ─── Funções de Ação do Vínculo ──────────────────────────────────────────
  async function carregarExerciciosDoTreino(treinoId: string): Promise<void> {
    try {
      setLoadingExerciciosDoTreino(true);
      const data = await treinoExercicioService.listarExerciciosDoTreino(treinoId);
      setExerciciosDoTreino(data);
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao carregar exercícios do treino.",
        type: "error",
      });
    } finally {
      setLoadingExerciciosDoTreino(false);
    }
  }

  async function handleAddExercicioTreino(treinoId: string, data: AdicionarExercicioTreinoDTO): Promise<boolean> {
    try {
      setSavingExercicioTreino(true);
      const novoVinculo = await treinoExercicioService.adicionarExercicioAoTreino(treinoId, data);
      
      setExerciciosDoTreino((prev) =>
        [...prev, novoVinculo].sort((a, b) => a.ordem - b.ordem)
      );
      await atualizarTreinoSelecionado(treinoId);

      setGToast({ msg: "Exercício adicionado ao treino com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao adicionar exercício ao treino.",
        type: "error",
      });
      return false;
    } finally {
      setSavingExercicioTreino(false);
    }
  }

  async function handleUpdateExercicioTreino(treinoId: string, vinculoId: string, data: AtualizarExercicioTreinoDTO): Promise<boolean> {
    try {
      setSavingExercicioTreino(true);
      const vinculoAtualizado = await treinoExercicioService.atualizarExercicioDoTreino(treinoId, vinculoId, data);

      setExerciciosDoTreino((prev) =>
        prev
          .map((item) => item.id === vinculoId ? vinculoAtualizado : item)
          .sort((a, b) => a.ordem - b.ordem)
      );
      await atualizarTreinoSelecionado(treinoId);

      setGToast({ msg: "Exercício do treino atualizado com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao atualizar exercício do treino.",
        type: "error",
      });
      return false;
    } finally {
      setSavingExercicioTreino(false);
    }
  }

  async function handleRemoveExercicioTreino(treinoId: string, vinculoId: string): Promise<void> {
    const confirmar = window.confirm("Deseja remover este exercício do treino?");
    if (!confirmar) return;

    try {
      await treinoExercicioService.removerExercicioDoTreino(treinoId, vinculoId);
      setExerciciosDoTreino((prev) => prev.filter((item) => item.id !== vinculoId));
      await atualizarTreinoSelecionado(treinoId);
      setGToast({ msg: "Exercício removido do treino com sucesso.", type: "success" });
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao remover exercício do treino.",
        type: "error",
      });
    }
  }

  // ─── Fluxo completo: cria treino e vincula exercícios ─────────────────────
  async function criarTreinoComExercicios(
    treinoData: CriarTreinoDTO,
    exerciciosSelecionados: AdicionarExercicioTreinoDTO[],
  ): Promise<boolean> {
    try {
      setSavingTreino(true);
      const treino = await treinoService.criarTreino(treinoData);

      for (const exercicio of exerciciosSelecionados) {
        await treinoExercicioService.adicionarExercicioAoTreino(treino.id, exercicio);
      }

      const treinoCompleto = await treinoService.buscarTreinoPorId(treino.id);
      setTreinos((prev) => [treinoCompleto, ...prev.filter((item) => item.id !== treino.id)]);
      setGToast({ msg: "Treino e exercícios cadastrados com sucesso.", type: "success" });
      return true;
    } catch (error) {
      setGToast({
        msg: error instanceof Error ? error.message : "Erro ao criar treino.",
        type: "error",
      });
      return false;
    } finally {
      setSavingTreino(false);
    }
  }
  
  
  useEffect(()=>{
    async function carregarAlunos() {
      try {
        setLoadingStudents(true);
        const alunos=await alunoService.listarAlunos();
        setStudents(alunos);
      } catch(error) {
        console.error("Erro ao carregar alunos:",error);
        setGToast({
          msg:error instanceof Error?error.message:"Erro ao carregar alunos.",
          type:"error",
        });
      } finally {
        setLoadingStudents(false);
      }
    }

    carregarAlunos();
  },[]);

  async function handleCreateStudent(data:CriarAlunoDTO):Promise<boolean> {
    try {
      setSavingStudent(true);
      const novoAluno=await alunoService.criarAluno(data);
      setStudents(prev=>[novoAluno,...prev]);
      setGToast({msg:"Aluno cadastrado com sucesso.",type:"success"});
      return true;
    } catch(error) {
      setGToast({
        msg:error instanceof Error?error.message:"Erro ao cadastrar aluno.",
        type:"error",
      });
      return false;
    } finally {
      setSavingStudent(false);
    }
  }

  async function handleUpdateStudent(
    studentId:string,
    data:AtualizarAlunoDTO,
  ):Promise<boolean> {
    try {
      setSavingStudent(true);
      const alunoAtualizado=await alunoService.atualizarAluno(studentId,data);

      setStudents(prev=>
        prev.map(student=>
          student.id===studentId?alunoAtualizado:student
        )
      );

      setSelS(alunoAtualizado);
      setGToast({msg:"Aluno atualizado com sucesso.",type:"success"});
      return true;
    } catch(error) {
      setGToast({
        msg:error instanceof Error?error.message:"Erro ao atualizar aluno.",
        type:"error",
      });
      return false;
    } finally {
      setSavingStudent(false);
    }
  }

  async function handleDeleteStudent(studentId:string):Promise<void> {
    const confirmar=window.confirm("Deseja realmente excluir este aluno?");

    if(!confirmar) return;

    try {
      setDeletingStudent(true);
      await alunoService.excluirAluno(studentId);

      setStudents(prev=>prev.filter(student=>student.id!==studentId));
      setSelS(null);
      setStudentFormMode(null);
      setScreen("alunos");

      setGToast({msg:"Aluno excluído com sucesso.",type:"success"});
    } catch(error) {
      setGToast({
        msg:error instanceof Error?error.message:"Erro ao excluir aluno.",
        type:"error",
      });
    } finally {
      setDeletingStudent(false);
    }
  }

  const navScreens:Screen[]=["dashboard","alunos","workouts","evolution","notifications","chat","profile"];
  const ut=user?.type??"personal";
  const nav=(s:Screen)=>setScreen(s);

  return (
    <div className="min-h-screen bg-background" style={{fontFamily:"'Inter',sans-serif",maxWidth:"430px",margin:"0 auto",position:"relative"}}>
      {gToast&&<Toast message={gToast.msg} type={gToast.type} onClose={()=>setGToast(null)}/>}
      {modal==="terms"&&<Modal title="Termos de Uso" onClose={()=>setModal(null)}>{TERMS_MD}</Modal>}
      {modal==="privacy"&&<Modal title="Política de Privacidade" onClose={()=>setModal(null)}>{PRIV_MD}</Modal>}

      {screen==="welcome"&&(
        <Welcome
          onContinue={()=>setScreen("login")}
          onLogin={()=>setScreen("login")}
        />
      )}

      {screen==="login"&&(
        <Login
          onLogin={u=>{setUser(u);setScreen("dashboard");}}
          onRegister={()=>setScreen("register")}
          onShowModal={setModal}
          onBack={()=>setScreen("welcome")}
        />
      )}

      {screen==="register"&&(
        <Register
          onDone={()=>setScreen("login")}
          onLogin={()=>setScreen("login")}
          onShowModal={setModal}
        />
      )}

      {screen==="dashboard"&&user&&(
        ut==="personal"
          ? <PersonalDash user={user} onNav={nav} students={students}/>
          : <AlunoDash user={user} onNav={nav}/>
      )}

      {screen==="alunos"&&ut==="personal"&&(
        <AlunosList
          students={students}
          loading={loadingStudents}
          onCreateStudent={()=>setStudentFormMode("create")}
          onSelect={student=>{
            setSelS(student);
            setScreen("aluno-detail");
          }}
        />
      )}

      {screen==="aluno-detail"&&selS&&(
        <AlunoDetail
          student={selS}
          onBack={()=>setScreen("alunos")}
          onNav={nav}
          onEdit={()=>setStudentFormMode("edit")}
          onDelete={()=>handleDeleteStudent(selS.id)}
          onOpenEvaluations={()=>setScreen("evolution")}
          onOpenFinance={() => setFinanceStudent(selS)}
          deleting={deletingStudent}
        />
      )}

      {screen==="criar-treino"&&(
        <CriarTreino
          onBack={()=>setScreen(ut==="personal"?"workouts":"dashboard")}
          exercicios={exercicios}
          loadingExercicios={loadingExercicios}
          saving={savingTreino}
          onSubmit={criarTreinoComExercicios}
        />
      )}

      {screen==="workouts"&&(
        <Workouts
          treinos={treinos}
          loading={loadingTreinos}
          exercicios={exercicios}
          savingExercicio={savingExercicio}
          deletingExercicio={deletingExercicio}
          onSelect={handleSelectTreino}
          onCreateWorkout={()=>setScreen("criar-treino")}
          onCreateExercicio={handleCreateExercicio}
          onUpdateExercicio={handleUpdateExercicio}
          onDeleteExercicio={handleDeleteExercicio}
          ut={ut}
        />
      )}

      {screen==="workout-detail"&&selW&&(
        <WorkoutDetail
          workout={selW}
          exercicios={exercicios}
          loadingExercicios={loadingExercicios}
          savingTreino={savingTreino}
          deletingTreino={deletingTreino}
          savingVinculo={savingExercicioTreino}
          onBack={()=>setScreen("workouts")}
          onUpdateTreino={handleUpdateTreino}
          onDeleteTreino={handleDeleteTreino}
          onAddExercicio={handleAddExercicioTreino}
          onUpdateExercicio={handleUpdateExercicioTreino}
          onRemoveExercicio={handleRemoveExercicioTreino}
          onToast={(m,t)=>setGToast({msg:m,type:t})}
          ut={ut}
        />
      )}

      {screen==="evolution"&&(
        <Evolution
          ut={ut}
          student={ut==="personal"?selS:null}
          onBack={ut==="personal"&&selS?()=>setScreen("aluno-detail"):undefined}
        />
      )}
      {screen==="notifications"&&<Notifications ut={ut}/>}

      {screen==="chat"&&user&&(
        <ChatPage
          user={user}
          ut={ut}
          onBack={()=>setScreen("dashboard")}
        />
      )}

      {screen==="profile"&&user&&(
        <Profile
          user={user}
          onLogout={()=>{setUser(null);setScreen("welcome");}}
        />
      )}

      {studentFormMode==="create"&&(
        <StudentForm
          saving={savingStudent}
          onCancel={()=>setStudentFormMode(null)}
          onSubmit={data=>handleCreateStudent(data as CriarAlunoDTO)}
        />
      )}

      {studentFormMode==="edit"&&selS&&(
        <StudentForm
          student={selS}
          saving={savingStudent}
          onCancel={()=>setStudentFormMode(null)}
          onSubmit={data=>
            handleUpdateStudent(selS.id,data as AtualizarAlunoDTO)
          }
        />
      )}

      {navScreens.includes(screen)&&user&&(
        <BottomNav active={screen} onNav={nav} ut={ut}/>
      )}


      {/* Modal de Gestão Financeira */}
      {financeStudent && (
        <FinanceModal
          student={financeStudent}
          alunosInadimplentes={alunosInadimplentes}
          onClose={() => setFinanceStudent(null)}
          onCadastrar={handleCadastrarMensalidade}
          onDarBaixa={handleDarBaixaMensalidade}
          saving={savingMensalidade}
        />
      )}
      
    </div>
  );
}
