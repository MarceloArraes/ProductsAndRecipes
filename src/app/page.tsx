// Replace CreatePost with CreateIngredient
import { CreateIngredient } from "./_components/create-ingredient";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SigninComponent } from "./_components/Signin-component";
import Title from "./_components/title";
// import { useRouter } from "next/router";

export default function Home() {
  // const router = useRouter();
  
  // Replace the post API call with an ingredient equivalent, if available
  // const helloIngredient = await api.ingredient.hello.query({ text: "from tRPC" });


  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SigninComponent />
    </main>
  );
}

async function IngredientShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  // Update this to fetch the latest ingredient
  // const latestIngredient = await api.ingredient.getLatestIngredient.query();

  return (
    <div className="w-full max-w-xs">
      {/* {latestIngredient ? (
        <p className="truncate">Your most recent ingredient: {latestIngredient.name}</p>
      ) : (
        <p>You have no ingredients yet.</p>
      )} */}

      <CreateIngredient /> 
    </div>
  );
}




