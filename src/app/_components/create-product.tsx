"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/trpc/react";
import { SelectIngredients } from "./select-ingredients";
import { Product, ProductIngredient } from "@prisma/client";

type IngredientQuantities = Record<string, string>;

interface ExtendedProduct extends Product {
  ingredients: ProductIngredient[];
}

export function CreateProduct() {
  // const router = useRouter();
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<ExtendedProduct | null>()

  // const listOfIngredients = api.ingredient.getAllIngredients.useQuery();

  const createProduct= api.product.createProduct.useMutation({
    onSuccess: () => {
      // router.reload();  // Note: 'reload' is used instead of 'refresh' in newer Next.js versions
      setName("");
      setSellPrice("");
      setSelectedIngredients(null);
    },
  });

  const prepareIngredientsForSubmission = () => {
    return selectedIngredients?.ingredients?.map((ingredient) => ({
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.quantity
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const preparedIngredients = prepareIngredientsForSubmission();
        console.log('selectedIngredients ',selectedIngredients);
        console.log('preparedIngredients ',preparedIngredients);
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

      <SelectIngredients 
            listOfIngredientsOnProduct={selectedIngredients?.ingredients}
             setLocalProductIngredient={setSelectedIngredients}
        />
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
