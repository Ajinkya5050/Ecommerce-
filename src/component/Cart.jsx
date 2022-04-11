import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addCart, delCart } from '../redux/action';

const Cart = () => {
    const state = useSelector((state) => state.handleCart)
    const dispatch = useDispatch()

    const handleAdd = (item) => {
        dispatch(addCart(item))
    }
    const handleDel = (item) => {
        dispatch(delCart(item))
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row text-center">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        )
    }

    const cartItems = (product) => {
        return (
            <>
                <div className="px-4 m-5 bg-light rounded-3 py-5">
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img src={product.image} alt={product.title} height="200px" width="180px" />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X ${product.price} = ${product.qty * product.price}
                                </p>
                                <button className="btn btn-outline-dark me-4" onClick={() => handleDel(product)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button className="btn btn-outline-dark" onClick={() => handleAdd(product)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }

    const totalPrice = () =>{
        return state.map(cartItems=>{return cartItems.qty * cartItems.price}).reduce(function(a, b) { return a + b; }, 0).toFixed(2)
    }


    const buttons = () => {
        return (
            <>
                <div className="bg-secondary d-flex justify-content-end align-items-center gap-5 flex-wrap p-2 px-5" style={{ minWidth: '300px' }}>
                    <div className='fw-bold fs-4'>
                        Total Price : $ {totalPrice()}
                    </div>
                   
                </div>
            </>
        )
    }

    return (
        <div>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            <div style={{ position: 'fixed', bottom: '0px', minWidth:'100%'}}>
                {state.length !== 0 && buttons()}
            </div>
        </div>
    );
}

export default Cart;
