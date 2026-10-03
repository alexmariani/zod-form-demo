import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PrenotazioneSchema } from './generated/api-schema';

type PrenotazioneInput = z.input<typeof PrenotazioneSchema>;
type FieldErrorsRecord = Record<string, { message?: string } | undefined>;

const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);
const postiValue = (v: unknown) => (v === '' ? undefined : Number(v));

const cast = { setValueAs: emptyToUndefined };
const castPosti = { setValueAs: postiValue };

const salaLabels: Record<string, string> = {
  AULA_A: 'Aula A',
  AULA_B: 'Aula B',
  LAB: 'Laboratorio',
};

export function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrenotazioneInput>({
    resolver: zodResolver(PrenotazioneSchema),
  });

  const err = (name: string): string | undefined =>
    (errors as FieldErrorsRecord)[name]?.message;

  const onSubmit = (data: PrenotazioneInput) => {
    alert('Prenotazione valida ✓\n' + JSON.stringify(data, null, 2));
  };

  const flagConferma = register('flagConferma', {
    setValueAs: (v: unknown) => v === true || v === 'on',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-4">Prenotazione sala</h2>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          {...register('email', cast)}
          id="email"
          type="email"
          className={`form-control ${err('email') ? 'is-invalid' : ''}`}
        />
        {err('email') && <div className="invalid-feedback">{err('email')}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="nominativo" className="form-label">
          Nominativo *
        </label>
        <input
          {...register('nominativo', cast)}
          id="nominativo"
          type="text"
          className={`form-control ${err('nominativo') ? 'is-invalid' : ''}`}
        />
        {err('nominativo') && <div className="invalid-feedback">{err('nominativo')}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="sala" className="form-label">
          Sala *
        </label>
        <select
          {...register('sala', cast)}
          id="sala"
          className={`form-select ${err('sala') ? 'is-invalid' : ''}`}
        >
          <option value="">Seleziona…</option>
          {Object.keys(salaLabels).map((s) => (
            <option key={s} value={s}>
              {salaLabels[s]}
            </option>
          ))}
        </select>
        {err('sala') && <div className="invalid-feedback">{err('sala')}</div>}
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="dataInizio" className="form-label">
            Data inizio *
          </label>
          <input
            {...register('dataInizio', cast)}
            id="dataInizio"
            type="datetime-local"
            className={`form-control ${err('dataInizio') ? 'is-invalid' : ''}`}
          />
          {err('dataInizio') && <div className="invalid-feedback">{err('dataInizio')}</div>}
        </div>
        <div className="col">
          <label htmlFor="dataFine" className="form-label">
            Data fine *
          </label>
          <input
            {...register('dataFine', cast)}
            id="dataFine"
            type="datetime-local"
            className={`form-control ${err('dataFine') ? 'is-invalid' : ''}`}
          />
          {err('dataFine') && <div className="invalid-feedback">{err('dataFine')}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="posti" className="form-label">
          Posti * (1–50)
        </label>
        <input
          {...register('posti', castPosti)}
          id="posti"
          type="number"
          min={1}
          max={50}
          className={`form-control ${err('posti') ? 'is-invalid' : ''}`}
        />
        {err('posti') && <div className="invalid-feedback">{err('posti')}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="note" className="form-label">
          Note
        </label>
        <textarea
          {...register('note', cast)}
          id="note"
          className={`form-control ${err('note') ? 'is-invalid' : ''}`}
          rows={2}
        />
        {err('note') && <div className="invalid-feedback">{err('note')}</div>}
      </div>

      <div className="form-check mb-3">
        <input
          {...flagConferma}
          id="flagConferma"
          type="checkbox"
          className="form-check-input"
        />
        <label htmlFor="flagConferma" className="form-check-label">
          Dichiaro di poter prenotare questa sala *
        </label>
        {err('flagConferma') && <div className="invalid-feedback">{err('flagConferma')}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Invia
      </button>
      <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
}