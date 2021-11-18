import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap'

import Rating from '../components/Rating'

import axios from 'axios'

function ProductScreen() {
    const navigate = useNavigate()
    let params = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            try{
                const response = await axios.get(`/api/product/${params.id}/`)
                console.log(response)
                setProduct(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchProduct()
    }, [params.id])

    return (
        <div>
            <Button className='my-3' variant="outline-dark" onClick={() => navigate(-1)}>Go Back</Button>
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
                        <ListGroup.Item>
                            <Row>
                                <Button disabled={product.countInStock === 0}>Add to Cart</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default ProductScreen
