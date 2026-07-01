import type { UserType } from "../types/app";

export const PERSONAL_COLOR = "#38BDF8";
export const ALUNO_COLOR = "#00E676";

export const AC = (type: UserType) =>
  type === "personal" ? PERSONAL_COLOR : ALUNO_COLOR;

export const AC_BG = (type: UserType, opacity = 0.12) =>
  type === "personal"
    ? `rgba(56,189,248,${opacity})`
    : `rgba(0,230,118,${opacity})`;

export const GRAD = (type: UserType) =>
  type === "personal"
    ? "linear-gradient(90deg,#38BDF8,#1296F3)"
    : "linear-gradient(90deg,#00E676,#34d399)";

export const PROFILE_LABEL = (type: UserType) =>
  type === "personal" ? "Personal Trainer" : "Aluno";

export const PROFILE_SHORT_LABEL = (type: UserType) =>
  type === "personal" ? "Personal" : "Aluno";