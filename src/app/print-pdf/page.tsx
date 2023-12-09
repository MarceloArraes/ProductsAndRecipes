import { getServerAuthSession } from "~/server/auth";
import  PdfOnScreen  from "../_components/pdf-on-screen";
// import { PDFViewer } from "@react-pdf/renderer";
// import { MyDocument } from "../_components/pdf-generator";

const PrintPdf = async(/* {params}:{params:{edit:string}} */) => {
    const session = await getServerAuthSession();
    if (!session?.user) return null;
  


  // { params: { edit: '1' }, searchParams: {} }
    return (
        <main 
        className="flex min-h-screen flex-col bg-gradient-to-b items-center justify-start
         from-[#2e026d] to-[#15162c] text-white"
         >
            <div className="max-w-full">
            
            <PdfOnScreen />
            </div>
            <div className="max-w-lg">
            

            </div>
            
        </main>
      );
}
export default PrintPdf

