import { Github } from "lucide-react";
import { TrafficCone } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="flex justify-around items-center p-4">
      <div className="flex gap-x-6">
        <div className="flex gap-x-1">
          <TrafficCone />
          <p className="font-black  font-[Bebas Neue]">Traffic Prediction</p>
        </div>

        <p>Product</p>
        <p>Developers</p>
        <p>Enterprise</p>
        <p>Pricing</p>
        <p>Docs</p>
        <p>Blog</p>
      </div>
      <div className="flex gap-x-6">
        <div className="flex items-center gap-x-1">
          <Github />
          <p>78.5k</p>
        </div>
        <p>Sign In</p>
        <p>Start your Project</p>
      </div>
    </nav>
  );
};

export default NavBar;
