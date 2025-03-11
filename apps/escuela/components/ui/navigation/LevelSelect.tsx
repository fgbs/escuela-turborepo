import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"


export function LevelSelect({ levels, selected, onLevelSelected }) {
  return (
    <div className="space-y-0.5">
      <Label htmlFor="level">Modulos</Label>
      
      <Select defaultValue={ selected } onValueChange={ onLevelSelected }>
        <SelectTrigger id="level" className="mt-2">
          <SelectValue placeholder="Selecciona" />
        </SelectTrigger>
        <SelectContent>
          {levels.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}