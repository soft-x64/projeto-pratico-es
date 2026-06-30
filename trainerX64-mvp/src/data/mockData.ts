import type { ChatMsg, Notif, Student, Workout } from "../types/app";

export const STUDENTS: Student[] = [
  { id:"s1", name:"Gustavo", status:"em-dia",        workout:"Upper",     lastSeen:"Hoje",   weight:82, height:178, age:27, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s2", name:"Serena",  status:"pendente",      workout:"Full Body", lastSeen:"Ontem",  weight:65, height:165, age:24, goal:"Emagrecimento",  level:"Iniciante"     },
  { id:"s3", name:"Gabriel", status:"mensalidade",   workout:"Pull 1",    lastSeen:"3 dias", weight:75, height:172, age:30, goal:"Condicionamento",level:"Avançado"      },
  { id:"s4", name:"Lucas",   status:"sem-atividade", workout:"Leg Day",   lastSeen:"7 dias", weight:90, height:182, age:32, goal:"Hipertrofia",    level:"Intermediário" },
  { id:"s5", name:"Carla",   status:"em-dia",        workout:"Push 2",    lastSeen:"Hoje",   weight:58, height:160, age:26, goal:"Saúde",          level:"Iniciante"     },
];

export const WORKOUTS: Workout[] = [
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

export const NOTIFS: Notif[] = [
  { id:"n1", type:"treino",     title:"Novo treino publicado", description:"Rafael publicou nova rotina: Push 2.",           time:"Há 10 min",    read:false },
  { id:"n2", type:"treino",     title:"Treino disponível",     description:"Sua rotina Upper está pronta para começar.",     time:"Há 1 hora",    read:false },
  { id:"n3", type:"financeiro", title:"Mensalidade pendente",  description:"Vencimento em 3 dias. Regularize o acesso.",     time:"Há 2 horas",   read:false },
  { id:"n4", type:"evolucao",   title:"Evolução registrada",   description:"Serena registrou evolução. Peso: 65 kg.",        time:"Ontem, 18:30", read:true  },
  { id:"n5", type:"mensagem",   title:"Mensagem do personal",  description:"Rafael: Ótimo treino! Continue assim, Gustavo.", time:"Ontem, 15:00", read:true  },
];
export const CHAT_MOCK: ChatMsg[] = [
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

export const WEEK = [{day:"Seg",v:3200},{day:"Ter",v:0},{day:"Qua",v:4100},{day:"Qui",v:3800},{day:"Sex",v:0},{day:"Sáb",v:4500},{day:"Dom",v:0}];
export const MONTHS= [{m:"Jan",p:78},{m:"Fev",p:77.2},{m:"Mar",p:76.5},{m:"Abr",p:75.8},{m:"Mai",p:75.1},{m:"Jun",p:74.6}];
export const ALL_EX = [
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

