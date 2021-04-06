import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import item from './images/checkout_banner_2.jpg';
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal"
function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src={item}
                    alt=""
                />
                <div>
                    <h3> Hello!! {user?.email}</h3>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>

                    {basket.map(item => (
                        <CheckoutProduct
                            p_id={item.p_id}
                            u_id={item.u_id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            trading_place={item.trading_place}
                            phone_number={item.phone_number}
                        />
                    ))}
                </div>
            </div>
            
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
