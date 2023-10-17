import Navbar from "../component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { getAllProducts, deleteProduct } from "../store/product/ProductSlice";
<<<<<<< Updated upstream
import { addToCart, getAllCart } from "../store/cart/CartSlice";
=======
import { addToCart, getAllCart, deleteProductInCart } from "../store/cart/CartSlice";
import { statusPaymentOrder, processCartToPayment } from "../store/paymentOrder/PaymentSlice";
>>>>>>> Stashed changes
import { withRouter } from "../helper/withRouter";

type Products = {
    id: string;
    nama_produk: string;
    description: string;
    price: number;
    stock: number;
  };
  
  type State = {
    productsData: Products[];
    quantity: number; //test
  };

class CartPage extends Component<any, State>{
    constructor(props: {}) {
        super(props);
    
        this.state = {
            productsData: [],
            quantity: 0 //test
        };
    }
    
    componentDidMount() {
        this.getData();
    }

<<<<<<< Updated upstream
    // componentDidUpdate(prevProps: any) {
    //     console.log(this.props.dataProps.data.length);
    //     console.log(prevProps.dataProps.data.length);
    //     // if (this.props.dataProps.data.length !== prevProps.dataProps.data.length) {
    //     //     this.getData();
    //     // }
    //     if (prevProps.dataProps.data.length !== this.props.dataProps.data.length) {
    //         console.log('pokemons state has changed.');
    //         this.getData();
    //       }
    // }
=======
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.token !== prevState.token) {
          window.snap.pay(this.state.token, {
            onSuccess: async (result:any) => {
              this.setState({ token: "" });
              await this.statusPayment("Success");
              //this.props.router.navigate(`/`);
              window.location.href = "/";
            },
            onPending: async (result:any) => {
              this.setState({ token: "" });
              await this.statusPayment("Pending");
            },
            onError: async (result:any) => {
              console.log(result);
              this.setState({ token: "" });
              await this.statusPayment("Failed");
            },
            onClose: async () => {
              console.log("You closed the popup without finishing the payment");
              this.setState({ token: "" });
            },
          });
        }
      }
    
    componentWillUnmount() {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;

        const midtransClientKey = "SB-Mid-server-sAtp_QY55EYAjSAaEN1Tbpo9";
        scriptTag.setAttribute("data-client-key", midtransClientKey);
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
          };
    }

>>>>>>> Stashed changes
    count = 0;
    getData = async () => {
        this.props.getAllCart()
<<<<<<< Updated upstream
        .then(function name(params: any) {
        //   console.log(params);       
=======
        .then(() => {
          // this.dataProps = this.props;
          const { cartProps } = this.props;
          // this.dataProduct = this.props.dataProps.data;
          // console.log(dataProps);
          // const data = dataProduct.data;

          this.setState({ 
              productsData: cartProps.data
           });
>>>>>>> Stashed changes
        });
    }
    editProductById = async (productId: string) => {
        this.props.router.navigate(`/product-page/${productId}`);
    }

    deleteProductById = async (productId: string) => {
        const confirm = window.confirm('Delete this product?');
        if (confirm) {
            console.log(productId);
            await this.props.deleteProduct({ id: productId })
                .then(()=>{
                    this.getData();
                })
                .catch((error: any) => {
                    console.error("Error deleting product:", error);
                });    
        }
        
    }

<<<<<<< Updated upstream
    checkOut = async (id: string) => { //mau diganti
        if (this.state.quantity === 0) {
          alert("barang kosong");
          return;
        } 
        try {
          const { quantity } = this.state;
          await this.props
            .addToCart({ id, quantity })
            .then(
                console.log("berhasil")
            )
            .catch((error: any) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
    };

    onclick(type: any, quantity: number){ //test
        console.log(quantity);
        if (quantity === 0 && type === 'add') {
            quantity =+ 1;
          } else if (quantity > 0 ){
            console.log("tambah");
            (type === 'add' ? quantity =+ 1 : quantity =- 1 )
          }
        // this.setState(prevProps => {
        //   if (prevProps.quantity === 0 && type === 'add') {
        //     return {quantity: prevProps.quantity + 1};
        //   } else if (prevProps.quantity > 0 ){
        //     console.log("tambah");
        //     console.log(prevProps.quantity);
        //     return {quantity: type === 'add' ? prevProps.quantity + 1: prevProps.quantity - 1}
        //   }
        //   return null;
        // });
      }

    handleCheckoutClick = (id: string) => { //test
        this.checkOut(id);
    };

=======
    deleteProductInCart = async (productId: string) => {
        const confirm = window.confirm('Delete this product?');
        if (confirm) {
            console.log(productId);
            await this.props.deleteProductInCart({ id: productId })
                .then(()=>{
                    this.getData();
                })
                .catch((error: any) => {
                    console.error("Error deleting product:", error);
                });    
        }
    }

    async processPayment() {
      try {
          const result = await this.props.processCartToPayment();
          const token = result.payload.token;
          this.setState({ token }, () => {
            console.log("Token state:", this.state.token); // Log the updated value.
          });
    } catch (error) {
        console.error("Error processing payment:", error);
    }
      }

    statusPayment = async (newStatus:string) => {
        try {
          this.props.statusPaymentOrder({ status: newStatus });
        } catch (error) {
          console.error("Error processing payment:", error);
        }
    }    
>>>>>>> Stashed changes

    render(){
        const { cartProps } = this.props;
        const data = cartProps.data;

        const { userProps } = this.props;
        const role = userProps.data.user.role;
        const isAdmin = role === 'Admin';

        return (
            <div className="text-gray-600 font-body">
                <Navbar />
                {isAdmin ? (
                    <div className="flex p-3">
                        <Link
                            to={"/product-page"}
                            className="m-3 lg:w-[15%] text-sm flex items-center w-[50%] px-5 py-2 font-bold text-white rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base bg-blue-400 hover:opacity-80 hover:shadow-lg transition duration-500"
                        >
                            <span className="fill-current mr-3">
                                <svg
                                    role="img"
                                    width="20"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18 13.496h-4.501v4.484h-3v-4.484H6v-2.99h4.5V6.021h3.001v4.485H18v2.99zM21 .041H3C1.348.043.008 1.379 0 3.031v17.94c.008 1.65 1.348 2.986 3 2.988h18c1.651-.002 2.991-1.338 3-2.988V3.031c-.009-1.652-1.348-2.987-3-2.99z" />
                                </svg>
                            </span>
                            Tambah Product
                        </Link>
                        <Link
                            to={"/category"}
                            className="m-3 lg:w-[15%] text-sm flex items-center w-[50%] px-5 py-2 font-bold text-white rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base bg-blue-400 hover:opacity-80 hover:shadow-lg transition duration-500"
                        >
                            <span className="fill-current mr-3">
                                <svg
                                    role="img"
                                    width="20"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18 13.496h-4.501v4.484h-3v-4.484H6v-2.99h4.5V6.021h3.001v4.485H18v2.99zM21 .041H3C1.348.043.008 1.379 0 3.031v17.94c.008 1.65 1.348 2.986 3 2.988h18c1.651-.002 2.991-1.338 3-2.988V3.031c-.009-1.652-1.348-2.987-3-2.99z" />
                                </svg>
                            </span>
                            Tambah Category
                        </Link>
                    </div>
                    ) : (
                        <div className="mb-16"></div>
                    )}
<<<<<<< Updated upstream
                <div className=" w-11/12 m-auto">
                    <div className="grid lg:grid-cols-5">
                        {data?.map((cart:any) => {
                            return ( //buat komponen terpisah
                            <div key={cart.product._id} className="max-w-sm w-full lg:max-w-full mb-4">
                                    <div className="m-auto w-60 h-96 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                        <Link
                                            to={`/product/${cart.product._id}`}>
                                            <div className="mb-3">
                                                <img src={cart.product.image} alt="" className="max-h-56 m-auto"/>
                                                <p className="text-gray-700 text-base mt-2">{cart.product.nama_produk}</p>
                                                <p className="text-gray-700 text-base mt-1">{cart.product.description}</p>
                                                <p className="text-gray-700 text-base">{cart.product.price} pcs</p>
                                                <p className="text-gray-700 text-base">{cart.quantity}</p>
                                            </div>
                                        </Link>
                                        {isAdmin ? (
                                        <div className="flex">
                                            <button
                                                className="mr-2 border-2 rounded-lg bg-white hover border-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white flex items-center justify-center w-1/4 h-9"
                                                onClick={() => this.editProductById(cart.product._id)}
                                                > edit
                                            </button>
                                            <button
                                                className="border-2 rounded-lg bg-white hover border-red-500 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center w-1/3 h-9 p-2"
                                                onClick={() => this.deleteProductById(cart.product._id)}>delete
                                            </button>
                                        </div>
                                        ):(
                                            <div className="mb-5">
                                                <div className="flex border-gray-200">
                                                    {/* <div className="flex"> //tambah dan kurang
                                                        <button onClick={this.onclick.bind(this, 'add',cart.quantity )} className="mr-2">+</button>
                                                            <input type="text" disabled value={this.count = cart.quantity} onChange={(e) => this.setState({ quantity: parseInt(e.target.value) })} className="w-6 text-center"/>
                                                        <button onClick={this.onclick.bind(this, 'sub', cart.quantity)} className="ml-2">-</button>
                                                    </div> */}
                                                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded" onClick={() => this.handleCheckoutClick(cart._id)}>Checkout</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
=======
                <div className="max-w-2xl mx-auto p-4">
                    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                    {cartIsNull? (
                        <h1 className="text-2xl font-semibold mb-4">Cart is Empty...</h1>
                    ):(
                        <ul>
                        {this.state.productsData?.map((item:any) => (
                            <li
                            key={item.product._id}
                            className="border border-gray-300 p-4 mb-4 flex items-center"
                            >
                            <div className="flex-shrink-0">
                                <img
                                src={item.product.image}
                                alt={item.product.nama_produk}
                                className="w-16 h-16 object-cover"
                                />
                            </div>
                            <div className="ml-4 w-9/12">
                                <h2 className="text-lg font-semibold">
                                {item.product.nama_produk}
                                </h2>
                                <p className="text-gray-600">Rp. {item.product.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Total: {(item.quantity)*(item.product.price)}</p>
                                this.grandTotal =+ {(item.quantity)*(item.product.price)}
                            </div>
                            <button
                              className="border-2 rounded-lg bg-white hover border-red-500 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center w-1/8 h-9 p-2 float-right"
                              onClick={() => this.deleteProductInCart(item.product._id)}>delete
                            </button>                
                            </li>
                        ))}
                            <button
                            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => this.processPayment()}
                            >
                              Process Payment
                            </button>
                        </ul>
                    )}
>>>>>>> Stashed changes
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userProps: state.auth,
    dataProps: state.products,
    cartProps: state.cart
  });
  
  const mapDispatchToProps = {
    getAllProducts, 
    deleteProduct,
    addToCart,
<<<<<<< Updated upstream
    getAllCart
=======
    getAllCart,
    statusPaymentOrder,
    processCartToPayment,
    deleteProductInCart
>>>>>>> Stashed changes
  };

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CartPage));