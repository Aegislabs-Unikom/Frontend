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
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage] = useState(6); //total perpage

//   const startIdx = (currentPage - 1) * perPage;
//   const endIdx = startIdx + perPage;
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
                // this.dataProps = this.props;
                const { dataProps } = this.props;
                // this.dataProduct = this.props.dataProps.data;
                // console.log(dataProps);
                // const data = dataProduct.data;

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

    render(){
        const startIdx = (this.state.currentPage - 1) * this.state.perPage;
        const endIdx = Math.min(startIdx + this.state.perPage, this.state.productsData.length);

        // startIdx = (this.state.currentPage - 1) * this.state.perPage;
        // endIdx = this.startIdx + this.state.perPage;
        return (
            <div className="text-gray-600 font-body">
                <Navbar />
                {this.sellerDashboard ? (
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
                <div className=" w-11/12 m-auto">
                    <div className="grid lg:grid-cols-5">
                    {/* {searchResults.slice(startIdx, endIdx).map((meal: any) => (  */}
                        {this.state.productsData.slice(startIdx, endIdx).map((product:any) => {
                            return ( //buat komponen terpisah
                            <div key={product._id} className="max-w-sm w-full lg:max-w-full mb-4">
                                    <div className="m-auto w-60 h-96 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                        <Link
                                            to={`/product/${product._id}`}>
                                            <div className="mb-3">
                                                <img src={product.image} alt="" className="max-h-56 m-auto"/>
                                                <p className="text-gray-700 text-base mt-2">{product.nama_produk}</p>
                                                <p className="text-gray-700 text-base mt-1">{product.description}</p>
                                                <p className="text-gray-700 text-base">{product.price} : {product.stock} pcs</p>
                                            </div>
                                        </Link>
                                        {this.sellerDashboard ? (
                                            <div className="flex">
                                                <button
                                                    className="mr-2 border-2 rounded-lg bg-white hover border-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white flex items-center justify-center w-1/4 h-9"
                                                    onClick={() => this.editProductById(product._id)}
                                                    > edit
                                                </button>
                                                <button
                                                    className="border-2 rounded-lg bg-white hover border-red-500 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center w-1/3 h-9 p-2"
                                                    onClick={() => this.deleteProductById(product._id)}>delete
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