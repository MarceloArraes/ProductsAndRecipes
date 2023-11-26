import { getServerAuthSession } from "~/server/auth";
import { CreateProduct } from "../_components/create-product";

const Racoes = async() => {
    const session = await getServerAuthSession();

  if (!session?.user) return null;
    return (
        <main className="flex flex-1 min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="justify-center flex  ">
            <CreateProduct />

            </div>
            <div className="max-w-lg">
            {/* <ProductTable /> */}
            

            </div>
            
        </main>
      );
}
export default Racoes

//outline-2 outline-red-500 outline-double