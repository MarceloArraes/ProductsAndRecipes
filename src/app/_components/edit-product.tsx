"use client";

import { Product } from "@prisma/client";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import {trpc} from '../api/trpc/[trpc]'
import { api } from "~/trpc/react";
import { SelectIngredients } from "./select-ingredients";

export function EditProduct({productId}:{productId: string}) {
  const [localProduct, setLocalProduct] = useState<Product | null>();
    const numberId = parseInt(productId);
    console.log('numberId ', numberId);
    const {data, isLoading} = api.product.getProductById.useQuery({id:numberId})
    const productMutation = api.product.updateProduct.useMutation()

    useEffect(() => {
      setLocalProduct(data)
    }, [data])
    
    console.log('data EDITPRODUCT ', data);
    // const handleProductEdit = (productId) => {

    //   productMutation.mutate({id: productId})
    // }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const createIngredient = api.ingredient.createIngredient.useMutation({
//     onSuccess: () => {
//       // router.reload();  // Note: 'reload' is used instead of 'refresh' in newer Next.js versions
//       setName("");
//       setCostPerKg("");
//     },
//   });
  console.log('data251213 ', localProduct, productId);
  if(isLoading) return null
  return (
    <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createIngredient.mutate({ name, costPerKg: parseFloat(costPerKg) });
    //   }}
      className="flex flex-col gap-2 w-full"
    >
        <div className="flex flex-col justify-around">
        
        <div className="justify-center items-center">
          <input
              type="text"
              placeholder={data?.name}
              value={data?.name}
              onChange={(e) => console.log('asd')}
              className="w-full rounded-full px-4 py-2 text-black"
          />
          <input
              type="text"
              placeholder={data?.sellPricePerKg?.toString()}
              value={data?.sellPricePerKg}
              onChange={(e) => console.log('asd')
              }
              className="w-full rounded-full px-4 py-2 text-black"
          />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={isLoading}
        >
          {/* {createIngredient.isLoading ? "Submitting..." : "Salvar"} */}Salvar
        </button>
        
      </div>
      <SelectIngredients />
      </div>
    </form>
  );
}
