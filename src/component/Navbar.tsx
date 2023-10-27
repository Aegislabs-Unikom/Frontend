import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from '../helper/withRouter';
import { logoutAsync } from '../store/auth/AuthSlice';
import { getAllCart } from '../store/cart/CartSlice';

type NavbarState = {
  open: boolean;
}

class Navbar extends Component<any, NavbarState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidCatch() {
    this.props.getAllCart()
        .then(function name(params: any) {
        //   console.log(params);       
        });
  }

  handleButtonClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  logoutClicked = async () => {
        await this.props
        .logoutAsync()
        .then(() => {
          localStorage.clear();
          this.props.router.navigate('/login');
        })
        .catch((error:any ) => {
          console.log("Error caught in catch block:", error);
          console.error("Error message:", error.message);
        });
      
  }

  render() {
    const { open } = this.state;
    const userProps = this.props.dataUser;

    const { cartProps } = this.props;
    const cartTotal = cartProps.data.length;

    return (
      <nav className="bg-secondary p-3">
        <div className="flex items-center justify-between w-50">
            <Link to={`/`}>
                <div className="text-white font-bold text-xl ml-10 tracking-widest uppercase">Shopnest</div>
            </Link>
            
            <div className="md:flex items-center hidden">
                <span className='text-white mr-5'>
                    {userProps.data.user.nama}
                </span>
            
                <div className="relative group">
                    <button
                        onClick={this.handleButtonClick}
                        className="text-white hover:text-blue-300 focus:outline-none w-15 mr-3">
                        <img
                        className="h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        />
                    </button>
                {open && (
                    <div className="absolute z-10 mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg">
                        <Link to={`/`}>
                            <p className="block px-4 py-2 hover:bg-blue-100">
                            Profile
                            </p>
                        </Link>
                            <span className="block px-4 py-2 hover:bg-blue-100" onClick={this.logoutClicked}>
                                Logout
                            </span>
                    </div>
                )}
                </div>
                <Link
                  to={"/cart"}>
                  <div className="flex justify-center items-center mr-5 ml-3">
                    <div className="relative">
                      <div className="t-0 absolute left-4">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                          {cartTotal}
                        </p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="file: mt-2 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                  </div>
                </Link>
            </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: any) => ({
    dataUser: state.auth,
    cartProps: state.cart
});

const mapDispatchToProps = {
    logoutAsync,
    getAllCart // Map the action to props
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));