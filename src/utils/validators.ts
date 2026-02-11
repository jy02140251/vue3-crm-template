/**
 * Form validation utility functions for CRM forms.
 */

export type ValidationResult = { valid: boolean; message?: string };
export type Validator = (value: any) => ValidationResult;

export const required = (fieldName = "Field"): Validator => (value) => {
  if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true };
};

export const minLength = (min: number, fieldName = "Field"): Validator => (value) => {
  if (typeof value === "string" && value.length < min) {
    return { valid: false, message: `${fieldName} must be at least ${min} characters` };
  }
  return { valid: true };
};

export const maxLength = (max: number, fieldName = "Field"): Validator => (value) => {
  if (typeof value === "string" && value.length > max) {
    return { valid: false, message: `${fieldName} must not exceed ${max} characters` };
  }
  return { valid: true };
};

export const email = (): Validator => (value) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (typeof value === "string" && !pattern.test(value)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  return { valid: true };
};

export const phone = (): Validator => (value) => {
  const pattern = /^\+?[\d\s()-]{7,15}$/;
  if (typeof value === "string" && value && !pattern.test(value)) {
    return { valid: false, message: "Please enter a valid phone number" };
  }
  return { valid: true };
};

export const numericRange = (min: number, max: number, fieldName = "Value"): Validator => (value) => {
  const num = Number(value);
  if (isNaN(num) || num < min || num > max) {
    return { valid: false, message: `${fieldName} must be between ${min} and ${max}` };
  }
  return { valid: true };
};

export function validate(value: any, validators: Validator[]): ValidationResult {
  for (const validator of validators) {
    const result = validator(value);
    if (!result.valid) return result;
  }
  return { valid: true };
}

export function validateForm(
  formData: Record<string, any>,
  rules: Record<string, Validator[]>
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [field, validators] of Object.entries(rules)) {
    const result = validate(formData[field], validators);
    if (!result.valid && result.message) {
      errors[field] = result.message;
    }
  }
  return errors;
}