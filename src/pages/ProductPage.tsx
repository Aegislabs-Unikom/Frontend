import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { addNewProduct, getProductById, updateProduct } from "../store/product/ProductSlice";
import { getAllCategory } from "../store/category/CategorySlice";
import { withRouter } from "../helper/withRouter";
import Navbar from "../component/Navbar";

interface ProductState {
  nama_produk: string;
  description: string;
  price: number;
  stock: number;
  images: FileList | null;
  category_id: string;
}

class ProductPage extends Component<any, ProductState> {
  constructor(props: any) {
    super(props);

    this.state = {
      nama_produk: "",
      description: "",
      price: 0,
      stock: 0,
      images: null,
      category_id: "",
    };
  }

  params = "";
  dataProduct = {};
  dataCategory = {};
  hasParams = false;
  

  componentDidMount() {
    this.params = this.props.router.params;
    this.hasParams = Object.keys(this.params).length > 0;
      
      if (this.hasParams) {
        try {
          this.props
            .getProductById(this.params)
            .then(() => {
              const { dataProps } = this.props;
              const data = dataProps.data;
              this.setState({ 
                nama_produk: data.nama_produk,
                description: data.description,
                price: data.price,
                stock: data.stock,
                images: data.images,
                category_id: data.category_id,
               })
              this.getAllCategory();
            })
            .catch((error: any) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        this.getAllCategory();
      }
  }

  getAllCategory = () => {
    try {
          this.props
            .getAllCategory()
            .then(() => {
              this.dataCategory = this.props;
            })
            .catch((error: any) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
  }

  handleFormSubmit = (e: FormEvent) => {
    if (this.hasParams) {
      this.updateProduct(e);
    } else {
      this.addNewProduct(e);
    }
  };

  addNewProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { nama_produk, description, price, stock, images, category_id } = this.state;
      this.props //dispatch 
        .addNewProduct({ nama_produk, description, price, stock, images, category_id })
        .then((params: any) => { // Use an arrow function here
          this.params = params.payload.data._id;   
          this.props.router.navigate(`/product/${params.payload.data._id}`);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  updateProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const objectId = this.params;
      const id = Object.values(objectId);
      const { nama_produk, description, price, stock, images, category_id } = this.state;
      this.props //dispatch 
        .updateProduct({ nama_produk, description, price, stock, images, category_id, id })
        .then((params: any) => { 
          this.params = params.payload.data._id;
          this.props.router.navigate(`/product/${params.payload.data._id}`);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  

  handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      this.setState({ images: files });
    }
  };

  render() {
    const { dataCategory } = this.props;
    const category = dataCategory.data;

    return (
      <section className="bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-1000 md:text-2xl">
                {this.hasParams? "Update" : "Add New "} Product
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={this.handleFormSubmit}
                encType="multipart/form-data"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    name="nama_produk"
                    value={this.state.nama_produk}
                    onChange={(e) =>
                      this.setState({ nama_produk: e.target.value })
                    }
                    className="sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Produk"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                    placeholder="Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={this.state.price}
                    onChange={(e) =>
                      this.setState({ price: parseInt(e.target.value) })
                    }
                    placeholder="Price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={this.state.stock}
                    onChange={(e) =>
                      this.setState({ stock: parseInt(e.target.value) })
                    }
                    placeholder="Stock"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Images
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm text-white-900 border border-gray-300 rounded-lg cursor-pointer bg-white-50 dark:text-white-400 focus:outline-none dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="images"
                    name="images"
                    multiple
                    onChange={this.handleImageChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <select name="category" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="category"
                      value={this.state.category_id}
                      onChange={(e) => this.setState({ category_id: e.target.value })}
                    >
                    {category?.map((category:any) => {
                      return (
                        <option value={category._id} key={category._id}>{category.nama_category}</option>)
                    })}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full btn p-3 md:border-2 hover:bg-gray-600 bg-gray-500 text-white transition ease-out duration-500"
                >
                  {this.hasParams? "Update" : "Add New "} produk
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  addNewProduct,
  getAllCategory,
  getProductById,
  updateProduct
};

const mapStateToProps = (state: any) => {
  return{
    dataProps: state.products,
    dataCategory: state.category
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
