import { Router } from 'express';
import { supabase } from '../services/supabaseClient';

const router = Router();

// Get user profile
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Update avatar and xp
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { avatar_url, xp } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .update({ avatar_url, xp })
    .eq('id', id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
