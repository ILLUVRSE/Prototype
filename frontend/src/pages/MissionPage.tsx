import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface Mission {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
}

export default function MissionPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(0);

  useEffect(() => {
    supabase.from('missions').select('*').then(({ data }) => setMissions(data || []));
  }, []);

  const createMission = async () => {
    const { data } = await supabase.from('missions').insert({ title, description, xp_reward: xpReward }).single();
    if (data) setMissions((m) => [...m, data]);
  };

  return (
    <div>
      <h2>Create Mission</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={xpReward} onChange={(e) => setXpReward(Number(e.target.value))} placeholder="XP Reward" />
      <button onClick={createMission}>Create</button>
      <h2>Available Missions</h2>
      <ul>
        {missions.map((m) => (
          <li key={m.id}>{m.title} - {m.description} ({m.xp_reward} XP)</li>
        ))}
      </ul>
    </div>
  );
}
