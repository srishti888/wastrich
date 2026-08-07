import { useRef, useEffect, useState } from 'react';
import client from '../api/client';

export default function ClockInSession({ onCompleted }) {
  const [quests, setQuests] = useState([]);
  const [questId, setQuestId] = useState('');
  const [duration, setDuration] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | running | finished
  const intervalRef = useRef(null);

  useEffect(() => {
    client.get('/quests').then((res) => setQuests(res.data));
  }, []);

  useEffect(() => {
  if (status !== 'finished') return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.frequency.value = 880;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}, [status]);

  function start() {
    setSecondsLeft(duration * 60);
    setStatus('running');
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setStatus('finished');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  async function submitOutcome(engaged, interrupted) {
    const { data } = await client.post('/sessions', {
      questId: Number(questId), durationMin: duration, engaged, interrupted,
    });
    setStatus('idle');
    onCompleted(data);
  }

  if (status === 'idle') {
    return (
      <div>
        <select value={questId} onChange={(e) => setQuestId(e.target.value)}>
          <option value="">pick a quest</option>
          {quests.map((q) => <option key={q.id} value={q.id}>{q.name}</option>)}
        </select>
        <input type="number" min="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        <button onClick={start} disabled={!questId}>Start</button>
      </div>
    );
  }

  if (status === 'running') {
    return <p>{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')} remaining</p>;
  }

  return (
    <div>
      <p>Session done — stayed engaged the whole time?</p>
      <button onClick={() => submitOutcome(true, false)}>Yes</button>
      <button onClick={() => submitOutcome(false, true)}>No, got interrupted</button>
    </div>
  );
}