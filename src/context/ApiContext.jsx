import React, { createContext, useState, useEffect } from 'react';

const ApiContext = createContext();

const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const ApiProvider = ({ children, defaultSupplier = 'FragranceX', defaultFirst = 0, defaultLast = 50, defaultSearch = '', defaultFilters = {} }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState(defaultSupplier);
  const [first, setFirst] = useState(defaultFirst);
  const [last, setLast] = useState(defaultLast);
  const [search, setSearch] = useState(defaultSearch);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const filterParams = buildQueryString(filters);
    const url = `${import.meta.env.VITE_API_URL}/products/public/catalog?supplier=${supplier}&first=${first}&last=${last}&search=${encodeURIComponent(search)}&${filterParams}`;

    setLoading(true);

    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [supplier, first, last, search, filters]);

  return (
    <ApiContext.Provider
      value={{
        products,
        loading,
        setSupplier,
        setFirst,
        setLast,
        setSearch,
        setFilters
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };