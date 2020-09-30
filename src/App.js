import React from "react";
import Footer from "../src/components/footer";
import Page from "../src/components/page";
import Header from "../src/components/header";

function App() {
  return (
    <React.Fragment>
      <div className="warpper">
        <Header />
        <Page />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
