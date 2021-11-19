import {React, useEffect}  from 'react'
import {Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'


import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductList } from '../state/actions/productActions'

function HomeScreen() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductList())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    return (
        <div>
            <h1>Products</h1>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
                </Row>
            )   
        }
        </div>
    )
}

export default HomeScreen
