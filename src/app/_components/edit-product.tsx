"use client";

import type { Product } from "@prisma/client";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
// import {trpc} from '../api/trpc/[trpc]'
import { api } from "~/trpc/react";
import { SelectIngredients } from "./select-ingredients";
import type { ExtendedProduct } from "./select-ingredients";


export function EditProduct({productId}:{productId: string}) {
  const [localProduct, setLocalProduct] = useState<ExtendedProduct | undefined| null>();
    const numberId = parseInt(productId);
    const {data, isLoading} = api.product.getProductById.useQuery({id:numberId})

    const productMutation = api.product.updateProduct.useMutation()

    useEffect(() => {
      if (data !== null) {
        setLocalProduct(data);
      }
    }, [data])
    

    const handleLocalProductChange = ((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const inputName = e.target.name
      setLocalProduct(prevState => {
        if (!prevState) return prevState;
          return {
              ...prevState,
              [e.target.name]: inputName==='sellPricePerKg'? parseInt(value) : value
          };
      });
  })




  if(isLoading) return null
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('localProduct ', localProduct);
        if(localProduct) productMutation.mutate(localProduct as Product);
      }}
      className="flex flex-col gap-2 w-full"
    >
        <div className="flex flex-col justify-around">
        
        <div className="justify-center items-center">
          <input
              type="text"
              placeholder={localProduct?.name}
              value={localProduct?.name ??''}
              name="name"
              onChange={handleLocalProductChange}
              className="w-full rounded-full px-4 py-2 text-black"
          />
          <input
              type="text"
              name="sellPricePerKg"
              placeholder={localProduct?.sellPricePerKg?.toString()}
              value={localProduct?.sellPricePerKg??''}
              onChange={handleLocalProductChange}
              className="w-full rounded-full px-4 py-2 text-black"
          />
        
      </div>
          <SelectIngredients 
            listOfIngredientsOnProduct={localProduct?.ingredients}
            setLocalProductIngredient={setLocalProduct}

        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Salvar"}
        </button>
      
      </div>
    </form>
  );
}
