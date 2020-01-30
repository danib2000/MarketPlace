import React, { Component } from 'react';
import CreateProduct from './CreateProduct'

class Home extends Component {
  render() {
    return (
      <div className='mt-5'> 
        <div name="row">
          <main role="main" className="col-lg-12 d-flex">
            <div id="content" style={{marginTop :"40px"}}>
              <CreateProduct/>
            </div>
          </main>
         </div>
      </div>
    );
  }
}

export default Home;