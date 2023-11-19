"use client";

import type { Ingredient } from "@prisma/client";
// import {  useEffect, useState } from "react";
import type { ChangeEvent} from "react";
import { api } from "~/trpc/react";

const IngredientTable = () => {
    // const [localIngredients, setLocalIngredients] = useState<Ingredient[]>([])

    const {data, refetch} =  api.ingredient.getAllIngredients.useQuery();
    const mutationDeleteIngredient = api.ingredient.deleteIngredient.useMutation({
        onSuccess: async() => {
            await refetch();
          }
    })
          
    const mutationUpdateIngredient = api.ingredient.updateIngredient.useMutation({
        onSuccess: async() => {
            await refetch();
          }
    })

    // useEffect(() => {
    //   if(data){
    //     setLocalIngredients(data)
    //   }
    
    // }, [data, setLocalIngredients])


    
    const handleChangeCost = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const ingredientId = Number(e.target.dataset.ingredientid)
        // setLocalIngredients((prev: Ingredient[]) => {
        //     const newArray: Ingredient[] = [...prev];
        //     const elementIndex = newArray.findIndex(ingredient => ingredient.id == ingredientId);
          
        //     if (elementIndex !== -1) {
        //       newArray[elementIndex] = {
        //         ...newArray[elementIndex],
        //         costPerKg: value
        //       } as Ingredient;
        //     }
          
        //     return newArray;
        //   });
          mutationUpdateIngredient.mutate({id:ingredientId, costPerKg: value, name: data?.find(ingredient => ingredient.id == ingredientId)?.name})
    }
    const deleteRow =  (id: number) => {
        mutationDeleteIngredient.mutate({id:id})
    } 
    
    return (
<table className="max-w-lg table-auto border-collapse bg-white shadow-md text-black m-10" >
    <thead className="bg-gray-200">
        <tr >
            <th className="px-4 border">Ingrediente</th>
            <th className="px-4 border">Valor por Kg</th>
            <th className="px-4 border">Delete</th>
        </tr>
    </thead>
    <tbody>
        {data?.map((ingredient: Ingredient) => {
            return (
                <tr key={ingredient.id} className="border-b">
                    <td className="px-4 border">{ingredient.name}</td>
                    <td className="px-4 border">${ingredient.costPerKg}
                    <input name="costPerKg" data-ingredientid={ingredient.id} type="number" value={ingredient.costPerKg ?? 0} onChange={handleChangeCost} />
                    </td>
                    <td className="px-4 border">
                        <button 
                            className="text-white bg-red-500 hover:bg-red-700 font-bold py-1 px-3 rounded"
                            onClick={() => deleteRow(ingredient.id)}
                        >
                            X
                        </button>
                    </td>
                </tr>
            )
        })}
    </tbody>
</table>
)}
export default IngredientTable