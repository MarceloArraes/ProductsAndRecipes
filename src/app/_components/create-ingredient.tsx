"use client";

// import { useRouter } from "next/router";
import { useState } from "react";
// import {trpc} from '../api/trpc/[trpc]'
import { api } from "~/trpc/react";

export function CreateIngredient() {
  // const router = useRouter();
  const [name, setName] = useState("");
  const [costPerKg, setCostPerKg] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const createIngredient = api.ingredient.createIngredient.useMutation({
    onSuccess: () => {
      // router.reload();  // Note: 'reload' is used instead of 'refresh' in newer Next.js versions
      setName("");
      setCostPerKg("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createIngredient.mutate({ name, costPerKg: parseFloat(costPerKg) });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Ingredient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="number"
        placeholder="Cost per Kg"
        value={costPerKg}
        onChange={(e) => setCostPerKg(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createIngredient.isLoading}
      >
        {createIngredient.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
