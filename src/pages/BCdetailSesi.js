import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import Select from 'react-select';
import { HashLoader , ScaleLoader } from 'react-spinners';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { CSVReader } from 'react-papaparse'
const buttonRef = React.createRef()

class detailSesi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prmoverlay:false,
            navCollapse:false,
            dataSesi:"",
            tabPRM:"",
            dataZ20:[],
            dataZ20ByCategory:[]
        };
    }
    componentDidMount = async () =>  {
        await this.setState({
        ...this.state,
        prmoverlay:true
        });
        let dataSesiPlain = await localStorage.getItem("dataSesi")
        let dataSesi = JSON.parse(dataSesiPlain)
        let dataZ30Plain = await localStorage.getItem(`Z30${dataSesi.id_opname}`)
        let dataZ20 = dataZ30Plain===null||dataZ30Plain===undefined?[]:JSON.parse(dataZ30Plain)
        let dataZ20ByCategory = await this.z20Perkategory(dataZ20)
        console.log(dataZ20ByCategory);
        this.setState({
        ...this.state,
        dataSesi:dataSesi,
        dataZ20:dataZ20,
        prmoverlay:false,
        dataZ20ByCategory:dataZ20ByCategory
        });
    }
    refreshPageData = async () =>  {
        await this.setState({
        ...this.state,
        prmoverlay:true
        });
        let dataSesiPlain = await localStorage.getItem("dataSesi")
        let dataSesi = JSON.parse(dataSesiPlain)
        let dataZ30Plain = await localStorage.getItem(`Z30${dataSesi.id_opname}`)
        let dataZ20 = dataZ30Plain===null||dataZ30Plain===undefined?[]:JSON.parse(dataZ30Plain)
        let dataZ20ByCategory = await this.z20Perkategory(dataZ20)
        this.setState({
        ...this.state,
        dataSesi:dataSesi,
        dataZ20:dataZ20,
        prmoverlay:false,
        dataZ20ByCategory:dataZ20ByCategory
        });
    }
    z20Perkategory = async (data) =>  {
        let dataDummyz20=data.filter((v,i,a)=>a.findIndex(t=>(t.data3 === v.data3))===i)
        let newDataDummyz20 = []
        for (let i2=0;i2<dataDummyz20.length;i2++) {
            let dataToshow =  data.filter(function(data) {
                return data.data3 == dataDummyz20[i2].data3;
            });
            let dataPushTemp=[]
            let qtyOnhand=0
            for(let i3=0;i3<dataToshow.length;i3++){
                qtyOnhand=parseInt(qtyOnhand)+parseInt(dataToshow[i3].data12)
                dataPushTemp.push({
                "data0": dataToshow[i3].data0,
                "data1": dataToshow[i3].data1,
                "data2": dataToshow[i3].data2,
                "data3": dataToshow[i3].data3,
                "data4": dataToshow[i3].data4,
                "data5": dataToshow[i3].data5,
                "data6": dataToshow[i3].data6,
                "data7": dataToshow[i3].data7,
                "data8": dataToshow[i3].data8,
                "data9": dataToshow[i3].data9,
                "data10": dataToshow[i3].data10,
                "data11": dataToshow[i3].data11,
                "data12": dataToshow[i3].data12,
                "data13": dataToshow[i3].data13,
                "data14": dataToshow[i3].data14,
                "data15": dataToshow[i3].data15,
                "data16": dataToshow[i3].data16,
                })
            }
            newDataDummyz20.push({
                kategory:dataDummyz20[i2].data3,
                onHand:qtyOnhand,
                data:dataPushTemp
            })
            dataPushTemp=[]
            qtyOnhand=0
        }
        return newDataDummyz20
    }
    navToggle = () =>  {
      this.setState({
        ...this.state,
        navCollapse: !this.state.navCollapse
      });
    }
    keluarSesi = async () =>  {
      await localStorage.removeItem("dataSesi");
      this.props.history.push({ pathname: "/home" })
    }
    handleOnDrop = async (data) => {
        let dataCSV=[]
        for(let i=0;i<data.length;i++){
            if(data[i].data[1]!=undefined){
                let dataTopush1 = {
                    data0:data[i].data[0].replace("'", ""),
                    data1:data[i].data[1].replace("'", ""),
                    data2:data[i].data[2].replace("'", ""),
                    data3:data[i].data[3].replace("'", ""),
                    data4:data[i].data[4].replace("'", ""),
                    data5:data[i].data[5].replace("'", ""),
                    data6:data[i].data[6].replace("'", ""),
                    data7:data[i].data[7].trim(),
                    data8:data[i].data[8].replace("'", ""),
                    data9:data[i].data[9].trim(),
                    data10:data[i].data[10].trim(),
                    data11:data[i].data[11].trim(),
                    data12:data[i].data[12].trim(),
                    data13:data[i].data[13].replace(",00", ""),
                    data14:data[i].data[14].replace(",00", ""),
                    data15:data[i].data[15].replace(",00", ""),
                    data16:data[i].data[16].replace(",00", "")
                }
                dataCSV.push(dataTopush1)
            }
        }
        await localStorage.setItem(`Z30${this.state.dataSesi.id_opname}`,JSON.stringify(dataCSV))
        this.refreshPageData()
    }
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    handleOnRemoveFile = (data) => {
        this.setState({
        ...this.state,
        dataZ20:[],
        });
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }
    render() {
        return (
            <div>
                <div style={{visibility:this.state.prmoverlay==true?"visible":"hidden"}}>
                    <div className="overlayMask">
                        <ScaleLoader
                        height={90}
                        width={20}
                        radius={10}
                        margin={10}
                        color={'#ffffff'}
                        loading={this.state.prmoverlay == true?true:false}
                        />
                        <span style={{color:"#ffffff"}}>Waiting for data . . . </span>
                    </div>
                </div>
                <Container fluid={true} style={{padding:0}}>
                    <Navbar color="light" light expand="md" style={{position:"sticky",top:0,zIndex:1}}>
                        <NavbarBrand href="/home" style={{width:"150px"}}>
                        {this.state.dataSesi.lokasi_opname} ( {this.state.dataSesi.tanggal_opname} )
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.navToggle()} />
                        <Collapse isOpen={this.state.navCollapse} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem style={{cursor:"pointer"}}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"",})}>Detail Stok Opname</NavLink>
                            </NavItem>
                            <NavItem style={{cursor:"pointer"}}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"z20",})}>Kelola data Z30</NavLink>
                            </NavItem>
                            <NavItem style={{cursor:"pointer"}}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"scan",})}>Kelola data scan</NavLink>
                            </NavItem>
                            <NavItem style={{cursor:"pointer"}}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"report",})}>Laporan</NavLink>
                            </NavItem>
                            <NavItem style={{cursor:"pointer"}}>
                                <NavLink onClick={() =>  this.keluarSesi()}>Keluar Sesi</NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
                {this.state.tabPRM==""&&
                    <Container fluid={true} style={{padding:0}}>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-4 col-sm-4 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
                                            <span>In charge</span>
                                            <h4>{this.state.dataSesi.nama_user}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-12" style={{padding:10}}>
                                <div className="card" style={{height:"100%"}}>
                                    <div className="card-body">
                                        <h3>Second column</h3>
                                        <p>Normal content.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                                            <span>User yang tergabung</span>
                                            <h4>2 User</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-server fa-5x" aria-hidden="true"></i>
                                            <span>Z30 data</span>
                                            <h4>33955 Product</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-server fa-5x" aria-hidden="true"></i>
                                            <span>Scan data</span>
                                            <h4>42 Product</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data user</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                1116015 - Anbya Army Ali
                                                {/* <span className="badge badge-primary badge-pill">5105 Qty</span> */}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                4119018 - ADITYAS WIDYATMOKO
                                                {/* <span className="badge badge-primary badge-pill">5105 Qty</span> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-6 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data Z30</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            {this.state.dataZ20ByCategory.length > 0 && this.state.dataZ20ByCategory.map((kategory,index) =>
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                                {kategory.kategory}<span className="badge badge-primary badge-pill">{kategory.onHand} Qty</span>
                                            </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Not in SAP-Not in SAP<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data z20 vs data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            ACCESSORIES-MEN<span className="badge badge-danger badge-pill">-5105 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            ACCESSORIES-WOMEN<span className="badge badge-danger badge-pill">-297 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            BOTTOMS-MEN<span className="badge badge-danger badge-pill">-37038 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            BOTTOMS-WOMEN<span className="badge badge-danger badge-pill">-13303 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Not in SAP-Not in SAP<span className="badge badge-danger badge-pill">-76317 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            TOPS-MEN<span className="badge badge-danger badge-pill">-18659 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            TOPS-WOMEN<span className="badge badge-danger badge-pill">-6110 Qty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                }
                {this.state.tabPRM=="z20"&&
                    <Container fluid={true} style={{padding:0}}>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Data Z30</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <div className="card-body">
                                            {this.state.dataZ20.length==0?
                                            <CSVReader
                                                onDrop={this.handleOnDrop}
                                                onError={this.handleOnError}
                                                addRemoveButton
                                                removeButtonColor='#659cef'
                                                onRemoveFile={this.handleOnRemoveFile}
                                            >
                                                <span>Drop CSV file here or click to upload.</span>
                                            </CSVReader>
                                            :
                                            <ul className="list-group">
                                                {this.state.dataZ20ByCategory.length > 0 && this.state.dataZ20ByCategory.map((kategory,index) =>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                                        {kategory.kategory}<span className="badge badge-primary badge-pill">{kategory.onHand} Qty</span>
                                                    </li>
                                                )}
                                            </ul>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                }
                {this.state.tabPRM=="scan"&&
                    <Container fluid={true} style={{padding:0}}>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <div className="card-body">
                                            <ul className="list-group">
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    ACCESSORIES-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    ACCESSORIES-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    BOTTOMS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    BOTTOMS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Not in SAP-Not in SAP<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    TOPS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    TOPS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                }
                {this.state.tabPRM=="report"&&
                    <Container fluid={true} style={{padding:0}}>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-4 col-sm-4 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
                                            <span>In charge</span>
                                            <h4>{this.state.dataSesi.nama_user}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-12" style={{padding:10}}>
                                <div className="card" style={{height:"100%"}}>
                                    <div className="card-body">
                                        <h3>Second column</h3>
                                        <p>Normal content.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                                            <span>User yang tergabung</span>
                                            <h4>2 User</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-server fa-5x" aria-hidden="true"></i>
                                            <span>Z30 data</span>
                                            <h4>33955 Product</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-server fa-5x" aria-hidden="true"></i>
                                            <span>Scan data</span>
                                            <h4>42 Product</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data user</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                1116015 - Anbya Army Ali
                                                {/* <span className="badge badge-primary badge-pill">5105 Qty</span> */}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                4119018 - ADITYAS WIDYATMOKO
                                                {/* <span className="badge badge-primary badge-pill">5105 Qty</span> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-6 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data Z30</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-MEN<span className="badge badge-primary badge-pill">5105 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-WOMEN<span className="badge badge-primary badge-pill">297 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-MEN<span className="badge badge-primary badge-pill">37078 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-WOMEN<span className="badge badge-primary badge-pill">13305 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Not in SAP-Not in SAP<span className="badge badge-primary badge-pill">76317 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-MEN<span className="badge badge-primary badge-pill">18659 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-WOMEN<span className="badge badge-primary badge-pill">6110 Qty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                ACCESSORIES-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                BOTTOMS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Not in SAP-Not in SAP<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-MEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                TOPS-WOMEN<span className="badge badge-danger badge-pill">0 Qty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="h5">Detail data z20 vs data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            ACCESSORIES-MEN<span className="badge badge-danger badge-pill">-5105 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            ACCESSORIES-WOMEN<span className="badge badge-danger badge-pill">-297 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            BOTTOMS-MEN<span className="badge badge-danger badge-pill">-37038 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            BOTTOMS-WOMEN<span className="badge badge-danger badge-pill">-13303 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Not in SAP-Not in SAP<span className="badge badge-danger badge-pill">-76317 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            TOPS-MEN<span className="badge badge-danger badge-pill">-18659 Qty</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                            TOPS-WOMEN<span className="badge badge-danger badge-pill">-6110 Qty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.reducer.userinfo,
    session: state.reducer.session
  };
};

export default withRouter(connect(mapStateToProps)(detailSesi));