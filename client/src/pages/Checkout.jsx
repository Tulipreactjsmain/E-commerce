import { useState, useEffect } from "react";
import { PageLayout, Headings } from "../components";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidation";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useStore } from "../config/store";
import { createOrder } from "../config/api";

export default function Checkout() {
  const {
    setShippingDetails,
    shippingDetails,
    paymentMethod,
    setPaymentMethod,
    currentUser,
    priceTotal,
    cartItems,
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: shippingDetails.fullname || "",
      shippingAddress: shippingDetails.shippingAddress || "",
      phone: shippingDetails.phone || "",
      state: shippingDetails.state || "",
    },
  });

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  const paymentOptions = [{ name: "Cash" }, { name: "Paypal" }];

  const tax = 0.05;
  const calcTax = (tax * priceTotal).toFixed(2);
  const calcShippingFee = (priceTotal / 2) * tax;
  const shippingFee = priceTotal > 3500 ? 0 : calcShippingFee.toFixed(2);

  const total = (
    Number(priceTotal) +
    Number(calcTax) +
    Number(shippingFee)
  ).toFixed(2);

  return (
    <PageLayout>
      <Headings title="Checkout" />
      {cartItems?.length > 0 ? (
        <Row className="justify-content-between">
          <Col md={6} lg={5} className="mb-5">
            <h1 className="fs-4">Order summary</h1>
            {cartItems.map((item) => (
              <Row key={item._id} className="py-2">
                <Col md={6}>
                  <p className="mb-0 fs-6">{item.title}</p>
                </Col>
                <Col md={2}>
                  <p className="mb-0 fs-6">Qty: {item.quantity}</p>
                </Col>
                <Col md={4}>
                  <p className="mb-0 fs-6">
                    Price: {formatCurrency(item.price)}
                  </p>
                </Col>
              </Row>
            ))}
            <hr />
            <div className="mt-4">
              <div className="d-flex justify-content-between mb-2 fs-6">
                <p className="mb-0">Subtotal:</p>
                <p>{formatCurrency(priceTotal)}</p>
              </div>
              <div className="d-flex justify-content-between mb-2 fs-6">
                <p className="mb-0">Tax</p>
                <p className="mb-0 text-success">Fixed 0.5</p>
                <p>{formatCurrency(calcTax)}</p>
              </div>
              <div className="d-flex justify-content-between mb-2 fs-6">
                <p className="mb-0"> Shipping Fee</p>

                <p>{formatCurrency(shippingFee)}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2 fs-6">
                <p className="mb-0"> Total</p>

                <p className="fw-bold">{formatCurrency(total)}</p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={5}>
            <form>
              <div className="mb-3 inputRegBox">
                <input
                  type="text"
                  placeholder="Fullname"
                  id="fullname"
                  className="w-100 mb-0 inputReg"
                  autoFocus
                  {...register("fullname")}
                />
              </div>
              <div className="mb-3 inputRegBox">
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  className="w-100 mb-0 inputReg"
                  autoFocus
                  {...register("shippingAddress")}
                />
              </div>
              <div className="mb-3 inputRegBox">
                <input
                  type="text"
                  placeholder="Phone number"
                  id="phone"
                  className="w-100 mb-0 inputReg"
                  autoFocus
                  {...register("phone")}
                />
              </div>
              <div className="mb-3 inputRegBox">
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  className="w-100 mb-0 inputReg"
                  autoFocus
                  {...register("state")}
                />
              </div>
            </form>
          </Col>
        </Row>
      ) : (
        <h1 className="text-center fs-4">
          {" "}
          You have no orders yet . Pls add a few items to your bag
        </h1>
      )}
    </PageLayout>
  );
}
