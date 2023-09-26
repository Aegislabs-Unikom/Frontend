import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../store/auth/AuthSlice";
import { withRouter } from "../helper/withRouter";

interface RegisterState {
    nama: string;
    email: string;
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
            password: "",
            confPassword: "",
        };
    }

  handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nama, email, password, confPassword } = this.state;

    if (password === confPassword) {
        try {
            this.props //dispatch 
                .register({ nama, email, password, confPassword })
                .then(() => {
                    this.props.router.navigate('/login');
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
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-1000 md:text-2xl ">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Nama</label>
                                <input type="text"
                                    name="nama"
                                    value={this.state.nama}
                                    onChange={(e) => this.setState({ nama: e.target.value })}
                                    className="bg-gray-900 border text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    className="bg-gray-900 border text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Konfirmasi Password</label>
                                <input type="password"
                                    name="confPassword" 
                                    value={this.state.confPassword}
                                    onChange={(e) => this.setState({ confPassword: e.target.value })}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <button type="submit" className="w-full btn p-3 md:border-2 hover:bg-gray-600 bg-gray-500 text-white transition ease-out duration-500">Register</button>
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