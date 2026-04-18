export interface PersonFormModel {
  dni: string;
  name: string;
  apellido: string;
  direccion: string;
  telefono: string;
  tel_fijo: string;
  email: string;
  password: string;
  type_user?: string;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function createPersonForm(typeUser = ''): PersonFormModel {
  return {
    dni: '',
    name: '',
    apellido: '',
    direccion: '',
    telefono: '',
    tel_fijo: '',
    email: '',
    password: '',
    type_user: typeUser,
  };
}

export function sanitizeDigits(value: string | null | undefined, maxLength: number): string {
  return (value ?? '').replace(/\D/g, '').slice(0, maxLength);
}

export function sanitizeEmail(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

export function hasExactDigits(value: string | null | undefined, length: number): boolean {
  return new RegExp(`^\\d{${length}}$`).test(value ?? '');
}

export function isValidEmail(value: string | null | undefined): boolean {
  return EMAIL_REGEX.test(sanitizeEmail(value));
}

export function isValidPersonForm(model: PersonFormModel, requirePassword = true): boolean {
  const passwordValid = requirePassword ? !!model.password.trim() : true;

  return (
    hasExactDigits(model.dni, 8) &&
    hasExactDigits(model.telefono, 9) &&
    hasExactDigits(model.tel_fijo, 7) &&
    isValidEmail(model.email) &&
    !!model.name.trim() &&
    !!model.apellido.trim() &&
    !!model.direccion.trim() &&
    passwordValid
  );
}
