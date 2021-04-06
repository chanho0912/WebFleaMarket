import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({u_id, p_id, image, title, price, rating, trading_place, phone_number}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            p_id: p_id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img className='checkoutProduct__image' src={image} />
            <div className='checkoutProduct__info'>
                <div className='checkoutProduct__title'>
                    <p><strong>Product Name: </strong>{title}</p></div>
                <div className='checkoutProduct__price'>
                    <p><strong>Price: ${price}</strong></p>
                </div>
                <br></br>
                <div className='checkoutProduct__tradingplace'>
                    <p>trading place: {trading_place}</p>
                </div>
                <div className='checkoutProduct__phonenumber'>
                    <p>phone number: {phone_number}</p>
                </div>
                <button className="removebtn" onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
