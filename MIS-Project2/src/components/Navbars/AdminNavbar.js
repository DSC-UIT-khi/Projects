
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";

import { NavLink, Link, useLocation } from "react-router-dom";


function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  
  return (
    <>
      <Navbar style={{ backgroundColor:"#8aff57" }} className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
           
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>

          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              
            <Link
                      to={"/admin/"}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <p style={{ color:"white" }}>Home</p>
                    </Link>

                    <Link
                      to={"/admin/vieworder"}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <p style={{ color:"white" }}>View Order</p>
                    </Link>
                    <Link
                      to={"/admin/viewproduct"}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <p style={{ color:"white" }}>View Product</p>
                    </Link>
                    <Link
                      to={"/admin/product"}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <p style={{ color:"white" }}>Add Product</p>
                    </Link>
                    <Link
                      to={"/admin/sale"}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <p style={{ color:"white" }}>Add Order</p>
                    </Link>
                    <Link
                      className="nav-link"
                      activeClassName="active"
                      onClick={()=>props.logoutUser()}
                    >
                      <p style={{ color:"white" }}>Log out</p>
                    </Link>

              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>

        </Container>
      </Navbar>
   
    </>
  );
}

export default AdminNavbar;
