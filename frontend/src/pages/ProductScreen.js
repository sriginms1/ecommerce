import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getProductDetails }  from '../state/actions/productActions'


function ProductScreen() {
    const navigate = useNavigate()
    let params = useParams()

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const {error, loading, product} = productDetail

    const [qty, setQty] = useState(1)
    // const [product, setProduct] = useState([])

    // useEffect(() => {
    //     async function fetchProduct() {
    //         try{
    //             const response = await axios.get(`/api/product/${params.id}/`)
    //             setProduct(response.data)
    //         }
    //         catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     fetchProduct()
    // }, [params.id])

    useEffect(() => {
        dispatch(getProductDetails(params.id))
    },[dispatch, params.id])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Button className='my-3' variant="outline-dark" onClick={() => navigate(-1)}>Go Back</Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                     <ListGroup.Item>
                                         <Row>
                                             <Col>Quantity</Col>
                                             <Col xs="auto" className="my-1">
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                            
                                                        ))
                                                }

                                                </Form.Control>
                                             </Col>
                                         </Row>

                                     </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Button 
                                            disabled={product.countInStock === 0} 
                                            onClick={addToCartHandler}>
                                                Add to Cart
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default ProductScreen
