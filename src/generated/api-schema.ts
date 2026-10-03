/**
 * GENERATO AUTOMATICAMENTE da swagger-to-zod — NON MODIFICARE A MANO.
 * * Title: Booking API v2.1.0 (locale: it)
 * Generato il 2026-10-03 15:15:07 UTC
 * Stack: Zod (React Hook Form) + TypeScript
 */
import { z } from 'zod';

/* ============================ TIPI ============================ */

export type Sala = string;
export type Prenotazione = {
  nominativo: string,
  email: string,
  sala: Sala,
  dataInizio: string,
  dataFine: string,
  posti: number,
  note?: string | null,
  flagConferma: boolean
};

/* ========================= SCHEMI ZOD ========================= */

export const SalaSchema = z.enum(["AULA_A", "AULA_B", "LAB"]);
export const PrenotazioneSchema = z.object({
  nominativo: z.string().min(2, "Deve contenere almeno 2 caratteri").max(80, "Non può superare 80 caratteri").optional(),
  email: z.string().email("Inserisci un indirizzo email valido").optional(),
  sala: SalaSchema.optional(),
  dataInizio: z.coerce.date().optional(),
  dataFine: z.coerce.date().optional(),
  posti: z.number().int().min(1, "Il valore deve essere maggiore o uguale a 1").max(50, "Il valore deve essere minore o uguale a 50").optional(),
  note: z.string().max(500, "Non può superare 500 caratteri").nullable().optional(),
  flagConferma: z.boolean().optional()
}).superRefine((data, ctx) => {
  if (data.nominativo === undefined || data.nominativo === null) {
    ctx.addIssue({ code: 'custom', path: ["nominativo"], message: "Il campo è obbligatorio" });
  }
  if (data.email === undefined || data.email === null) {
    ctx.addIssue({ code: 'custom', path: ["email"], message: "Il campo è obbligatorio" });
  }
  if (data.sala === undefined || data.sala === null) {
    ctx.addIssue({ code: 'custom', path: ["sala"], message: "Il campo è obbligatorio" });
  }
  if (data.dataInizio === undefined || data.dataInizio === null) {
    ctx.addIssue({ code: 'custom', path: ["dataInizio"], message: "Il campo è obbligatorio" });
  }
  if (data.dataFine === undefined || data.dataFine === null) {
    ctx.addIssue({ code: 'custom', path: ["dataFine"], message: "Il campo è obbligatorio" });
  }
  if (data.posti === undefined || data.posti === null) {
    ctx.addIssue({ code: 'custom', path: ["posti"], message: "Il campo è obbligatorio" });
  }
  if (data.flagConferma === undefined || data.flagConferma === null) {
    ctx.addIssue({ code: 'custom', path: ["flagConferma"], message: "Il campo è obbligatorio" });
  }
  if (data.dataFine != null && data.dataInizio != null && !(data.dataFine > data.dataInizio)) {
    ctx.addIssue({ code: 'custom', path: ["dataFine"], message: "La data di fine deve essere successiva alla data di inizio" });
  }
  if (data.email != null && data.nominativo != null && !(data.email !== data.nominativo)) {
    ctx.addIssue({ code: 'custom', path: ["email"], message: "L'email non può coincidere con il nominativo" });
  }
});
