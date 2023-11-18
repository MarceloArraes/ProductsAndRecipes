"use client";

import { api } from "~/trpc/react";

interface Ingredient {
    id: number
    name: string
    costPerKg: number
}

const IngredientTable = () => {

    const {data, refetch} =  api.ingredient.getAllIngredients.useQuery();
    const mutationDeleteIngredient = api.ingredient.deleteIngredient.useMutation({
        onSuccess: async() => {
            await refetch();
          }
    })

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
                    <td className="px-4 border">${ingredient.costPerKg}</td>
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