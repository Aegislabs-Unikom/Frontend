import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAsync } from "../store/auth/AuthSlice";
import { withRouter } from "../helper/withRouter";
import { Link } from "react-router-dom";

import loginImage from "../assets/images/login.png";

interface LoginState {
  email: string;
  password: string;
}

class Login extends Component<any, LoginState> {
  constructor(props: {}) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;
      this.props //dispatch
        .loginAsync({ email, password })
        .then(() => {
          this.props.router.navigate("/");
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <section className="bg-secondary min-h-screen flex md:block flex-col relative">
        <Link to={`/`} className="md:absolute top-4 mt-10 md:mt-0">
          <span className="text-white font-bold text-xl ml-12 md:ml-10 tracking-widest uppercase">Shopnest</span>
        </Link>
        <div className="flex flex-col-reverse md:flex-row items-center md:px-10 md:min-h-screen">
          <div className="grid place-content-center w-full">
            <img src={loginImage} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center px-6 md:py-8 w-full lg:py-0">
            <div className="w-full rounded-lg text-white md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-6 md:space-y-10 sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="uppercase text-xl font-bold leading-tight tracking-tight text-gray-1000 md:text-2xl ">
                    Welcome
                  </h1>
                  <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                    Welcome back! Please enter your details.
                  </p>
                </div>
                <form
                  className="space-y-8 md:space-y-10"
                  onSubmit={this.handleFormSubmit}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium ">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium ">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="bg-secondary border focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full px-5 py-2.5 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <button
                      type="submit"
                      className="font-medium w-full rounded-md bg-primary btn p-3 hover:bg-gray-600 text-secondary transition ease-out duration-500"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light">
                      Don’t have an account yet?
                      <Link
                        to={"/register"}
                        className="font-medium text-blue hover:underline dark:text-primary ml-1"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  loginAsync, // Map the action to props
};

const mapStateToProps = (state: any) => {
  return {
    userData: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
