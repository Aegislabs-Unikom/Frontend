import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../store/auth/AuthSlice";
import { withRouter } from "../helper/withRouter";

import signUpImage from "../assets/images/signup.jpg"

interface RegisterState {
    nama: string;
    email: string;
    alamat: string;
    no_hp: string;
    password: string;
    confPassword:string;
}

class Register extends Component<any, RegisterState> {
    constructor(props: {}) {
        super(props);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);

        this.state = {
            nama: "",
            email: "",
            alamat: "",
            no_hp: "",
            password: "",
            confPassword: "",
        };
    }

  handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { 
        nama, 
        email, 
        // alamat, 
        no_hp, 
        password, 
        confPassword } = this.state;

    if (password === confPassword) {
        try {
            this.props //dispatch 
                .register({ 
                    nama,
                    email, 
                    // alamat, 
                    no_hp, 
                    password, 
                    confPassword 
                })
                .then((response: any) => {
                    this.props.router.navigate('/verifyOTP');
                })
                .catch((error: any) => {
                    console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("password tidak sama");
    }
  };

  render() {
    return (
        <section className="bg-secondary min-h-screen flex flex-col justify-center md:justify-normal md:flex-row-reverse items-center md:pl-10">
            <div className="hidden md:block">
                <img src={signUpImage} alt="" className="object-cover w-full h-screen" />
            </div>
            <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto lg:py-0 min-w-[22rem] md:min-w-[27rem]">
                <div className="w-full rounded-lg md:mt-0 sm:max-w-md text-white xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex flex-col items-center">
                          <h1 className="uppercase text-xl font-bold leading-tight tracking-tight text-gray-1000 md:text-2xl">
                              Sign Up
                          </h1>
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label  className="block mb-2 text-sm font-medium ">Nama</label>
                                <input type="text"
                                    name="nama"
                                    value={this.state.nama}
                                    onChange={(e) => this.setState({ nama: e.target.value })}
                                    className="bg-secondary border px-5 sm:text-sm rounded-lg focus:border-primary-600 block w-full py-2.5" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium ">Email</label>
                                <input type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    className="bg-secondary border px-5 sm:text-sm rounded-lg focus:border-primary-600 block w-full py-2.5" placeholder="Enter your email" />
                            </div>
                            {/* <div>
                                <label  className="block mb-2 text-sm font-medium ">Alamat</label>
                                <input type="text"
                                    name="alamat"
                                    value={this.state.alamat}
                                    onChange={(e) => this.setState({ alamat: e.target.value })}
                                    className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5" placeholder="username" />
                            </div> */}
                            <div>
                                <label  className="block mb-2 text-sm font-medium ">No Handphone</label>
                                <input type="number"
                                    name="noHp"
                                    value={this.state.no_hp}
                                    onChange={(e) => this.setState({ no_hp: e.target.value })}
                                    className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5" placeholder="Enter your address" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium ">Password</label>
                                <input type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    placeholder="••••••••" className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium ">Konfirmasi Password</label>
                                <input type="password"
                                    name="confPassword" 
                                    value={this.state.confPassword}
                                    onChange={(e) => this.setState({ confPassword: e.target.value })}
                                    placeholder="••••••••" className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5" />
                            </div>
                            <button type="submit" className="font-medium w-full rounded-md bg-primary btn p-3 hover:bg-gray-600 text-secondary transition ease-out duration-500">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      
    );
  }
};

const mapDispatchToProps = {
    register,
};

const mapStateToProps = (state: any) => {
  return {
    userData: state.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));