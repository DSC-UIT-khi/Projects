
import React,{useEffect,useState} from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { db } from "../Firebase";
import {getDocs,onSnapshot ,addDoc, collection, query,where } from "@firebase/firestore"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  FormGroup,
  CardFooter,
  Button,
  Form
} from "reactstrap";





function Tables() {


  // for all investor
  let [products, setProducts] = useState("")
  // for single investor
  let [getProductNameByDetail, setInvestorNameByDetail] = useState("")
  let [getProductNameByName, setInvestorNameById] = useState("")
  let [singleProduct, setSingleProduct] = useState([])
  

  useEffect(() =>
  onSnapshot(collection(db, 'products'),
    snapshot => {
      setProducts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })
  , [])


  

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Product Report";
    const headers = [["NAME","Product Type","Product Description"]];

    const data = products.map(e=> [e.product_name, e.category, e.product_desc]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Products</CardTitle>
                
             
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Product Type</th>
                      <th>Product Description</th>
                    </tr>
                  </thead>
                  <tbody>

                    {products.length > 0 ? products.map((e,i)=>{
                      return <tr key={i}>
                      <td>{e.product_name}</td>
                      <td>{e.category}</td>
                      <td>{e.product_desc}</td>
                    </tr>

                    }):<tr><td>OOPs! List Empty</td>
                    </tr>}



                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Button onClick={() => exportPDF()} className="btn-fill" color="primary" type="button">
                Download Data
                </Button>

      </div>
    </>
  );
}

export default Tables;

