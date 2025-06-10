import CoffeeForm from "./components/CoffeeForm";
import Hero from "./components/Hero";
import History from "./components/History";
import Layout from "./components/Layout";
import Stats from "./components/Stats";


function App() {

  const isAunthenticated = false;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <div className="h-screen overflow-y-auto overscroll-none">
      <Layout>
        <Hero />
        <CoffeeForm isAunthenticated={isAunthenticated}/>
        {isAunthenticated && (authenticatedContent)}
      </Layout>
    </div>
  )
}

export default App
