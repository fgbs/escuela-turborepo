import { createClient } from '../lib/server'


export const getTargetGroupsByCourseId = async (course_id: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('target_groups')
      .select(`
        id, name, visibility, sort_index,
        levels!inner(id, name)
      `)
      .eq('levels.course_id', course_id)
      .order('sort_index', { ascending: true })

    if (error) throw error

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return []
  }
}
