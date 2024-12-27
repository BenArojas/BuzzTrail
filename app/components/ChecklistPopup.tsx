import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Item } from '@prisma/client';

const ItemForm = ({ onClose }) => {
  return (
    <Card className="p-4">
      <Form method="post" className="space-y-4">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input id="name" name="name" required />
        </div>

        <div>
          <Label htmlFor="quantity">Quantity (Optional)</Label>
          <Input id="quantity" name="quantity" type="number" min="1" />
        </div>

        <div>
          <Label htmlFor="price">Price (Optional)</Label>
          <Input id="price" name="price" type="number" />
        </div>

        <div>
          <Label htmlFor="importance">Importance</Label>
          <Select name="importance" required>
            <SelectTrigger>
              <SelectValue placeholder="Select importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="BONUS">Bonus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="w-full">Create Item</Button>
          <Button type="button" variant="outline" onClick={onClose} className="w-full">Cancel</Button>
        </div>
      </Form>
    </Card>
  );
};

type ChecklistPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  items: Array<Item> | undefined; // If `items` can be `undefined`
  adventureId: string | undefined;
};

export const ChecklistPopup: React.FC<ChecklistPopupProps> = ({ isOpen, onClose, items, adventureId }) => {
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  const handleStatusChange = (itemId: String) => {
    // Create a form submission to update the item status
    const form = document.createElement('form');
    form.method = 'post';
    form.action = `/adventures/${adventureId}/items/${itemId}`;

    const methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'patch';

    form.appendChild(methodInput);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>Adventure Checklist</DialogTitle>
          {/* <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="space-y-4">
          {items.map((item: Item) => (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={item?.status === 'COMPLETED'}
                  onCheckedChange={() => handleStatusChange(item.id)}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item?.quantity > 0 ? <span>Quantity: {item.quantity} • </span> : null}
                    Importance: {item?.importance?.toLowerCase()}
                  </p>
                </div>
              </div>
              {item.price && (
                <span className="text-sm font-medium">
                  ${item.price}
                </span>
              )}
            </div>
          ))}

          {!showNewItemForm ? (
            <Button
              onClick={() => setShowNewItemForm(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          ) : (
            <ItemForm onClose={() => setShowNewItemForm(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

