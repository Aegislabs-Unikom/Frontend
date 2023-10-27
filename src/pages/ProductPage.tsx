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
    console.log(this.hasParams);
      
      if (this.hasParams) {
        try {
          this.props
            .getProductById(this.params)
            .then(() => {
              // this.dataProps = this.props;
              const { dataProps } = this.props;
              const data = dataProps.data;
              // this.dataProduct = this.props.dataProps.data;
              // console.log(this.dataProduct);
              // const data = dataProduct.data;
              this.setState({ 
                nama_produk: data.nama_produk,
                description: data.description,
                price: data.price,
                stock: data.stock,
                images: data.images,
                category_id: data.category_id,
               })
               console.log(this.state.images)
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
      console.log(this.hasParams);
      this.updateProduct(e);
    } else {
      console.log(this.hasParams);
      this.addNewProduct(e);
    }
  };

  addNewProduct = async (e: FormEvent) => {
    e.preventDefault();
    console.log("tambah");
    try {
      const { nama_produk, description, price, stock, images, category_id } = this.state;
      this.props //dispatch 
        .addNewProduct({ nama_produk, description, price, stock, images, category_id })
        .then((params: any) => { // Use an arrow function here
          this.params = params.payload.data._id;
          // console.log("ini params");
          // console.log(this.params);
          console.log(this.params);       
          // console.log(params.payload.data);     
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
    console.log("update");
    try {
      const objectId = this.params;
      const id = Object.values(objectId);
      const { nama_produk, description, price, stock, images, category_id } = this.state;
      console.log(id);
      this.props //dispatch 
        .updateProduct({ nama_produk, description, price, stock, images, category_id, id })
        .then((params: any) => { // Use an arrow function here
          this.params = params.payload.data._id;
          // console.log("ini params");
          // console.log(this.params);
          console.log(this.params);       
          // console.log(params.payload.data);     
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
    // const { dataProps } = this.props;
    // const data = dataProps.data;

    const { dataCategory } = this.props;
    const category = dataCategory.data;

    return (
      <section className="bg-primary">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <div className="w-full bg-primary rounded-lg md:mt-0 border border-secondary shadow-xl xl:max-w-[1000px] xl:p-0 relative">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight uppercase tracking-tight text-gray-1000 md:text-2xl absolute bottom-[100%] mb-3">
                {this.hasParams? "Update" : "Add New "} Products
              </h1>
              <form
                className="space-y-4 md:space-y-6 grid md:grid-cols-2 md:gap-5"
                onSubmit={this.handleFormSubmit}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-3">
                  <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="nama_produk"
                      value={this.state.nama_produk}
                      onChange={(e) =>
                        this.setState({ nama_produk: e.target.value })
                      }
                      className="sm:text-sm rounded-lg focus:!shadow-lg focus:bg-[rgb(165,221,195)] transition-all duration-150 outline-none block w-full p-2.5 bg-primary text-secondary placeholder:text-secondary border border-secondary"
                      placeholder="Product Name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={this.state.description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                      placeholder="Description"
                      className="sm:text-sm rounded-lg focus:!shadow-lg focus:bg-[rgb(165,221,195)] transition-all duration-150 outline-none block w-full p-2.5 bg-primary text-secondary placeholder:text-secondary border border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Category
                    </label>
                    <select name="category" 
                        className="sm:text-sm rounded-lg focus:!shadow-lg focus:bg-[rgb(165,221,195)] transition-all duration-150 outline-none block w-full p-2.5 bg-primary text-secondary placeholder:text-secondary border border-secondary"
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
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Images
                    </label>
                    <input
                      type="file"
                      className="block px-4 py-2 w-full text-sm text-white-900 border border-gray-300 rounded-lg cursor-pointer bg-white-50 dark:text-white-400 focus:outline-none dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="images"
                      name="images"
                      // value={this.state.images}
                      multiple
                      onChange={this.handleImageChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
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
                        className="sm:text-sm rounded-lg focus:!shadow-lg focus:bg-[rgb(165,221,195)] transition-all duration-150 outline-none block w-full p-2.5 bg-primary text-secondary placeholder:text-secondary border border-secondary"
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
                        className="sm:text-sm rounded-lg focus:!shadow-lg focus:bg-[rgb(165,221,195)] transition-all duration-150 outline-none block w-full p-2.5 bg-primary text-secondary placeholder:text-secondary border border-secondary"
                      />
                    </div>
                  </div>
                  <button
                      type="submit"
                      className="w-full btn p-3 border bg-primary hover:bg-[rgb(165,221,195)] hover:shadow-md text-secondary rounded-md border-secondary transition ease-out duration-150"
                    >
                      {this.hasParams? "Update" : "Add New "} produk
                  </button>
                </div>
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
