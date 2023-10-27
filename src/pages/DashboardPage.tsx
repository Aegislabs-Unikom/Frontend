import Navbar from "../component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { getAllProducts, getAllProductsByUser, deleteProduct, addToCart } from "../store/product/ProductSlice";
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
    currentPage: number;
    perPage: number;
  };

class DashboardPage extends Component<any, State>{
    constructor(props: {}) {
        super(props);
    
        this.state = {
            productsData: [],
            currentPage: 1,
            perPage: 20,
        };
    }

    params = "";
    dataProduct = {};
    dataCategory = {};
    sellerDashboard = false;
    
    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: any) {
        const { params } = this.props.router;
        const prevParams = prevProps.router.params;
    
        if (params !== prevParams) {
          this.getData();
        }
      }
    
    getData = async () => {
        this.params = this.props.router.params;
        this.sellerDashboard = Object.keys(this.params).length > 0;

        if (this.sellerDashboard) {
            this.props.getAllProductsByUser()
            .then(() => {
                const { dataProps } = this.props;

                this.setState({ 
                    productsData: dataProps.data,
                    currentPage: 1,
                });
            });
        } else {
            this.props.getAllProducts()
            .then(() => {
                const { dataProps } = this.props;

                this.setState({ 
                    productsData: dataProps.data,
                    currentPage: 1,
                });
            });
        }
    }

    editProductById = async (productId: string) => {
        this.props.router.navigate(`/product-page/${productId}`);
    }

    deleteProductById = async (productId: string) => {
        const confirm = window.confirm('Delete this product?');
        if (confirm) {
            await this.props.deleteProduct({ id: productId })
                .then(()=>{
                    this.getData();
                })
                .catch((error: any) => {
                    console.error("Error deleting product:", error);
                });    
        }
        
    }

    render(){
        const startIdx = (this.state.currentPage - 1) * this.state.perPage;
        const endIdx = Math.min(startIdx + this.state.perPage, this.state.productsData.length);

        // startIdx = (this.state.currentPage - 1) * this.state.perPage;
        // endIdx = this.startIdx + this.state.perPage;
        return (
            <div className="text-gray-600 font-body bg-secondary min-h-screen">
                <Navbar />
                {this.sellerDashboard ? (
                    <div className="flex p-3 md:ml-14">
                        <Link
                            to={"/product-page"}
                            className="m-3 lg:w-[15%] shadow-inner-xl hover:opacity-80 text-sm flex items-center w-[50%] px-5 py-2 font-bold text-secondary rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base bg-primary transition duration-500"
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
                            className="m-3 lg:w-[15%] shadow-inner-xl hover:opacity-80 text-sm flex items-center w-[50%] px-5 py-2 font-bold text-secondary rounded-lg mb-8 lg:px-5 lg:py-2 md:text-base bg-primary transition duration-500"
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
                <div className=" w-11/12 m-auto">
                    <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-4 gap-x-6">
                        {this.state.productsData.slice(startIdx, endIdx).map((product:any) => {
                            return ( 
                            <div key={product._id} className="max-w-sm w-full lg:max-w-full mb-4 text-secondary group">
                                    <div className="m-auto flex flex-col justify-between h-96 bg-primary border-gray-400 rounded-lg p-4 leading-normal shadow-inner-xl">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="h-full"
                                            >
                                            <div className="mb-3 flex flex-col">
                                                <div className="h-40 overflow-clip">
                                                  <img src={product.image} alt="" className="h-full w-full object-cover transform duration-200 group-hover:scale-110"/>
                                                </div>
                                                <div>
                                                  <div className="flex justify-center my-2">
                                                    <p className="text-base mt-2 font-bold">{product.nama_produk}</p>
                                                  </div>
                                                  <p className="text-sm font-semibold">{product.description}</p>
                                                  <p className="text-sm font-semibold">Rp.{product.price}</p>
                                                  <p className="text-sm font-semibold text-gray-500">{product.stock} pcs</p>
                                                </div>
                                            </div>
                                        </Link>
                                        {this.sellerDashboard ? (
                                            <div className="flex justify-between gap-5">
                                                <button
                                                    className="mr-2 w-1/2 shadow-xl rounded-xl bg-secondary hover:bg-[#333333] text-gray-400 font-semibold flex items-center justify-center h-9"
                                                    onClick={() => this.editProductById(product._id)}
                                                    > Edit
                                                </button>
                                                <button
                                                    className="shadow-xl w-1/2 rounded-xl bg-secondary hover:bg-[#333333] text-gray-400 font-semibold flex items-center justify-center h-9 p-2"
                                                    onClick={() => this.deleteProductById(product._id)}>Delete
                                                </button>
                                            </div>
                                        ):(
                                            <div className="mb-5">
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center my-10">
                            <button
                                className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2"
                                disabled={this.state.currentPage === 1}
                                onClick={() => this.setState({ currentPage: this.state.currentPage - 1})}>
                                Previous
                            </button>
                            <button
                                className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2"
                                disabled={endIdx >= this.state.productsData.length}
                                onClick={() => this.setState({currentPage: this.state.currentPage + 1})}>
                                Next
                            </button>
                    </div>
                </div>
                
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
    getAllProductsByUser,
    deleteProduct,
    addToCart,
  };

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(DashboardPage));