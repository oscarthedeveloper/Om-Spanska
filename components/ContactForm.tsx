'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'error';

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      router.push('/tack');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className={styles.form} name="kontakt" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="kontakt" />
      <p className={styles.honeypot}>
        <label>
          Lämna detta fält tomt
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className={styles.field}>
        <label htmlFor="namn">Ditt namn</label>
        <input id="namn" name="namn" type="text" autoComplete="name" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="epost">Din e-post</label>
        <input id="epost" name="epost" type="email" autoComplete="email" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="meddelande">Ditt meddelande</label>
        <textarea id="meddelande" name="meddelande" rows={7} required />
      </div>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          Meddelandet gick inte iväg. Kontrollera uppkopplingen och försök igen —
          eller mejla direkt till oscarpagerup@gmail.com.
        </p>
      )}

      <button
        type="submit"
        className="pillButton pillButton--primary"
        disabled={status === 'sending'}>
        {status === 'sending' ? 'Skickar…' : 'Skicka'}
      </button>
    </form>
  );
}
