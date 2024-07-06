import React, { useContext, useState, useEffect } from "react";
import { Table, Nav, NavItem, NavLink } from "reactstrap";
import { ApiContext } from "../context/ApiContext";
import "../assets/styles/productTable.scss";

const suppliers = ["FragranceX", "FragranceNet", "Morris Costumes"];

const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProductTable = () => {
  const { products, loading, setSupplier } = useContext(ApiContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeSupplier, setActiveSupplier] = useState("FragranceX");

  useEffect(() => {
    if (selectAll) {
      setSelectedProducts(products.map((product) => product.SKU));
    } else {
      setSelectedProducts([]);
    }
  }, [selectAll, products]);

  const handleCheckboxChange = (sku) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(sku)
        ? prevSelected.filter((id) => id !== sku)
        : [...prevSelected, sku]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleSupplierChange = (supplier) => {
    setActiveSupplier(supplier);
    setSupplier(supplier);
  };

  return (
    <div className="product-table-container">
      <Nav className="supplier-nav d-flex justify-content-center">
        {suppliers.map((supplier) => (
          <NavItem key={supplier}>
            <NavLink
              href="#"
              active={activeSupplier === supplier}
              onClick={() => handleSupplierChange(supplier)}
            >
              {supplier}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table responsive className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>S/N</th>
              <th>Image</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.SKU}>
                <td data-label="Select">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.SKU)}
                    onChange={() => handleCheckboxChange(product.SKU)}
                  />
                </td>
                <td data-label="S/N">{index + 1}</td>
                <td data-label="Image">
                  <img
                    src={product.Image_1}
                    alt={product.Name}
                    className="product-image"
                  />
                </td>
                <td data-label="SKU">{product.SKU}</td>
                <td data-label="Name">{truncateText(product.Name, 20)}</td>
                <td data-label="Title">{truncateText(product.Title, 20)}</td>
                <td data-label="Description">{truncateText(product.Description, 20)}</td>
                <td data-label="Brand">{truncateText(product.Brand, 20)}</td>
                <td data-label="Cost Price">{truncateText(product["Cost Price"], 20)}</td>
                <td data-label="Quantity">{truncateText(product.Quantity, 20)}</td>
                <td data-label="Size">{truncateText(product.size, 20)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductTable;