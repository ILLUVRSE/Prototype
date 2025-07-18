import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { ProfileView } from '../components/ProfileView';

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const session = supabase.auth.session();
    setUserId(session?.user.id || null);
  }, []);
  if (!userId) return <div>Please login</div>;
  return <ProfileView userId={userId} />;
}
