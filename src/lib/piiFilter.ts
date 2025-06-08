// lib/piiFilter.ts
export function sanitizePII(text: string): string {
  return text
    .replace(/\b\d{5}-\d{7}-\d\b/g, "[REDACTED_CNIC]") 
    .replace(/\b\d{10,13}\b/g, "[REDACTED_PHONE]") 
    .replace(/[\w.-]+@[\w.-]+\.\w+/gi, "[REDACTED_EMAIL]") 
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, "[REDACTED_CREDIT_CARD]"); 
}
