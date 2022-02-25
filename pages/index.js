import Askquestion from "../Components/AskQuestion";
import Header from "../Components/Header";
import Wallet from "../Components/WalletBalance";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Wallet />
      <Askquestion />
      <Footer />
    </div>
  );
}

export default App;
