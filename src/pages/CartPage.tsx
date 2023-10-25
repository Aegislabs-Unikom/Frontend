import Navbar from "../component/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { getAllProducts, deleteProduct } from "../store/product/ProductSlice";
import { addToCart, getAllCart, deleteProductInCart } from "../store/cart/CartSlice";
import { statusPaymentOrder, processCartToPayment, getProvince, getKota, cekOngkir } from "../store/paymentOrder/PaymentSlice";
import { withRouter } from "../helper/withRouter";
import axios from "axios";

declare global {
    interface Window {
      snap: any; // Change 'any' to the actual type if you have it
    }
  }

  type Product = {
    id: string;
    nama_produk: string;
    description: string;
    price: number;
    stock: number;
  };

type Products = {
    product: Product;
    quantity: number;
  };

  type State = {
    productsData: Products[];
    loading: boolean;
    token:string;
    provinsiList: [];
    kotaList: [];
    tujuan: string;
    berat: number;
    alamat: string;
    kurir: string;
    hasil: any;
    biayaOngkir: number;
    infoPengiriman: [];
  };

class CartPage extends Component<any, State>{
    constructor(props: {}) {
        super(props);
    
        this.state = {
            productsData: [],
            loading: true,
            token:"",
            provinsiList: [],
            kotaList: [],
            tujuan: "",
            berat: 1000,
            alamat: "",
            kurir: "",
            hasil: "",
            biayaOngkir: 0,
            infoPengiriman: [],
        };
    }
    
    componentDidMount() {
        this.getData();
        this.loadProvinsi();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.token !== prevState.token) {
          window.snap.pay(this.state.token, {
            onSuccess: async (result:any) => {
              this.setState({ token: "" });
              await this.statusPayment("Success");
              this.props.router.navigate(`/`);
              // window.location.href = "/";
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
    count = 0;

    async loadProvinsi () {
      this.props.getProvince()
      .then((response: any) => {
        const provinsiData = response.payload;
        this.setState({ 
          provinsiList: provinsiData
       });
      
      })
      .catch((error:any) => console.log(error));
    }

    async loadKota (id: string, el:string) {
      this.props.getKota({id})
      .then((response: any) => {
        const kotaData = response.payload;
        this.setState({ 
          kotaList: kotaData
       });
      
      })
      .catch((error:any) => console.log(error));
    }

    async cekOngkir () {
      if (this.state.tujuan && this.state.berat && this.state.kurir) {
        // console.log({alamat: this.state.alamat,
        //   tujuan: this.state.tujuan,
        //   berat: this.state.berat,
        //   kurir: this.state.kurir});
        this.props.cekOngkir({
          alamat: this.state.alamat,
          tujuan: this.state.tujuan,
          berat: this.state.berat,
          kurir: this.state.kurir,
        })
        .then((response: any) => {
          const cekInfoPengiriman = response.payload;
          // console.log(cekInfoPengiriman);
          this.setState({
            biayaOngkir: cekInfoPengiriman.cost[0].value,
            infoPengiriman: cekInfoPengiriman,
          })
          const temp = (
            <table
              cellPadding="5"
              border={1}
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Estimated (Hari)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>{cekInfoPengiriman.service}</b>
                  </td>
                  <td>{cekInfoPengiriman.description}</td>
                  <td>{cekInfoPengiriman.cost[0].value.toLocaleString()}</td>
                  <td>{cekInfoPengiriman.cost[0].etd}</td>
                </tr>
              </tbody>
            </table>
          );
          this.setState({hasil: temp});
        })
        .catch((error:any) => console.log(error));
      }
    }

    totalPrice = () => {
      const totalPrice = this.state.productsData.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      return totalPrice;
    }

    calculateTotalPrice = () => {
      return this.totalPrice().toLocaleString();
    };
  
    calculateShippingCost = () => {
      return this.state.biayaOngkir;
    };
  
    calculateTotalPayment = () => {
      const shippingCost = this.calculateShippingCost();
      const totalPayment = this.totalPrice() + shippingCost;
      // console.log(totalPayment);
      // if (shippingCost === 0) {
      //   return 0;
      //   // return totalPayment.toLocaleString();
      // }
      return totalPayment.toLocaleString();
    };

    async getData () {
      try{
        this.props.getAllCart()
        .then(() => {
          // this.dataProps = this.props;
          const { cartProps } = this.props;
          // this.dataProduct = this.props.dataProps.data;
          // console.log(cartProps.data);
          // const data = dataProduct.data;

          this.setState({ 
              productsData: cartProps.data
           });
        }); 
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ loading: false }, () => {
          console.log("Token load:", this.state.loading); // Log the updated value.
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

    async processPayment() {
      if (this.state.kurir && this.state.tujuan) {
        try {
          const result = await this.props.processCartToPayment({biayaOngkir: this.state.biayaOngkir});
          const token = result.payload.token;
          this.setState({ token }, () => {
            console.log("Token state:", this.state.token); // Log the updated value.
          });
        } catch (error) {
            console.error("Error processing payment:", error);
        }
      } else {
        alert('Lengkapi form tujuan paket terlebih dahulu');
      }
    }

    statusPayment = async (newStatus:string) => {
        // try {
        //   this.props.statusPaymentOrder({ status: newStatus });
        // } catch (error) {
        //   console.error("Error processing payment:", error);
        // }
        try {
          const response = await axios.post(
            `https://aegisquest-ernafpm2wq-uc.a.run.app/api/order/status`,
            {
              status: newStatus,
            },
            {
              withCredentials: true,
            }
          );
          console.log(response.data);
          console.log(response.data.data);
          alert(response.data.msg);
        } catch (error) {
          console.error("Error processing payment:", error);
        }
    }    

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

    render(){
        // const { cartProps } = this.props;
        // const data = cartProps.data;
        // console.log(data);
        // const amount = data.
        // const grandTotal = 0;
        const cartIsNull = this.state.productsData.length === 0;
        // console.log(this.state.productsData);

        const { userProps } = this.props;
        const role = userProps.data.user.role;
        const isAdmin = role === 'Admin';

        // if (this.state.loading) {
        //   console.log(this.state.loading);
        //   return <p>Loading...</p>;
        // }

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
                <div className="max-w-2xl mx-auto p-4">
                    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                    {cartIsNull? (
                        <h1 className="text-2xl font-semibold mb-4">Cart is Empty...</h1>
                    ):(
                       <>
                       <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 p-4">
                          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
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
                              onClick={() => this.deleteProductInCart(item.cart_id)}>delete
                            </button> 
                            </li>
                        ))}
                        </ul>

                        </div>
                        <div className="w-full md:w-1/2 p-4">
                          <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
                          <div>
                            <table
                              cellPadding="5"
                              border={1}
                              style={{ borderCollapse: "collapse" }}
                            >
                              <tbody>
                                <tr>
                                  <td colSpan={2} style={{ textAlign: "center" }}>
                                    <b>TUJUAN PAKET</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Provinsi Tujuan</td>
                                  <td>
                                    <select
                                      onChange={(e) => {
                                        this.setState({ tujuan: e.target.value });
                                        this.loadKota(e.target.value, "kot2");
                                      }}
                                      defaultValue={'DEFAULT'}
                                    >
                                      <option value="DEFAULT" disabled>
                                        -- Pilih Provinsi --
                                      </option>
                                      {this.state.provinsiList.map((provinsi:any) => (
                                        <option
                                          key={provinsi.province_id}
                                          value={provinsi.province_id}
                                        >
                                          {provinsi.province}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kota Tujuan</td>
                                  <td>
                                    <select id="kot2" defaultValue={'DEFAULT'}>
                                      <option value="DEFAULT" disabled>
                                        -- Pilih Kota --
                                      </option>
                                      {this.state.kotaList.map((kota: any) => (
                                        <option key={kota.city_id} value={kota.city_id}>
                                          {kota.city_name}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Detail Pengiriman</td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Alamat Pengiriman"
                                      onChange={(e) => this.setState({alamat: e.target.value})}
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td colSpan={2} style={{ textAlign: "center" }}>
                                    <b>CEK ONGKOS</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kurir</td>
                                  <td>
                                    <select onChange={(e) => this.setState({kurir: e.target.value})} defaultValue={'DEFAULT'}>
                                      <option value="DEFAULT" disabled>
                                        -- Pilih Kurir --
                                      </option>
                                      <option value="jne">JNE</option>
                                      <option value="pos">POS Indonesia</option>
                                      <option value="tiki">TIKI</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    <button onClick={() => this.cekOngkir()}>Cek Ongkir</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <br />
                            <div id="hasil">{this.state.hasil}</div>
                          </div>
                        </div>
                      </div>
                      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                      <table className="w-full md:w-1/2 p-4 md:p-0 mx-auto md:ml-auto md:mr-0">
                        <tbody>
                          <tr>
                            <td>Total Harga</td>
                            <td className="text-right">Rp. {this.calculateTotalPrice()}</td>
                          </tr>
                          <tr>
                            <td>Biaya Pengiriman</td>
                            <td className="text-right">Rp. {this.calculateShippingCost()}</td>
                          </tr>
                          <tr className="bg-gray-100">
                            <td>Total Pembayaran</td>
                            <td className="text-right">Rp. {this.calculateTotalPayment()}</td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
                        onClick={() => this.processPayment()}
                      >
                        Process Payment
                      </button>
                       </>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userProps: state.auth,
    dataProps: state.products,
    cartProps: state.cart,
    paymentProps: state.payment,
  });
  
  const mapDispatchToProps = {
    getAllProducts, 
    deleteProduct,
    addToCart,
    getAllCart,
    deleteProductInCart,
    statusPaymentOrder,
    processCartToPayment,
    getProvince,
    getKota,
    cekOngkir
  };

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CartPage));