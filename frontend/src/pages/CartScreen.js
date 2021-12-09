import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { addToCart, removeFromCart } from '../state/actions/cartAction';
import Message from '../components/Message'

function CartScreen() {

    const params = useParams()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();

    var productId = params.id
    var qty = searchParams.get('qty')
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    console.log(cart)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, Number(qty)))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <NavLink to='/'>Go Back</NavLink>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <NavLink to={`/products/${item.product}`}>{item.name}</NavLink>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Row>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </Row>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
