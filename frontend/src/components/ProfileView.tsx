import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { AvatarSelector } from './AvatarSelector';

export function ProfileView({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<{ id: string; avatar_url: string; xp: number } | null>(null);
  const [avatars] = useState([
    '/avatars/a.png',
    '/avatars/b.png',
    '/avatars/c.png'
  ]);

  useEffect(() => {
    supabase.from('profiles').select('*').eq('id', userId).single().then(({ data }) => setProfile(data));
  }, [userId]);

  const updateProfile = async (avatar_url: string) => {
    const { data } = await supabase.from('profiles').update({ avatar_url }).eq('id', userId).single();
    setProfile(data);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>XP: {profile.xp}</h2>
      <AvatarSelector avatars={avatars} value={profile.avatar_url} onChange={updateProfile} />
    </div>
  );
}
