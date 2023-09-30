import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewProduct, getProductById } from "../store/product/ProductSlice";
import { withRouter } from "../helper/withRouter";

interface ProductState {
  nama_produk: string;
  description: string;
  price: number;
  stock: number; 
  image: string; 
  category_id: string;
}

class ProductPage extends Component<any, ProductState> {
    constructor(props: {}) {
      super(props);
      this.handleFormSubmit=this.handleFormSubmit.bind(this);

      this.state = {
        nama_produk: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        category_id: "",
      };
    }
    
    componentDidMount() {
      const { params } = this.props.router;
      
      if (params != null) {
        try {
          this.props
            .getProductById(params)
            .then(() => {
              const { dataProps } = this.props;
              const data = dataProps.data;
              console.log("cek");
              console.log(data);
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

  handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const { nama_produk, description, price, stock, image, category_id } = this.state;
      this.props //dispatch 
        .addNewProduct({ nama_produk, description, price, stock, image, category_id })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { dataProps } = this.props;
    const data = dataProps.data;

    return (
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-1000 md:text-2xl ">
                            Add New Product
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Nama Produk</label>
                                <input type="text"
                                    name="nama_produk"
                                    value={data.nama_produk}
                                    onChange={(e) => this.setState({ nama_produk: e.target.value })}
                                    className="bg-gray-900 border text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">description</label>
                                <input type="text" 
                                    name="description" 
                                    value={data.description}
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">price</label>
                                <input type="number" 
                                    name="price" 
                                    value={data.price}
                                    onChange={(e) => this.setState({ price: parseInt(e.target.value) })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 ">stok</label>
                                <input type="number" 
                                    name="stok" 
                                    value={data.stock}
                                    onChange={(e) => this.setState({ stock: parseInt(e.target.value) })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">image</label>
                                <input type="file"
                                    className="block w-full text-sm text-white-900 border border-gray-300 rounded-lg cursor-pointer bg-white-50 dark:text-white-400 focus:outline-none dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input"
                                    name="image" 
                                    value={this.state.image}
                                    onChange={(e) => this.setState({ image: e.target.value })}/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">category_id</label>
                                <input type="text" 
                                    name="category_id" 
                                    value={data.category_id}
                                    onChange={(e) => this.setState({ category_id: e.target.value })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full btn p-3 md:border-2 hover:bg-gray-600 bg-gray-500 text-white transition ease-out duration-500">Tambah produk</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      
    );
  }
};

const mapDispatchToProps = {
  addNewProduct, getProductById// Map the action to props
};

const mapStateToProps = (state: any) => {
  return{
    userData: state.auth,
    dataProps: state.products
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));