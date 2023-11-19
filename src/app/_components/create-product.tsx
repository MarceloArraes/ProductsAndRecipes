"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type IngredientQuantities = Record<string, string>;

export function CreateProduct() {
  // const router = useRouter();
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [ingredientQuantities, setIngredientQuantities] = useState<IngredientQuantities>({});
  const [selectedIngredients, setSelectedIngredients] = useState(new Set<number>())

  const listOfIngredients = api.ingredient.getAllIngredients.useQuery();

  const createProduct= api.product.createProduct.useMutation({
    onSuccess: () => {
      // router.reload();  // Note: 'reload' is used instead of 'refresh' in newer Next.js versions
      setName("");
      setSellPrice("");
      setIngredientQuantities({});
        setSelectedIngredients(new Set<number>());
    },
  });

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

  const prepareIngredientsForSubmission = () => {
    return Object.entries(ingredientQuantities).map(([ingredientId, quantity]) => ({
      ingredientId: parseInt(ingredientId),
      quantity: parseFloat(quantity)
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const preparedIngredients = prepareIngredientsForSubmission();
        createProduct.mutate({ name, sellPricePerKg: parseFloat(sellPrice), ingredients: preparedIngredients });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Nome do Produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="number"
        placeholder="Valor de venda por Kg"
        value={sellPrice}
        onChange={(e) => setSellPrice(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      {listOfIngredients.data?.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedIngredients.has(ingredient.id)}
            onChange={(e) => handleIngredientSelection(ingredient.id, e.target.checked)}
          />
          <label>{ingredient.name}</label>
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

      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createProduct.isLoading}
      >
        {createProduct.isLoading ? "Submitting..." : "Salvar"}
      </button>
    </form>
  );
}
