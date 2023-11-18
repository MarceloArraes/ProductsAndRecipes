"use client"

import { useState } from "react";
import { api } from "~/trpc/react";

type IngredientQuantities = Record<string, string>;

export const SelectIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState(new Set<number>())
  const [ingredientQuantities, setIngredientQuantities] = useState<IngredientQuantities>({});

  const listOfIngredients = api.ingredient.getAllIngredients.useQuery();

  const handleIngredientSelection = (ingredientId: number, isSelected: boolean) => {
    setSelectedIngredients(prev => {
      const newSet = new Set(prev);
      if (isSelected) newSet.add(ingredientId);
      else newSet.delete(ingredientId);
      return newSet;
    });
    if (!isSelected) {
      setIngredientQuantities(prev => {
        const newState = {...prev};
        delete newState[ingredientId.toString()];
        return newState;
      });
    }
  };

  const handleIngredientChange = (ingredientId: number, quantity: string) => {
    setIngredientQuantities(prev => ({
      ...prev,
      [ingredientId.toString()]: quantity
    }));
  };
  // overflow-auto
    return (<div className="flex flex-col max-h-96 flex-wrap columns-2"> 
        {listOfIngredients.data?.map((ingredient) => (
        <div key={ingredient.id} className="items-center gap-2 flex-col flex min-w-fit flex-nowrap">
          <div className="flex flex-row">
          <input
            type="checkbox"
            checked={selectedIngredients.has(ingredient.id)}
            onChange={(e) => handleIngredientSelection(ingredient.id, e.target.checked)}
            
          />
          <label>{ingredient.name}</label>
          </div>
          {selectedIngredients.has(ingredient.id) && (
            <input
              type="number"
              placeholder="Quantity"
              value={ingredientQuantities[ingredient.id.toString()] ?? ""}
              onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
              className="rounded-full px-2 py-1 text-black"
            />
          )}
        </div>
      ))}
    </div>)
}