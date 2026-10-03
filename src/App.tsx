import { BookingForm } from './BookingForm.tsx';

export function App() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}