import React, { Component } from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Header from './header';
import Footer from './footer';
import Ad from './ad';
import ListItem from './listItem';
import axios from 'axios';

class List extends Component {
    state={
        isLoaded:false,
        listView:true,
        editView:false,
        detailView:false,
        myList: null,

        editedIdData:'',
        editedMakeData:'',
        editedModelData:'',
        editedYearData:'',
        editedBodyData:'',
        editedColorData:'',
        editedPriceData:''

    };

    editVehicle = obj => e => {
        var self =this;
        this.setState({
            listView: false,
            editView: true,
            editedIdData:obj.id,
            editedMakeData:obj.make,
            editedModelData:obj.model,
            editedYearData:obj.year,
            editedBodyData:obj.body,
            editedColorData:obj.color,
            editedPriceData:obj.price
        });
    };

    deleteVehicle = id => e => {
        var self =this;
        axios.delete('http://localhost:57877/v1/DeleteItemById/'+id, {
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(function (response) {
            self.componentDidMount();
            alert("The vehicle has been deleted Successfully.");
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    
    handleModelInput =(event)=>{
        this.setState({
            editedModelData: event.target.value
        });
    }

    handleMakeInput =(event)=>{
        this.setState({
            editedMakeData: event.target.value
        });
    }

    handleYearInput =(event)=>{
        this.setState({
            editedYearData: event.target.value
        });
    }

    handleBodyInput =(event)=>{
        this.setState({
            editedBodyData: event.target.value
        });
    }

    handleColorInput =(event)=>{
        this.setState({
            editedColorData: event.target.value
        });
    }

    handlePriceInput =(event)=>{
        this.setState({
            editedPriceData: event.target.value
        });
    }

    handleEditDiscard =(event)=>{
        this.setState({
            listView: true,
            editView: false
        });
    }

    handleSubmit = event =>{
        var self =this;
        let data = JSON.stringify({
                    id:this.state.editedIdData,
                    year:this.state.editedYearData,
                    body:this.state.editedBodyData,
                    color:this.state.editedColorData,
                    price:this.state.editedPriceData,
                    photos:[
                        "a","b","c"	
                    ],
                    model:this.state.editedModelData,
                    make:this.state.editedMakeData
         
        });

        axios.put('http://localhost:57877/v1/UpdateInventoryItem', data,{
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(function (response) {
            alert("Car has been updated Successfully.");
            self.componentDidMount();
          })
          .catch(function (error) {
            console.log(error);
          });
          //  event.preventDefault();

    }

    componentDidMount() {
        //fetch("https://localhost:44320/api/vehicles")
        fetch("http://localhost:57877/v1/GetInventoryItems")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                listView:true,
                editView:false,
                myList: result,
              });
              console.log(result);
            },
        
            (error) => {
              this.setState({
                isLoaded: false,
                error
              });
            }
          )
      }
    
    render() { 
        return (  
            <div>
                <Header />
                <div className="body-content">
                    <div className="container">
                        <Container>
                            <Row>
                                <Col sm={0} md={4} lg={4}>
                                    <div>
                                        <Ad/>
                                    </div>
                                </Col>
                                <Col sm={12} md={8} lg={8}>
                                    {this.state.isLoaded && this.state.listView?(
                                        <div>
                                            {this.state.myList.map((eachItem)=>{
                                                return <ListItem item={eachItem} key={eachItem.id} deleteVehicle={this.deleteVehicle} editVehicle={this.editVehicle}/>
                                            })}
                                        </div>
                                    ): null }

                                    {this.state.editView &&(
                                        <div>
                                        <div className="add-vehicle-form-top">
                                            <h2>Edit Info</h2>
                                        </div>
                                        <div className="add-vehicle-form">
                                            <Row>
                                                <Col sm={4}> <label>Make :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.editedMakeData} onChange={this.handleMakeInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}>  <label>Model :</label> </Col>
                                                <Col sm={8}> <input className="form-control" type="text" value={this.state.editedModelData} onChange={this.handleModelInput}/> </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col sm={4}> <label>Year :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.editedYearData} onChange={this.handleYearInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Body :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.editedBodyData} onChange={this.handleBodyInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Color :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.editedColorData} onChange={this.handleColorInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Price :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.editedPriceData} onChange={this.handlePriceInput}/> </Col>
                                            </Row>
                                            
                                        </div>   
                                        <div className="add-form-submit-area">
                                            <Button className="btn btn-success" onClick={this.handleSubmit}>Submit</Button>
                                            &nbsp;&nbsp;
                                            <Button className="btn btn-info" onClick={this.handleEditDiscard}>Discard </Button>
                                        </div>
                                    </div>
                                    )}

                                    {!this.state.isLoaded && this.state.listView && !this.state.editView?(
                                        <div className="no-data-info-box">
                                            <p>No listing available...</p>
                                        </div>
                                    ): null}

                                </Col>
                                
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
 
export default List;