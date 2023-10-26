import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "../helper/withRouter";


// class PrivateRoute extends Component {
//     render() {
//         const { userData } = this.props;
//         const data = userData.data;
//         const hasToken = data.accessToken !== undefined;
//         console.log(hasToken);
//         return hasToken ? <Component/> : <Navigate to="/login"/>;
//         // if (hasToken) {
//         //     return <Component/>
//         // } else {
//         //     return <Navigate to="/login"/>;            
//         // }
//     };
// };

// const mapStateToProps = (state: any) => {
//     return{
//       userData: state.auth,
//       dataProps: state.products
//     }
//   };
  
// export default connect(mapStateToProps, )(withRouter(PrivateRoute));

function PrivateRoute(props: any) {
    let { component: Component } = props;
    let hasToken = useSelector((state: any) => state.auth.data.accessToken); //mapstate to props
    let auth = hasToken !== undefined;

    return auth ? <Component/> : <Navigate to="/login"/>;
}
export default PrivateRoute;  