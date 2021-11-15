import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Family Mart
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        Contact: sriginms1@gmail.com
                    </Col>
                </Row>

            </Container>
        </footer>
    )
}

export default Footer
