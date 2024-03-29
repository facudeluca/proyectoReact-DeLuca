import React, { useContext, useState, useEffect } from "react";
import ItemCounter from "../ItemCount";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import { CartContext } from "../../context/CartContext";

function ItemDetail({ name, img, brand, weight, stock, info, price, id }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const itemData = { name, img, price, id, weight, stock };
  const { cart } = useContext(CartContext);
  const [cantStock, setCantStock] = useState(stock);


  const onAddItems = () => {
    setAddedToCart(true);
  };
  const showModal = () => {
    setSmShow(true);
    setTimeout(() => {
      setSmShow(false);
    }, 1500);
  };


  useEffect(() => {
    cart.forEach((e) => {
      if (e.id === itemData.id) {
        setCantStock(e.stock - e.contador);
      }
    });
  }, [cart]);

  
  return (
    <div className="itemDetail">
      <Link to="/" id="backButton">
        <RiArrowGoBackFill />
      </Link>
      <img src={img} alt={name} />
      <div className="item__info">
        <h1>{name}</h1>
        <h5>{brand}</h5>
        <hr />
        <div className="price">
          <div className="price__data">
            <h2>{`$ ${price}`}</h2>
            <p>por bolsa de: {weight}</p>
          </div>
          <h6>En stock: {cantStock} unidades</h6>
        </div>
        <hr />
        {addedToCart ? (
          <div className="bntAddedContainer">
            <Link to="/cart">
              <button className="btnAdded">Ir al carrito</button>
            </Link>
            <Link to="/">
              <button className="btnAdded">Continuar comprando</button>
            </Link>
          </div>
        ) : (
          <ItemCounter
            className="counter"
            itemData={itemData}
            onAddToCart={onAddItems}
            onAddShowModal={showModal}
          />
        )}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Descripción</Accordion.Header>
            <Accordion.Body>{info}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Modal
        size="m"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="modalAdd"
      >
        <Modal.Body>
          Has agregado <span>{name}</span> a tu carrito
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ItemDetail;
