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
            <th className="px-4 py-2 border">Ingrediente</th>
            <th className="px-4 py-2 border">Valor por Kg</th>
            <th className="px-4 py-2 border">Delete</th>
        </tr>
    </thead>
    <tbody>
        {data?.map((ingredient: Ingredient) => {
            return (
                <tr key={ingredient.id} className="border-b">
                    <td className="px-4 py-2 border">{ingredient.name}</td>
                    <td className="px-4 py-2 border">{ingredient.costPerKg}</td>
                    <td className="px-4 py-2 border">
                        <button 
                            className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                            onClick={() => deleteRow(ingredient.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })}
    </tbody>
</table>
)}
export default IngredientTable