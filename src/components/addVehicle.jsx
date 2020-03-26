import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import { Row,Col,Button } from 'react-bootstrap';
import topPhoto from './../images/form.jpg';
import axios from 'axios';

class AddVehicle extends Component {
    state={
        id:'',
        model:'',
        make:'',
        year:'',
        body: '',
        color: '',
        price:'',
        photos: '',
        addFormMode: true
    }
    componentDidMount() {
        this.setState({
            addFormMode:true
        });
    }
    clearFunc(response){
        console.log(response);
        this.setState({
            id:'',
            model:'',
            make:'',
            year:'',
            body: '',
            color: '',
            price:'',
            photos: '',
            addFormMode:false,
            response:response.data
        });
    }

    handleIdlInput =(event)=>{
        this.setState({
            id: event.target.value
        });
    }

    handleModelInput =(event)=>{
        this.setState({
            model: event.target.value
        });
    }

    handleMakeInput =(event)=>{
        this.setState({
            make: event.target.value
        });
    }

    handleYearInput =(event)=>{
        this.setState({
            year: event.target.value
        });
    }

    handleBodyInput =(event)=>{
        this.setState({
            body: event.target.value
        });
    }

    handleColorInput =(event)=>{
        this.setState({
            color: event.target.value
        });
    }

    handlePriceInput =(event)=>{
        this.setState({
            price: event.target.value
        });
    }

    handlePhotosInput =(event)=>{
        this.setState({
            photos: event.target.value
        });
    }
    
    handleKeepAdding =(event)=>{
        this.setState({
            addFormMode:true
        });
    }
    
    handleSubmit = event =>{
        var self = this;
        let data = JSON.stringify({
                    id:this.state.id,
                    year:this.state.year,
                    body:this.state.body,
                    color:this.state.color,
                    price:this.state.price,
                    photos:[
                        "a","b","c"	
                    ],
                    model:this.state.model,
                    make:this.state.make,
         
        });

        axios.post('http://localhost:57877/v1/AddInventoryItems', data,{
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(function (response) {
            //alert("Car has been added Successfully.");
            console.log(response);
            
            self.clearFunc(response);
          })
          .catch(function (error) {
            console.log(error);
          });
            event.preventDefault();
    }
    
    
    render() { 
        return (
                <div>
                    <Header />
                    <div className="body-content">
                        <div className="container">
                            <Row>
                                <Col sm={12} md={7} lg={7}>
                                {this.state.addFormMode?(
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="add-vehicle-form-top">
                                            <h2>Add Vehicle</h2>
                                        </div>
                                        <div className="add-vehicle-form">
                                            <Row>
                                                <Col sm={4}>  <label>Id :</label> </Col>
                                                <Col sm={8}> <input className="form-control" type="text" value={this.state.id} onChange={this.handleIdlInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Make :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.make} onChange={this.handleMakeInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}>  <label>Model :</label> </Col>
                                                <Col sm={8}> <input className="form-control" type="text" value={this.state.model} onChange={this.handleModelInput}/> </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col sm={4}> <label>Year :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.year} onChange={this.handleYearInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Body :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.body} onChange={this.handleBodyInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Color :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.color} onChange={this.handleColorInput}/> </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={4}> <label>Price :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.price} onChange={this.handlePriceInput}/> </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col sm={4}> <label>photos :</label> </Col>
                                                <Col sm={8}> <input className="form-control"  type="text" value={this.state.photos} onChange={this.handlePhotosInput}/> </Col>
                                            </Row> */}
                                        </div>   
                                        <div className="add-form-submit-area">
                                            <Button type="submit">Submit</Button>
                                        </div>
                                    </form>
                                    ): (
                                    <div className="onSuccessAdd">
                                        <i className="fa fa-check-circle"></i>
                                        <br/>
                                        <p>{ this.state.response }</p>
                                        <br/>
                                        <br/>
                                        <Button className="btn btn-warning" onClick={this.handleKeepAdding}> Keep Adding </Button> 
                                    </div> 
                                    ) }
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Footer />
                </div>
        );
    }
}
 
export default AddVehicle;


   