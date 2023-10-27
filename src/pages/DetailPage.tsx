import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewProduct, getProductById, addToCart } from "../store/product/ProductSlice";
import { withRouter } from "../helper/withRouter";
import Navbar from "../component/Navbar";

interface ProductState {
  nama_produk: string;
  description: string;
  price: number;
  stock: number; 
  image: string; 
  category_id: string;
  quantity: number;
}

class DetailPage extends Component<any, ProductState> {
    constructor(props: {}) {
      super(props);
      this.addToCart=this.addToCart.bind(this);

      this.state = {
        nama_produk: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        category_id: "",
        quantity: 0
      };
    }

    params = ""; //biar bisa dibaca dalam 1 variabel

    componentDidMount() {
      this.getProductById();
    }

  getProductById() {
    this.params = this.props.router.params;
    if (this.params != null) {
      try {
        this.props
          .getProductById(this.params)
          .then(() => {
            // this.dataProps = this.props;
            // const { dataProps } = this.props;
            // const data = dataProps.data;
            // console.log("cek");
            // console.log(data);
            // const { nama_produk, description, price, stock, image, category_id } = this.state;
          })
          .catch((error: any) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  addToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (this.state.quantity === 0) {
      alert("barang kosong");
      return;
    }
    const id = Object.values(this.params); //to get id from params
    try {
      const { quantity } = this.state;
      await this.props
        .addToCart({ id, quantity })
        .then(()=>{
          this.getProductById();
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  onclick(type: any){
    this.setState(prevState => {
      if (prevState.quantity === 0 && type === 'add') {
        return {quantity: prevState.quantity + 1};
      } else if (prevState.quantity > 0 ){
        return {quantity: type === 'add' ? prevState.quantity + 1: prevState.quantity - 1}
      }
      return null;
    });
  }

  render() {
    const { dataProps } = this.props;
    const data = dataProps.data;
    // const data = this.dataProps.data;

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-primary min-h-screen">
            <Navbar />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-secondary" src={data.image}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.nama_produk}</h1>
                        {/* <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">{data.stock} left</span>
                            </span>
                        </div> */}
                        <p className="font-semibold">Description</p>
                        <p className="leading-relaxed">{data.description}</p>
                        
                        <div>
                          <p><span className="font-semibold">Price : </span> Rp.{data.price},-</p>
                          <p><span className="font-semibold">Stock : </span> {data.stock}</p>
                        </div>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-secondary mb-5">
                            {/* <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                            </div> */}
                            <div className="flex flex-col">
                                <span className="mr-3 font-semibold">Size</span>
                                <div className="relative">
                                <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                    <option>SM</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                                </div>
                            </div>
                        </div>
                        <span className="font-semibold ">Quantity</span>
                        <div className="flex border-secondary">
                            <div className="flex">
                              <button onClick={this.onclick.bind(this, 'add')} className="mr-2">+</button>
                                <input type="text" disabled value={this.state.quantity} className="w-6 text-center"/>
                              <button onClick={this.onclick.bind(this, 'sub')} className="ml-2">-</button>
                            </div>
                            <button className="flex ml-auto text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:shadow-md hover:opacity-80 rounded" onClick={this.addToCart}>Add to Cart</button>
                            {/* <button className="rounded-full w-10 h-10 bg-secondary p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
};

const mapDispatchToProps = {
  addNewProduct, getProductById, addToCart// Map the action to props
};

const mapStateToProps = (state: any) => {
  return{
    userData: state.auth,
    dataProps: state.products
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));