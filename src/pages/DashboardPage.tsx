import Navbar from "../component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { getAllProducts } from "../store/product/ProductSlice";

type Products = {
    id: string;
    nama_produk: string;
    description: string;
    price: number;
    stock: number;
  };
  
  type State = {
    productsData: Products[];
  };

class DashboardPage extends Component<any, State>{
    constructor(props: {}) {
        super(props);
    
        this.state = {
            productsData: [],
        };
    }
    
    componentDidMount() {
        this.props.getAllProducts()
        .then(function name(params: any) {
        //   console.log(params);       
        });
    }

    render(){
        const { dataProps } = this.props;
        return (
            <div className="text-gray-600 font-body">
                <Navbar />
                <Link
                    to={"/add-product"}
                    className="lg:w-[15%] text-sm flex items-center w-[50%] px-5 py-2 font-bold text-black rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base  bg-primary hover:opacity-80 hover:shadow-lg transition duration-500"
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
                    to={"/add-category"}
                    className="lg:w-[15%] text-sm flex items-center w-[50%] px-5 py-2 font-bold text-black rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base  bg-primary hover:opacity-80 hover:shadow-lg transition duration-500"
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
                {dataProps.data?.map((product:any) => {
                    return ( //buat komponen terpisah
                    <div key={product.id} className="">
                        <div className="max-w-sm w-full lg:max-w-full lg:flex m-5">
                        <div className="ml-14 w-10/12  border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-5">
                            <p className="text-gray-700 text-base mt-5">{product.nama_produk}</p>
                            <p className="text-gray-700 text-base mt-5">{product.description}</p>
                            <p className="text-gray-700 text-base mt-5">{product.price} : {product.stock} pcs</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userProps: state.auth,
    dataProps: state.products
  });
  
  const mapDispatchToProps = {
    getAllProducts, 
  };

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);