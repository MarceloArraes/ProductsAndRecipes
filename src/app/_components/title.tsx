import { SigninComponent } from "./Signin-component"

const Title = () => {

    return (
    <div className="container flex flex-row items-center  px-4 py-4 ">
      <SigninComponent />
    <h1 className="flex-1 text-5xl font-extrabold tracking-tight sm:text-[5rem] text-white">
      Bom <span className="text-[hsl(226,100%,70%)]">de Bico</span> 
    </h1>
    
    </div>)
}

export default Title

// <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

/* </div>
<div className="flex flex-col items-center gap-2">
  <p className="text-2xl text-white">*/
    {/* {hello ? hello.greeting : "Loading tRPC query..."} */}
 /*  </p>


</div>  */