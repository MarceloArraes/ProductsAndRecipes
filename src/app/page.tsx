// Replace CreatePost with CreateIngredient
import { CreateIngredient } from "./_components/create-ingredient";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SigninComponent } from "./_components/Signin-component";
// import { useRouter } from "next/router";

export default function Home() {
  // const router = useRouter();
  
  // Replace the post API call with an ingredient equivalent, if available
  // const helloIngredient = await api.ingredient.hello.query({ text: "from tRPC" });


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SigninComponent />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Bom <span className="text-[hsl(280,100%,70%)]">de Bico</span> 
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {/* {hello ? hello.greeting : "Loading tRPC query..."} */}
          </p>


        </div>
        </div>
      <IngredientShowcase />
    </main>
  );
}

async function IngredientShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  // Update this to fetch the latest ingredient
  const latestIngredient = await api.ingredient.getLatestIngredient.query();

  return (
    <div className="w-full max-w-xs">
      {latestIngredient ? (
        <p className="truncate">Your most recent ingredient: {latestIngredient.name}</p>
      ) : (
        <p>You have no ingredients yet.</p>
      )}

      <CreateIngredient /> 
    </div>
  );
}




