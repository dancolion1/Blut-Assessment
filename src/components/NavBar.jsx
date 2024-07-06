import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";
import { ApiContext } from "../context/ApiContext";
import "../assets/styles/navbar.scss";
import Logo from "../assets/images/logo.png";
import Avatar from "../assets/images/avatar.png";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSupplier, setSearch, setFilters } = useContext(ApiContext);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState({
    Quantity_gt: "",
    CostPrice_lt: "",
    CostPrice_gte: "",
  });

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleModal = () => setModalOpen(!modalOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchValue);
    setFilters(filterValues);
    toggleModal();
  };

  return (
    <div className="top-nav">
      <Navbar expand="lg" className="sticky-navbar shadow-sm" light>
        <NavbarBrand className="fw-bolder text-dark">
          <NavLink onClick={() => handleNavigation("/")}>
            <img className="img-fluid logo" src={Logo} alt="logo" />
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="justify-content-between" navbar>
          <Nav className="mx-auto" navbar>
            <NavItem className="search-bar">
              <InputGroup>
                <InputGroupText>
                  <FaSearch />
                </InputGroupText>
                <Input
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onClick={toggleModal}
                />
              </InputGroup>
            </NavItem>
          </Nav>
          <Nav className="ml-auto d-flex align-items-center" navbar>
            <NavItem>
              <Button color="light" className="notification-icon">
                <FaBell />
              </Button>
            </NavItem>
            <NavItem>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret color="light" className="user-avatar">
                  <img
                    className="img-fluid avatar mr-2"
                    src={Avatar}
                    alt="avatar"
                  />
                  <span>Deko</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => handleNavigation("/profile")}>
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={() => handleNavigation("/settings")}>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => handleNavigation("/logout")}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Filters</ModalHeader>
        <ModalBody>
          <form className="" onSubmit={handleSearchSubmit}>
            <Row>
              <InputGroup className="mb-3">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Row>
            <Row className="d-flex">
              <Col lg={4}>
                <InputGroup className="mb-3">
                  <Input
                    type="number"
                    name="Quantity_gt"
                    placeholder="Quantity >"
                    value={filterValues.Quantity_gt}
                    onChange={handleFilterChange}
                  />
                </InputGroup>
              </Col>
              <Col lg={4}>
                <InputGroup className="mb-3">
                  <Input
                    type="number"
                    name="CostPrice_lt"
                    placeholder="CostPrice <"
                    value={filterValues.CostPrice_lt}
                    onChange={handleFilterChange}
                  />
                </InputGroup>
              </Col>
              <Col lg={4}>
                <InputGroup className="mb-3">
                  <Input
                    type="number"
                    name="CostPrice_gte"
                    placeholder="CostPrice >="
                    value={filterValues.CostPrice_gte}
                    onChange={handleFilterChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Button type="submit" color="primary">
                Apply Filters
              </Button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NavbarComponent;