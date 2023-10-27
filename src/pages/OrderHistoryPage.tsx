import Navbar from "../component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { getAllOrder } from "../store/paymentOrder/OrderSlice";
import { withRouter } from "../helper/withRouter";

type Products = {
    id: string;
    nama_produk: string;
    description: string;
    price: number;
    stock: number;
};

type Productss = {
    products: Products;
    quantity: number;
  };

  type State = {
    orderHistory: Productss[];
    loading: boolean;
    orderId: string;
  };

class OrderHistoryPage extends Component<any, State>{
    constructor(props: {}) {
        super(props);
    
        this.state = {
            orderHistory: [],
            loading: true,
            orderId: "",
        };
    }
    
    componentDidMount() {
        this.getData();
    }

    async getData () {
      try{
        this.props.getAllOrder() //persiapan untuk get all order
        .then((params: any)=> {
            const { orderHistoryProps } = this.props;

            this.setState({ 
                orderHistory: orderHistoryProps.data
             });
             console.log(this.state.orderHistory);
        })
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ loading: false }, () => {
          console.log("Token load:", this.state.loading); // Log the updated value.
        });
      }
    }

    render(){
        const cartIsNull = this.state.orderHistory.length === 0;

        return (
            <div className="text-gray-600 font-body bg-secondary min-h-screen">
            <Navbar />
                <div className="max-w-2xl mx-auto p-4 mt-16">
                    <h1 className="text-2xl font-semibold mb-4">Order History</h1>
                    {cartIsNull? (
                        <>
                        <h1 className="text-2xl font-semibold mb-4">You have not ordered anything...</h1>
                        <Link
                            to={"/"}
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
                            Shop Now
                        </Link>
                        </>
                    ):(
                       <>
                       
                        <div className="w-full md:w-full p-4">
                          <ul>
                        {this.state.orderHistory?.map((item:any) => (
                            <li
                            key={item._id}
                            className="border border-gray-300 p-4 mb-4 items-center"
                            >
                            <p className="text-gray-600 mb-3 font-bold">Status : {item.status}</p>
                            <div className="items-center">
                                {item.products.map((product: any)=>(
                                    <div className="flex flex-shrink-0 p-1">
                                        <img
                                        src={product.image}
                                        alt={product.nama_produk}
                                        className="w-16 h-16 object-cover"
                                        />
                                        <h2 className="text-lg font-semibold ml-2">
                                            {product.nama_produk}
                                        </h2>
                                        <p className="text-gray-600">Rp. {product.price}</p>
                                    </div>
                                ))}
                                
                                
                            </div>
                                <div className="w-9/12 mt-2 ">
                                    <p className="text-gray-600 font-semibold">Total ({Object.keys(item.products).length} Barang) : {item.total_amount}</p>
                                </div>
                            </li>
                        ))}
                        </ul>

                        </div>
                      
                       </>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    cartProps: state.cart,
    paymentProps: state.payment,
    orderHistoryProps: state.orderHistory
  });
  
  const mapDispatchToProps = {
    getAllOrder
  };

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OrderHistoryPage));