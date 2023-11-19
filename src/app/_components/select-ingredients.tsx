"use client"

import type { Product, ProductIngredient } from "@prisma/client";
import type {ChangeEvent, Dispatch, SetStateAction} from "react";
import { api } from "~/trpc/react";


interface SelectIngredientsProps2 {
  listOfIngredientsOnProduct: ProductIngredient[] | undefined;
  setLocalProduct: Dispatch<SetStateAction<ExtendedProduct | undefined>>;
}

interface ExtendedProduct extends Product {
  ingredients: ProductIngredient[];
}

export const SelectIngredients = ({listOfIngredientsOnProduct, setLocalProduct}:SelectIngredientsProps2) => {
  const {data} = api.ingredient.getAllIngredients.useQuery();
  
  const handleIngredientsInProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const ingredientId = parseInt(e.target.dataset.ingredientid??'');
    if (isNaN(ingredientId)) return;
    const isCheckbox = e.target.type === 'checkbox';

    setLocalProduct(prevState => {
        // If prevState is null, return null
        console.log('prevState ', prevState);
        if (!prevState) return undefined;

        // Handle checkbox change
        if (isCheckbox) {
          const ingredientExists = prevState.ingredients.some(ingredient => ingredient.ingredientId === ingredientId);


            return {
                ...prevState,
                ingredients: ingredientExists
                    ? prevState.ingredients.filter(ingredient => ingredient.ingredientId !== ingredientId)
                    : [...prevState.ingredients, { ingredientId, quantity: 0, productId: prevState.id }]
            };
        }

        // Handle quantity change for existing ingredient
        const quantity = parseInt(e.target.value, 10) || 0;
        return {
            ...prevState,
            ingredients: prevState.ingredients.map(ingredient =>
                ingredient.ingredientId === ingredientId ? { ...ingredient, quantity } : ingredient
            )
        };
    });
};

    return (<div className="flex flex-col max-h-96 flex-wrap columns-2 "> 
        {data?.map((ingredient) => (
        <div key={ingredient.id} className="items-start gap-2 flex-col flex min-w-fit flex-nowrap">
          <div className="flex flex-row" >
          <input
            type="checkbox"
            name="ingredientId"
            data-ingredientid={ingredient.id}
            checked={listOfIngredientsOnProduct?.map((ingredient)=>ingredient.ingredientId).includes(ingredient.id)??false}
            onChange={handleIngredientsInProduct}
            
          />
          <label>{ingredient.name}</label>
          </div>
          {listOfIngredientsOnProduct?.map((productIngredient)=>productIngredient.ingredientId).includes(ingredient.id) && (

            <input
              type="number"
              name="ingredientQuantity"
              data-ingredientid={ingredient.id}
              placeholder="Quantity"
              value={listOfIngredientsOnProduct?.find(productIngredient => productIngredient.ingredientId === ingredient.id)?.quantity.toString() ?? ""}
              onChange={handleIngredientsInProduct}
              className="flex max-w-[80%] rounded-md px-2 py-1  text-black"
            />
          )}
        </div>
      ))}
    </div>)
}