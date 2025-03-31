import { createClient } from '../lib/server'


export const getTargetsByTargetGroupId = async (target_group_id: string | null) => {
  const supabase = await createClient();

  if(!target_group_id) return []

  try {
    const { data, error } = await supabase
      .from('targets')
      .select('id, name, visibility, sort_index')
      .eq('target_group_id', target_group_id)
      .order('sort_index', { ascending: true })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return []
  }
}
