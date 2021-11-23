import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import CartScreen from './pages/CartScreen'

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Container>
          <main className="py-3">
            <Routes>
              <Route path="/" element={<HomeScreen/>} exact/>
              <Route path="/product/:id" element={<ProductScreen/>}/>
              <Route path="/cart/" element={<CartScreen/>}/>
              <Route path="/cart/:id/" element={<CartScreen/>}/>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </main>
        </Container>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
