import React from 'react';
import { ApiProvider } from '../context/ApiContext';
import ProductTable from '../components/ProductTable';
import NavbarComponent from '../components/NavBar';

const Homepage = () => {
  const filters = {
    Quantity_gt: '',
    CostPrice_lt: '',
    CostPrice_gte: ''
  };

  return (
    <ApiProvider supplier="" first={0} last={50} search="" filters={filters}>
       <NavbarComponent />
      <div className='homepage p-5'>
        <h5>Catalog List</h5>
        <ProductTable />
      </div>
    </ApiProvider>
  );
};

export default Homepage;