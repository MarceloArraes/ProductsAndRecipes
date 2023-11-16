import { getServerAuthSession } from "~/server/auth";
import { CreateProduct } from "../_components/create-product";
import ProductTable from "../_components/produt-table";

const Ingredients = async() => {
    const session = await getServerAuthSession();

  if (!session?.user) return null;
    return (
        <main className="flex min-h-screen flex-col bg-gradient-to-b items-center justify-start from-[#2e026d] to-[#15162c] text-white">
            <div className="max-w-sm">
            <CreateProduct />

            </div>
            <div className="max-w-lg">
            <ProductTable />
            

            </div>
            
        </main>
      );
}
export default Ingredients

