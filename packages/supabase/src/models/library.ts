import { createClient } from '../lib/server'


export const getDocumentsByTargetId = async (target_id: string | null) => {
  const supabase = await createClient();

  if(!target_id) return []

  try {
    const { data, error } = await supabase
      .from('library')
      .select('id, course_id, name, filename, content_type, size, type, ext, author')
      .eq('target_id', target_id)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return []
  }
}
