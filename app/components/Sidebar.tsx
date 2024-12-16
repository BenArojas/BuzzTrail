import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar"

type Adventure = {
  id: string
  name: string
}

export function AdventureSidebar({ adventures, onSelectAdventure, onAddAdventure }) {
  const [newAdventureName, setNewAdventureName] = useState('')

  const handleAddAdventure = () => {
    if (newAdventureName.trim()) {
      onAddAdventure({
        id: Date.now().toString(),
        name: newAdventureName.trim()
      })
      setNewAdventureName('')
    }
  }

  return (
    <Sidebar className="bg-black/80 border-r border-yellow-500/50">
      <SidebarHeader className="p-4">
        <h2 className="text-2xl font-bold text-yellow-500">Adventures</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adventures.map(adventure => (
            <SidebarMenuItem key={adventure.id}>
              <SidebarMenuButton onClick={() => onSelectAdventure(adventure.id)}>
                {adventure.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="p-4 space-y-2">
          <Input
            value={newAdventureName}
            onChange={(e) => setNewAdventureName(e.target.value)}
            placeholder="New adventure name"
            className="bg-yellow-500/10 text-yellow-500 placeholder-yellow-500/50"
          />
          <Button onClick={handleAddAdventure} className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Adventure
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

