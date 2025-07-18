import { Router } from 'express';
import { supabase } from '../services/supabaseClient';

const router = Router();

// List missions
router.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('missions').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Create a mission
router.post('/', async (req, res) => {
  const { title, description, xp_reward } = req.body;
  const { data, error } = await supabase
    .from('missions')
    .insert({ title, description, xp_reward })
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
