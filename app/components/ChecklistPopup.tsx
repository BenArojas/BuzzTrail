import { useState } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

type ChecklistItem = {
  id: string
  text: string
  completed: boolean
}

export function ChecklistPopup({ isOpen, onClose, items, onUpdateItems }) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(items)
  const [newItemText, setNewItemText] = useState('')

  const handleItemToggle = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setChecklistItems([...checklistItems, {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false
      }])
      setNewItemText('')
    }
  }

  const handleSave = () => {
    onUpdateItems(checklistItems)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="bg-black [&>button]:hidden"  >
        <DialogHeader>
          <DialogTitle>Packing Checklist</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          {checklistItems.map(item => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => handleItemToggle(item.id)}
              />
              <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {item.text}
              </label>
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Add new item"
              
            />
            <Button onClick={handleAddItem} variant="outline" >
              Add
            </Button>
          </div>
        </div>
        <Button onClick={handleSave} className="w-full mt-4 ">
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  )
}

