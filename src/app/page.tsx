import Link from "next/link";
import IngredientTable from "./_components/ingredient-table";
import ProductTable from "./_components/produt-table";
// import { useRouter } from "next/router";

// Replace CreatePost with CreateIngredient
export default function Home() {
  // const router = useRouter();
  
  // Replace the post API call with an ingredient equivalent, if available
  // const helloIngredient = await api.ingredient.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen items-center flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href={'/ingredients'}
        className="rounded-full max-w-xs bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 mt-2"
      >
        Criar Ingredients
      </Link> 
      <Link
        href={'/racoes'}
        className="rounded-full max-w-xs bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 mt-2"
      >
        Criar Racoes
      </Link>
      <div className="flex flex-row max-w-lg justify-around mx-5">
        <IngredientTable />
        <ProductTable />
      </div>
    </main>
  );
}




