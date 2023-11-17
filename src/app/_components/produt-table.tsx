"use client";

import type { Product } from "@prisma/client";
import { api } from "~/trpc/react";

const ProductTable = () => {

    const {data, refetch} =  api.product.getAllProducts.useQuery();
    const mutationDeleteProduct = api.product.deleteProduct.useMutation({
        onSuccess: async() => {
            await refetch();
          }
    })

    const deleteRow =  (id: number) => {
        mutationDeleteProduct.mutate({id:id})
    } 
    // outline-red-600 outline-2 outline
    return (
<table className="max-w-lg table-auto border-collapse bg-white shadow-md text-black m-10 " >
    <thead className="bg-gray-200">
        <tr >
            <th className="px-4 py-2 border">Produto</th>
            <th className="px-4 py-2 border">Preco por Kg</th>
            <th className="px-4 py-2 border">Delete</th>
        </tr>
    </thead>
    <tbody>
        {data?.map((product: Product) => {
            return (
                <tr key={product.id} className="border-b">
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">{product.sellPricePerKg}</td>
                    <td className="px-4 py-2 border">
                        <button 
                            className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                            onClick={() => deleteRow(product.id)}
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
export default ProductTable