"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
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
    // <Link href={`/blog/${post.slug}`}>{post.title}</Link>
    return (
<table className="max-w-lg table-auto border-collapse bg-white shadow-md text-black m-10" >
    <thead className="bg-gray-200">
        <tr >
            <th className="px-4 border">Produto</th>
            <th className="px-4 border">Custo por Kg</th>
            <th className="px-4 border">Preco por Kg</th>
            <th className="px-4 border">Delete</th>
        </tr>
    </thead>
    <tbody>
        {data?.map((product: Product) => {
            return (
                <tr key={product.id} className="border-b">
                    <td className="px-4 border"><Link href={`/racoes/${product.id}`}>{product.name}</Link></td>
                    <td className="px-4 border">${product.costPerKg?.toFixed(2)}</td>
                    <td className="px-4 border">${product.sellPricePerKg?.toFixed(2)}</td>
                    <td className="px-4 border">
                        <button 
                            className="text-white bg-red-500 hover:bg-red-700 font-bold py-1 px-3 rounded"
                            onClick={() => deleteRow(product.id)}
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
export default ProductTable