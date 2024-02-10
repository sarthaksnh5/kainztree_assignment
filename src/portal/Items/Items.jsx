import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaDotCircle } from "react-icons/fa";

import { FilterMatchMode, FilterService } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { LuDollarSign } from "react-icons/lu";

function Items() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [tableDataLoading, setTableDataLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [addItem, setAddItem] = useState("");

  const [Categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      var token = localStorage.getItem("user-token");

      let res = await fetch("http://127.0.0.1:8000/api-product/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.clear();
          navigate("/auth/login");
          toast.error("Token expired");
        } else {
          toast.error("Error in fetching server data");
        }
      } else {
        var response = await res.json();
        setCategories(response);
        setTotalCategories(response.length);
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to fetch Categories! Please Refresh");
    }
  };

  const getTableData = async () => {
    setTableDataLoading(true);

    try {
      var token = localStorage.getItem("user-token");

      let res = await fetch("http://127.0.0.1:8000/api-product/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.clear();
          navigate("/auth/login");
          toast.error("Token expired");
        } else {
          toast.error("Error in fetching server data");
        }
      } else {
        var response = await res.json();
        setTotalItems(response.length);
        setTableData(response);
        setTableDataLoading(false);
      }
    } catch (e) {
      toast.error("Error in fetching the data");
      console.log(e);
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    getCategories();
    getTableData();
  }, []);

  const tagsRender = (rowData) => {
    var tags = rowData.tags.split(",");

    return (
      <>
        {tags.map((item) => {
          return <>{item === "dollar" && <LuDollarSign />}</>;
        })}
      </>
    );
  };

  const stockRender = (rowData) => {
    var isAvai = parseInt(rowData.availableStock) > 0;

    return (
      <>
        {rowData.stocks} <FaDotCircle color={isAvai ? "green" : "red"} />
      </>
    );
  };

  const tableHeader = () => {
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  setAddItem("item");
                  setShowModal(true);
                }}
                variant="success"
              >
                NEW ITEM
              </Button>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const addNewItem = async (e) => {
    e.preventDefault();
    const formElement = document.querySelector("#itemForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);
    formDataJSON["availableStock"] = formDataJSON["stocks"];

    const btnPointer = document.querySelector("#item-btn");
    btnPointer.innerHTML = "Please wait...";
    btnPointer.disabled = true;

    try {
      var token = localStorage.getItem("user-token");

      const response = await fetch(
        "http://127.0.0.1:8000/api-product/products",
        {
          method: "POST",
          body: JSON.stringify(formDataJSON),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Item Added");
        getTableData();
        setShowModal(false);
      } else {
        toast.error("Unable to Add");
      }
    } catch (e) {
      console.log(e);
    }

    btnPointer.innerHTML = "ADD";
    btnPointer.disabled = false;
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    const formElement = document.querySelector("#categoryForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);

    const btnPointer = document.querySelector("#category-btn");
    btnPointer.innerHTML = "Please wait...";
    btnPointer.disabled = true;

    try {
      var token = localStorage.getItem("user-token");

      const response = await fetch(
        "http://127.0.0.1:8000/api-product/category",
        {
          method: "POST",
          body: JSON.stringify(formDataJSON),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Category Added");
        getCategories();
        setShowModal(false);
      } else {
        toast.error("Unable to Add");
      }
    } catch (e) {
      console.log(e);
    }

    btnPointer.innerHTML = "ADD";
    btnPointer.disabled = false;
  };

  return (
    <React.Fragment>
      <Container className="py-5">
        <Row>
          <Col>
            <h3 className="fw-normal">Item Dashboard</h3>
            <p>
              Welcome to the Item Dashboard! Here you can view and manage all
              items in the system.
            </p>
          </Col>
          <Col>
            <Row>
              <Col>Total Categories</Col>
              <Col>{totalCategories}</Col>
            </Row>
            <hr />
            <Row>
              <Col>Total Items</Col>
              <Col>{totalItems}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant={"success"}
              onClick={() => {
                setAddItem("category");
                setShowModal(true);
              }}
            >
              NEW ITEM CATEGORY
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            {tableDataLoading ? (
              <Spinner variant="primary" />
            ) : (
              <DataTable
                header={tableHeader}
                value={tableData}
                showGridlines={true}
                stripedRows={true}
                tableStyle={{ minWidth: "50rem" }}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                rowHover
                removableSort
                filters={filters}
                filterDisplay="row"
              >
                <Column header="SKU" field="sku" sortable></Column>
                <Column header="Name" field="name" sortable></Column>
                <Column
                  header="Tags"
                  field="tags"
                  sortable
                  body={tagsRender}
                ></Column>
                <Column
                  header="Category"
                  field="category_name.name"
                  sortable
                ></Column>
                <Column
                  header="In Stock"
                  field="stocks"
                  sortable
                  body={stockRender}
                ></Column>
                <Column
                  header="Available"
                  field="availableStock"
                  sortable
                ></Column>
              </DataTable>
            )}
          </Col>
        </Row>
        <Dialog
          visible={showModal}
          onHide={() => setShowModal(false)}
          breakpoints={{ "960px": "75vw", "640px": "100vw" }}
          style={{ width: "50vw" }}
          header="ADD A NEW ITEM"
        >
          <Row>
            <Col>
              {addItem == "item" ? (
                <Form id="itemForm" onSubmit={addNewItem}>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-sku"}>SKU</FormLabel>
                    <input
                      type={"text"}
                      className="form-control"
                      id={"login-sku"}
                      name="sku"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-name"}>Name</FormLabel>
                    <input
                      type={"text"}
                      className="form-control"
                      id={"login-name"}
                      name="name"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-name"}>Tags</FormLabel>
                    <input
                      type={"text"}
                      className="form-control"
                      id={"login-name"}
                      name="tags"
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-name"}>Category</FormLabel>
                    <select className="form-control" name="category">
                      {Categories.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-name"}>Stock</FormLabel>
                    <input
                      type={"text"}
                      className="form-control"
                      id={"login-name"}
                      name="stocks"
                      required
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    className="btn-success mt-2"
                    id="item-btn"
                  >
                    ADD
                  </Button>
                </Form>
              ) : (
                <Form id="categoryForm" onSubmit={addNewCategory}>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={"login-name"}>Name</FormLabel>
                    <input
                      type={"text"}
                      className="form-control"
                      id={"login-name"}
                      name="name"
                      required
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    className="btn-success mt-2"
                    id="category-btn"
                  >
                    ADD
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
        </Dialog>
      </Container>
    </React.Fragment>
  );
}

export default Items;
