import NavBar from "./components/navbar";
import Hero from "./components/hero";
import Predictions from "./components/predictions";
import { useRef } from "react";
import { useEffect, useState } from "react";

function App() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const scrollToPredictions = () => {
    setCanScroll(true);
    document.body.style.overflow = "auto";
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <div>
        <NavBar />
        <Hero onScrollToPredictions={scrollToPredictions} />
        <Predictions ref={tableRef} />
      </div>
    </>
  );
}

export default App;
