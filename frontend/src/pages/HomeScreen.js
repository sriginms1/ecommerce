import {React, useState, useEffect}  from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'

function HomeScreen() {

    const [products, setproducts] = useState([])

    useEffect(() => {
        async function retrieveProductList() {
            try {
                const response = await axios.get('/api/products/');
                setproducts(response.data)
              } catch (error) {
                console.error(error);
              }
        }
        retrieveProductList()      
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
