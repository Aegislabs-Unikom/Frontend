import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyOTP } from "../store/auth/AuthSlice";
import { withRouter } from "../helper/withRouter";
import { Link } from "react-router-dom";

interface verifState {
  otp: string;
}

class VerifyOTP extends Component<any, verifState> {
    constructor(props: {}) {
      super(props);
      this.handleFormSubmit=this.handleFormSubmit.bind(this);

      this.state = {
        otp: ""
      };
    }

  handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const {  otp } = this.state;
      this.props //dispatch 
        .verifyOTP({ otp })
        .then(() => {
          this.props.router.navigate('/login');
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
        <section className="bg-primary ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 text-white">
                <div className="w-full bg-secondary rounded-lg md:mt-0 sm:max-w-md xl:p-0 relative">
                    <Link to={`/`} className="flex justify-center">
                        <span className="absolute text-white font-bold text-3xl tracking-widest uppercase mb-7 bottom-[100%]">Shopnest</span>
                    </Link>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-semibold leading-tight tracking-wide text-center uppercase text-gray-1000 md:text-2xl ">
                            Verification Code <br/> Check your email!
                        </h1>
                        <form className="space-y-4 md:space-y-10" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-300 ">Verification Code</label>
                                <input type="text"
                                    name="otp"
                                    value={this.state.otp}
                                    onChange={(e) => this.setState({ otp: e.target.value })}
                                    className="bg-secondary border px-5 sm:text-sm rounded-lg  focus:border-primary-600 block w-full py-2.5" placeholder="Enter verification code" />
                            </div>
                            <div className="flex flex-col items-center gap-4">
                              <button type="submit" className="px-10 font-bold btn py-1.5 bg-primary duration-500 rounded-md text-secondary">Login</button>
                              <p className="text-sm font-light text-gray-300">
                                Already have an account?  
                                <Link to={'/login'}
                                  className="font-medium hover:underline text-primary ml-1">
                                   Login
                                </Link>
                              </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
  }
};

const mapDispatchToProps = {
  verifyOTP, // Map the action to props
};

const mapStateToProps = (state: any) => {
  return{
    userData: state.auth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyOTP));