import React, { Component } from 'react';
import {  Row,Col,Button,FormControl,Badge,Form} from 'react-bootstrap';
import axios from 'axios';
import carPhoto from './../images/4.jpg';
import ListItem from './listItem';

class SearchBar extends Component {
    state = { 
        searchby:'',
        searchText:'',
        disabled: true,
        searchBarView:true,
        resultList:null,
        
        searchResultView: true,
        editView:false,

        editedIdData:'',
        editedMakeData:'',
        editedModelData:'',
        editedYearData:'',
        editedBodyData:'',
        editedColorData:'',
        editedPriceData:''
    }

    componentDidMount() {
        fetch("http://localhost:57877/v1/GetInventoryItems")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                resultList: result,
              });
              console.log(result);
            },
        
            (error) => {
              this.setState({
                error
              });
            }
          )
      }
    
    editVehicle = obj => e => {
        var self =this;
        this.setState({
            searchBarView: false,
            searchResultView: false,
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
            alert("The vehicle has been deleted Successfully.");
            
          })
          .catch(function (error) {
            console.log(error);
          });

          //delete item from in the list
          var items = self.state.resultList.filter(item => item.id !== id);
          this.setState({
            resultList: items,
          });
    };
    


    searchByMake =(event)=>{
        this.setState({
            searchby:'make', 
            disabled:false
        });
    }

    
    searchByModel=(event)=>{
        this.setState({
            searchby:'model', 
            disabled:false
        });
    }
    
    handleTextInput =(event)=>{
        this.setState({
            searchText: event.target.value
        });
    }

    handleBackToSearchBar =(event)=>{
        this.setState({
            searchBarView: true
        });
    }

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

    handleEdit = event =>{
        this.setState({
            searchBarView: false,
            searchResultView: true,
            editView: false
        });

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
        
        //update in the list
        var restOftheItems= self.state.resultList.filter(item => item.id !== this.state.editedIdData);
        var x = {'id': this.state.editedIdData,  'year':this.state.editedYearData,
                 'body':this.state.editedBodyData,'color':this.state.editedColorData,
                 'price':this.state.editedPriceData,
                 'photos':[
                        "a","b","c"	
                  ],
                 'model':this.state.editedModelData,'make':this.state.editedMakeData};

          this.setState({
            resultList: restOftheItems.concat(x)
          });
        
        axios.put('http://localhost:57877/v1/UpdateInventoryItem', data,{
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(function (response) {
            alert("Car has been updated Successfully.");
          })
          .catch(function (error) {
            console.log(error);
          });
          //  event.preventDefault();

          

    }

    handleEditDiscard =(event)=>{
        this.setState({
            searchBarView: false,
            searchResultView: true,
            editView: false
        });
    }

    handleSubmit = event =>{
        this.setState({
            searchBarView:false
        });
        console.log(this.state.searchby + this.state.searchText);

        var self = this;
        let data = JSON.stringify({
            type:this.state.searchby,
            text:this.state.searchText
        });

        console.log(data);

        axios.post('http://localhost:57877/v1/SearchBy', data,{
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(function (response) {
            console.log(response);
            
            self.setState({
                resultList: response.data,
              })
          })
          .catch(function (error) {
            console.log(error);
          });
            event.preventDefault();
    }

    render() { 
        return (  
            <div>
                {this.state.searchBarView ?(
                <div className="search-bar-banner">
                    <div className="container">
                        <div className="search-bar-heading">
                            <h1> Search your car invertory </h1>
                            <br/>
                            <br/>

                            <Row>
                                <Col md={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3}}>
                                    <div className="searchbox">
                                        <p className="searchByTextHeading">Please select a type to search by :</p>
                                        <span className="searchByText">Search by Make</span>
                                        <input type="radio"
                                        name="searchBy"
                                        checked={this.state.checkboxChecked}
                                        onChange={this.searchByMake}/>   
                                        
                                        &nbsp;  &nbsp; &nbsp; 
                                        
                                        <span className="searchByText">Search by Model</span>
                                        <input type="radio"
                                        name="searchBy"
                                        checked={this.state.checkboxChecked}
                                        onChange={this.searchByModel} /> 
                                        
                                        {!this.state.disabled ?(
                                            <div >
                                                <form onSubmit={this.handleSubmit}>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.searchText} onChange={this.handleTextInput}/>
                                                    
                                                    <Button type="submit" className="btn btn-success">Search</Button>
                                                </form>
                                            </div>
                                        ): null}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                 ):(
                 <div className="search-result-box">
                     <div className="container">
                        <Row>
                            <Col md={3} sm={4}>
                                <div className="left-info-box">
                                    <h4>search by :  <Badge pill variant="primary">{this.state.searchby}</Badge> <span>  </span></h4>
                                    <hr/>
                                    <Button className="btn btn-success" onClick={this.handleBackToSearchBar}> Back to search page</Button>
                                </div>
                            </Col>
                            <Col md={9} sm={8}>
                                {this.state.searchResultView &&(
                                    <div>
                                        {this.state.resultList.map((eachItem)=>{
                                            return <ListItem item={eachItem} key={eachItem.id} deleteVehicle={this.deleteVehicle} editVehicle={this.editVehicle}/>
                                        })}
                                    </div>
                                )}

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
                                            <Button className="btn btn-success" onClick={this.handleEdit}>Submit</Button>
                                            &nbsp;&nbsp;
                                            <Button className="btn btn-info" onClick={this.handleEditDiscard}>Discard </Button>
                                        </div>
                                    </div>
                                    )}
                            </Col>
                         </Row>
                     </div>
                 </div>
                 )}
            </div>
            
        );
    }
}
 
export default SearchBar;