export default function Heatmap({ hourly }) {
  const max = Math.max(1, ...hourly);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {hourly.map((count, hour) => (
        <div
          key={hour}
          title={`${hour}:00 — ${count}`}
          style={{ width: 20, height: 20, background: `rgba(136,132,216,${count / max})`, border: '1px solid #ccc' }}
        />
      ))}
    </div>
  );
}