# zod-form-demo

Demo: **React Hook Form** (v7) + validazione **Zod** generata automaticamente da **swagger-to-zod** da uno spec OpenAPI.

## Cosa dimostra

- Gli **schemi Zod** in `src/generated/api-schema.ts` sono generati da `specs/booking.yaml` (non scritti a mano).
- Il form usa `useForm` + `zodResolver<BookingSchema>` → unico punto di verità delle regole di validazione.
- **Messaggi errore custom in italiano** applicati ai constraint (`Il campo è obbligatorio`, `Inserisci un indirizzo email valido`, ecc.).
- **Validazioni cross-field** via `x-validate` nello spec → `.superRefine()` (es. `dataFine > dataInizio`).

## Comandi

```bash
npm install
npm run gen:schema   # rigenera src/generated/api-schema.ts dallo spec (CLI swagger-to-zod)
npm run check        # typecheck
npm run build        # build di produzione (vite)
npm run dev          # dev server
```

`gen:schema` chiama `swagger-to-zod` (path assoluto `/opt/data/swagger-to-zod/src/cli.ts`) con `--locale it`. Dalla stessa spec puoi passare un **URL http/https** al posto del file.

## Struttura

```
specs/booking.yaml          # spec OpenAPI 3.x (enum, date-time, required, x-validate)
src/generated/api-schema.ts # OUTPUT generato (tipi TS + schemi Zod) — non modificare a mano
src/BookingForm.tsx         # form React Hook Form + zodResolver
src/App.tsx / main.tsx      # entry
```

## Spec di esempio (estratto)

```yaml
Prenotazione:
  type: object
  required: [nominativo, email, sala, dataInizio, dataFine, posti, flagConferma]
  properties:
    dataInizio: { type: string, format: date-time }
    dataFine:   { type: string, format: date-time }
  x-validate:
    - field: dataFine
      op: gt
      ref: dataInizio
      message: La data di fine deve essere successiva alla data di inizio
```