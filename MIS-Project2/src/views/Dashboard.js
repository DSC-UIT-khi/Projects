
import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar, Doughnut, Radar, Pie,Scatter,Bubble } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,

  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { db } from "../Firebase";
import {getDocs,onSnapshot ,addDoc, collection, query,where } from "@firebase/firestore"

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");

  const [orders, setOrders] = useState("")
  const [products, setProducts] = useState("")

  const setBgChartData = (name) => {
    setbigChartData(name);
  };


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



  return (
    <>
      <div className="content">
        <Row>
        

        <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Products Added per month</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  
                  <Pie
                    data={
                      (canvas) => {
                        let ctx = canvas.getContext("2d");
                    
                        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                    
                        gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
                        gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
                        gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
                    
                        return {
                          labels: ["JAN", "FEB", "MAR"],
                          datasets: [
                            {
                              label: "",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#00d6b4",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#00d6b4",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#00d6b4",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: [products.length],
                            },
                          ],
                        }
                    }}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
        </Col>
          </Row>

          <Row>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Orders Added per month</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  
                  <Pie
                    data={
                      (canvas) => {
                        let ctx = canvas.getContext("2d");
                    
                        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                    
                        gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
                        gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
                        gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
                    
                        return {
                          labels: ["JAN", "FEB", "MAR"],
                          datasets: [
                            {
                              label: "",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#00d6b4",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#00d6b4",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#00d6b4",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: [orders.length],
                            },
                          ],
                        }
                    }}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
        </Col>
        </Row>
       
      </div>
    </>
  );
}

export default Dashboard;
