import Navbar from "./Navbar";
import Landing from "./Home/Landing";
import About from "./Home/About";

import Products from "./Products";
function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Landing/>
      <Products/>
      <About/>
     
    </div>
  );
}

export default Home;
