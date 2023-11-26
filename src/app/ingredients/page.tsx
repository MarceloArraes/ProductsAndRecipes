import { getServerAuthSession } from "~/server/auth";
import { CreateIngredient } from "../_components/create-ingredient";
import {IngredientTable} from "../_components/ingredient-table";

const Ingredients = async() => {
    const session = await getServerAuthSession();

  if (!session?.user) return null;
    return (
        <main className="flex min-h-screen flex-col bg-gradient-to-b items-center justify-start from-[#2e026d] to-[#15162c] text-white">
            <div className="max-w-sm">
            <CreateIngredient />
            </div>
            <div className="max-w-lg">
            <IngredientTable />
            

            </div>
            
        </main>
      );
}
export default Ingredients

