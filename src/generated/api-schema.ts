/**
 * GENERATO AUTOMATICAMENTE da swagger-to-zod — NON MODIFICARE A MANO.
 * * Title: Booking API v2.1.0 (locale: it) · messaggi override: ./messages.json
 * Generato il 2026-10-05 11:33:48 UTC
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
  nominativo: z.string().min(2, "Almeno 2 caratteri richiesti").max(80, "Non puoi superare 80 caratteri").optional(),
  email: z.string().email("Scrivi una email valida, grazie").optional(),
  sala: SalaSchema.optional(),
  dataInizio: z.coerce.date().optional(),
  dataFine: z.coerce.date().optional(),
  posti: z.number().int().min(1, "Il valore minimo è 1").max(50, "Il valore massimo è 50").optional(),
  note: z.string().max(500, "Non puoi superare 500 caratteri").nullable().optional(),
  flagConferma: z.boolean().optional()
}).superRefine((data, ctx) => {
  if (data.nominativo === undefined || data.nominativo === null) {
    ctx.addIssue({ code: 'custom', path: ["nominativo"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.email === undefined || data.email === null) {
    ctx.addIssue({ code: 'custom', path: ["email"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.sala === undefined || data.sala === null) {
    ctx.addIssue({ code: 'custom', path: ["sala"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.dataInizio === undefined || data.dataInizio === null) {
    ctx.addIssue({ code: 'custom', path: ["dataInizio"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.dataFine === undefined || data.dataFine === null) {
    ctx.addIssue({ code: 'custom', path: ["dataFine"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.posti === undefined || data.posti === null) {
    ctx.addIssue({ code: 'custom', path: ["posti"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.flagConferma === undefined || data.flagConferma === null) {
    ctx.addIssue({ code: 'custom', path: ["flagConferma"], message: "Campo obbligatorio: compilalo sì o no?" });
  }
  if (data.dataFine != null && data.dataInizio != null && !(data.dataFine > data.dataInizio)) {
    ctx.addIssue({ code: 'custom', path: ["dataFine"], message: "La data di fine deve essere successiva alla data di inizio" });
  }
  if (data.email != null && data.nominativo != null && !(data.email !== data.nominativo)) {
    ctx.addIssue({ code: 'custom', path: ["email"], message: "L'email non può coincidere con il nominativo" });
  }
});
