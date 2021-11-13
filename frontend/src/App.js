import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header/>
      <main>
          <Container className="py-4">
            <h1>
              My Application
            </h1>
          </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
