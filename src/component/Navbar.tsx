import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from '../helper/withRouter';
import { logoutAsync } from '../store/auth/AuthSlice';

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

  handleButtonClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  logoutClicked = () => {
    try {
        this.props //dispatch 
          .logoutAsync()
          .then(() => {
            // console.log("tes logout");
            // localStorage.clear();
            // this.props.router.navigate('/login');
          })
          .catch((error: any) => {
            console.error(error);
          });
      } catch (error: any) {
        console.error(error);
      }
  }

  render() {
    const { open } = this.state;
    const userProps = this.props.dataUser;

    return (
      <nav className="bg-gray-700 p-3">
        <div className="flex items-center justify-between w-50">
            <Link to={`/`}>
                <div className="text-white font-semibold text-xl ml-10">e-commerce</div>
            </Link>
            
            <div className="md:flex items-center hidden">
                <span className='text-white mr-5'>
                    {userProps.data.user.nama}
                </span>
            
                <div className="relative group">
                    <button
                        onClick={this.handleButtonClick}
                        className="text-white hover:text-blue-300 focus:outline-none w-20 mr-5">
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
            </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: any) => ({
    dataUser: state.auth
});

const mapDispatchToProps = {
    logoutAsync, // Map the action to props
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));