import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Message from "../Message";
import api from "../../services/api";
import { Form, FormGroup, Label, Col, Input, Button, Container } from "reactstrap";

export const CheckoutForm = ({ event, register }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();

    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const handleFormSubmit = async ev => {
        ev.preventDefault();

        const billingDetails = {
            name: ev.target.name.value,
            email: ev.target.email.value,
            address: {
                city: ev.target.city.value,
                line1: ev.target.address.value,
                state: ev.target.state.value,
                postal_code: ev.target.zip.value
            }
        };

        setProcessingTo(true);

        const cardElement = elements.getElement("card");

        try {
            const { data: clientSecret } = await api.post("/payment", {
                event
            });

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            if (error) {
                setCheckoutError(error.message);
                setTimeout(() => {
                    setCheckoutError("");
                }, 3000);
                setProcessingTo(false);
                return;
            }
            register();
        } catch (err) {
            setCheckoutError(err.message);
            setTimeout(() => {
                setCheckoutError("");
            }, 3000);
            setProcessingTo(false);
        }

    }

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup row>
                    <Label for="name" sm={2}>NAME</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="name" placeholder="Enter Name" required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Email" sm={2}>EMAIL</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="Email" placeholder="Enter Email" required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="address" sm={2}>ADDRESS</Label>
                    <Col sm={10}>
                        <Input type="text" name="address" id="address" placeholder="Enter Address" required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="city" sm={2}>CITY</Label>
                    <Col sm={10}>
                        <Input type="text" name="city" id="city" placeholder="Enter City" required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="state" sm={2}>STATE</Label>
                    <Col sm={10}>
                        <Input type="text" name="state" id="state" placeholder="Enter State" required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="ZIP" sm={2}>ZIP</Label>
                    <Col sm={10}>
                        <Input type="text" name="zip" id="ZIP" placeholder="Enter ZIP" required />
                    </Col>
                </FormGroup>
                <br />
                <CardElement
                    options={{ hidePostalCode: true }}
                    onChange={handleCardDetailsChange}
                />
                <br />
                <FormGroup row>
                    <Col sm={{ size: 10, offset: 5 }}>
                        <Button color="danger" disabled={isProcessing || !stripe}>
                            {isProcessing ? "Processing..." : `Pay ₹${event.price}`}
                        </Button>
                    </Col>
                </FormGroup>
                <p style={{ color: "#FF0000" }}>NOTE : Once Payed, Amount will not be refunded .</p>
                {checkoutError && <Message variant='danger'>{checkoutError}</Message>}
            </Form>
        </Container>
    );
};