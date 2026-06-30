export type Screen =
  | "welcome"
  | "login"
  | "register"
  | "dashboard"
  | "alunos"
  | "aluno-detail"
  | "criar-treino"
  | "workouts"
  | "workout-detail"
  | "evolution"
  | "notifications"
  | "profile"
  | "chat";

export type UserType = "personal" | "aluno";

export interface AppUser {
  name: string;
  email: string;
  type: UserType;
}

export interface ExSet {
  serie: number;
  kg: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExSet[];
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  goal: string;
  duration: string;
  exerciseCount: number;
  status: "disponivel" | "andamento" | "concluido";
  exercises: Exercise[];
}

export interface Student {
  id: string;
  name: string;
  status: "em-dia" | "pendente" | "mensalidade" | "sem-atividade";
  workout: string;
  lastSeen: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
  level: string;
}

export interface Notif {
  id: string;
  type: "treino" | "financeiro" | "mensagem" | "evolucao";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface ChatMsg {
  id: string;
  from: UserType;
  senderName: string;
  content: string;
  time: string;
  read: boolean;
}

export interface RegisterStepOneData {
  name: string;
  email: string;
  pw: string;
  confirm: string;
}

export interface RegisterStepTwoData {
  atype: UserType | "";
  goal: string;
  terms: boolean;
}