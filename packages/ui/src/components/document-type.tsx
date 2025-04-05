import { CassetteTape, ExternalLink, Paperclip } from "lucide-react";
import { SiYoutube } from '@icons-pack/react-simple-icons';


export const DocumentTypeIcon = ({type, props}: {type: string, props: string}) => {
  switch(type) {
    case 'document':
      return <Paperclip {...props} />
    case 'youtube':
      return <SiYoutube {...props} />
    case 'audio':
      return <CassetteTape {...props} />
    case 'link':
      return <ExternalLink {...props} />
    default:
      return <ExternalLink {...props} />
  }
}
