import { useEffect, useState } from 'react';
import client from '../api/client';
import ClockInSession from '../components/ClockInSession';

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    client.get('/sessions').then((res) => setSessions(res.data));
  }, []);

  function handleCompleted(session) {
    setSessions((prev) => [session, ...prev]);
  }

  return (
    <div>
      <ClockInSession onCompleted={handleCompleted} />
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>{s.quest.name} — {s.durationMin}min — {s.engaged ? 'engaged' : 'interrupted'}</li>
        ))}
      </ul>
    </div>
  );
}