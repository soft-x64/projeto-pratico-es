import type {
  RegisterStepOneData,
  RegisterStepTwoData,
} from "../types/app";

export function validateRegisterStepOne(
  data: RegisterStepOneData
): Record<string, string> {
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

export function validateRegisterStepTwo(
  data: RegisterStepTwoData
): Record<string, string> {
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