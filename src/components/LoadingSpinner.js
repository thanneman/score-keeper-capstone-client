import React, { Component } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default class LoadingSpinner extends Component {

    render() {
     return(
      <Loader
         type="TailSpin"
         color="#FFFFFF"
         height={30}
         width={30}
         timeout={3000} //3 secs

      />
     );
    }
 }