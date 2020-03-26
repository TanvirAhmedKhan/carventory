import React, { Component } from 'react';
import carPhoto from './../images/4.jpg';
import bikePhoto from './../images/bike.jpg';
import { Row,Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class ListItem extends Component {
   state={
        HideListItemAfterDelete:false
   };
    
    render() { 
        return (  
                <div className="vehicle-card">
                    <Row>
                        <Col sm={5}>
                            <img src={carPhoto} className="card-image" alt="logo" />
                        </Col>
                        <Col sm={7}>
                            <div className="vehicle-card-info">
                                <div>Id: {this.props.item.id}</div>
                                <div>Make: {this.props.item.make}</div>
                                <div>Model:{this.props.item.model}</div>
                                <div>Year:{this.props.item.year}</div>
                                <div>Body:{this.props.item.body}</div>
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className="card-lower-info-box">
                                <Row>
                                    <Col md={3}>
                                        <div> Price: {this.props.item.price} $</div>
                                    </Col>
                                    <Col md={{ span: 4, offset: 5 }} sm={{ span: 6, offset: 3}}>
                                    
                                        <Button className="btn btn-info"
                                                    onClick={this.props.editVehicle(this.props.item)}>
                                                    <i className="fa fa-edit"></i> Edit</Button> 
                                        &nbsp;&nbsp;
                                        <Button className="btn btn-danger"
                                                onClick={this.props.deleteVehicle(this.props.item.id)}>
                                                <i className="fa fa-trash"></i> Delete</Button> 
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>    
        );
    }
}
 
export default ListItem;