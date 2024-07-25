import Link from "next/link";
import { IngredientTable } from "./_components/ingredient-table";
import { ProductTable } from "./_components/produt-table";
// import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
// import { useRouter } from "next/router";

// Replace CreatePost with CreateIngredient
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  console.log("session on HOME", session);
  // const router = useRouter();

  // Replace the post API call with an ingredient equivalent, if available
  // const helloIngredient = await api.ingredient.hello.query({ text: "from tRPC" });

  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href={"/ingredients"}
        className="mt-2 max-w-xs rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Criar Ingredients
      </Link>
      <Link
        href={"/racoes"}
        className="mt-2 max-w-xs rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Criar Racoes
      </Link>
      <Link
        href={"/print-pdf"}
        className="mt-2 max-w-xs rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Imprimir Formulacoes
      </Link>
      <div className="mx-5 flex flex-row flex-wrap justify-around">
        <ProductTable />
        <IngredientTable />
      </div>
    </main>
  );
}
