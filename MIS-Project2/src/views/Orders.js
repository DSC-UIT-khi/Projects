
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





function Orders() {


  // for all investor
  let [orders, setOrders] = useState("")
  // for single investor
  let [getOrderNameByDetail, setOrderNameByDetail] = useState("")
  let [getOrderNameByName, setOrderNameById] = useState("")
  let [singleOrder, setSingleOrder] = useState([])
  

  useEffect(() =>
  onSnapshot(collection(db, 'orders'),
    snapshot => {
      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })
  , [])



 const setProductNameThroughId = (e) =>{
  setOrderNameById(e.target.value)
 } 

 const setProductNameThroughDetail = (e) =>{
  setOrderNameByDetail(e.target.value)

 }

  const getProductByName = async() =>{

    const q = query(collection(db, "orders"), where("employee_name", "==", getOrderNameByName));

    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });
    
    console.log(data)

    setSingleOrder(data)

    console.log(getOrderNameByName)


  }

  const getProductByDetail = async() => {
    console.log(getOrderNameByDetail)
    
    const q = query(collection(db, "orders"), where("customer_name", "==", getOrderNameByDetail));

    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id:doc.id,...doc.data()})
    });

    setSingleOrder(data)

  }
  
  

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Product Report";
    const headers = [["ORDERID", "CUSTOMERNAME","EMPLOYEENAME","PRODUCTNAME","QUANTITY"]];

    const data = orders.map(e=> [e.order_id, e.customer_name, e.employee_name,e.product_name,e.quantity]);

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
                <CardTitle tag="h4">All orders</CardTitle>
                
               

              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Order Id</th>
                      <th>Customer Name</th>
                      <th>Customer Phone</th>
                      <th>Employee Name</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orders.length > 0 ? orders.map((e,i)=>{
                      return <tr key={i}>
                      <td style={{maxWidth:"350px"}}>{e.order_id}</td>
                      <td>{e.customer_name}</td>
                      <td>{e.customer_phone}</td>
                      <td>{e.employee_name}</td>
                      <td>{e.product_name}</td>
                      <td>{e.quantity}</td>
                    </tr>

                    }):<tr><td>List Empty</td>
                    </tr>}



                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Button onClick={() => exportPDF()} className="btn-fill" color="primary" type="button">
                Download Data
                </Button>
          </Col>
         
        </Row>
      </div>
    </>
  );
}

export default Orders;

