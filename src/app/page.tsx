import Link from "next/link";

// Replace CreatePost with CreateIngredient
export default function Home() {
  // const router = useRouter();
  
  // Replace the post API call with an ingredient equivalent, if available
  // const helloIngredient = await api.ingredient.hello.query({ text: "from tRPC" });


  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href={'/ingredients'}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Ingredients
      </Link>
    </main>
  );
}




