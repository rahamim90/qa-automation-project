import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';

export default function AdminLogin({ onLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.adminLogin(username.trim(), password);
      onLoggedIn();
      navigate('/admin');
    } catch (err) {
      setError('שם משתמש או סיסמה שגויים');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="mb-6 text-center text-2xl text-gold">כניסת ספרים</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-cream/70" htmlFor="username">
            שם משתמש
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gold/20 bg-charcoal px-4 py-2 text-cream focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-cream/70" htmlFor="password">
            סיסמה
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gold/20 bg-charcoal px-4 py-2 text-cream focus:border-gold focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-gold py-3 font-medium text-charcoal transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {submitting ? 'מתחבר...' : 'התחברות'}
        </button>
      </form>
    </div>
  );
}
