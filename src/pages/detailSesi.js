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
    Label,
} from "reactstrap";
import {
    Accordion,
    Card 
} from 'react-bootstrap';
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
            dataZ20ByCategory:[],
            z30OnHand:0,
            dataZ30Detail:[],
            dataScan:[],
            dataScanByCategory:[],
            onScan:0,
            dataScanDetail:[],
            dataz30VsScanByCategory:[],
            dataz30VsScan:[],
            dataUser:[],
        };
    }
    loadingToggle = () => {
        this.setState({
        ...this.state,
        prmoverlay:!this.state.prmoverlay,
        });
    }
    componentDidMount = async () =>  {
        this.loadingToggle()
        let dataSesiPlain = await localStorage.getItem("dataSesi")
        let dataSesi = JSON.parse(dataSesiPlain)
        const dataToSend = {
            IDOPNAME:dataSesi.id_opname
        };
        axios.post(`https://35de76956587.ngrok.io/z10/getSesiData`, dataToSend, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async result => {
            let dataZ20ByCategory = await this.z20Perkategory(result.data.dataZ30)
            let dataScanByCategory = await this.scanPerkategory(result.data.dataZ30,result.data.dataScan)
            let z30OnHand = await this.z30OnHandCount(dataZ20ByCategory)
            let onScan = await this.OnScanCount(dataScanByCategory)
            let dataz30VsScanByCategory = await this.dataz30VsScanByCategoryProsess(dataZ20ByCategory,dataScanByCategory)
            let dataz30VsScan = await this.dataz30VsScanProsess(result.data.dataZ30,result.data.dataScan)
            let dataUser = await this.dataUserProses(result.data.dataScan)
            this.setState({
            ...this.state,
            dataSesi:dataSesi,
            dataZ20:result.data.dataZ30,
            dataZ20ByCategory:dataZ20ByCategory,
            z30OnHand:z30OnHand,
            dataScan:result.data.dataScan,
            dataScanByCategory:dataScanByCategory,
            onScan:onScan,
            dataz30VsScanByCategory:dataz30VsScanByCategory,
            dataz30VsScan:dataz30VsScan,
            dataUser:dataUser
            });
            this.loadingToggle()
        })
        .catch(error => {
            console.log(error);
        });
    }
    refreshPageData = async () =>  {
        let dataSesiPlain = await localStorage.getItem("dataSesi")
        let dataSesi = JSON.parse(dataSesiPlain)
        const dataToSend = {
            IDOPNAME:dataSesi.id_opname
        };
        axios.post(`https://35de76956587.ngrok.io/z10/getSesiData`, dataToSend, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async result => {
            let dataZ20ByCategory = await this.z20Perkategory(result.data.dataZ30)
            let dataScanByCategory = await this.scanPerkategory(result.data.dataZ30,result.data.dataScan)
            let z30OnHand = await this.z30OnHandCount(dataZ20ByCategory)
            let onScan = await this.OnScanCount(dataScanByCategory)
            let dataz30VsScanByCategory = await this.dataz30VsScanByCategoryProsess(dataZ20ByCategory,dataScanByCategory)
            let dataz30VsScan = await this.dataz30VsScanProsess(result.data.dataZ30,result.data.dataScan)
            let dataUser = await this.dataUserProses(result.data.dataScan)
            this.setState({
            ...this.state,
            dataSesi:dataSesi,
            dataZ20:result.data.dataZ30,
            dataZ20ByCategory:dataZ20ByCategory,
            z30OnHand:z30OnHand,
            dataScan:result.data.dataScan,
            dataScanByCategory:dataScanByCategory,
            onScan:onScan,
            dataz30VsScanByCategory:dataz30VsScanByCategory,
            dataz30VsScan:dataz30VsScan,
            dataUser:dataUser
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    z20Perkategory = async (data) =>  {
        let dataDummyz20=data.filter((v,i,a)=>a.findIndex(t=>(t.department === v.department))===i)
        let newDataDummyz20 = []
        for (let i2=0;i2<dataDummyz20.length;i2++) {
            let dataToshow =  data.filter(function(data) {
                return data.department == dataDummyz20[i2].department;
            });
            let dataPushTemp=[]
            let qtyOnhand=0
            for(let i3=0;i3<dataToshow.length;i3++){
                qtyOnhand=parseInt(qtyOnhand)+parseInt(dataToshow[i3].onhand_qty)
                dataPushTemp.push({
                "class": dataToshow[i3].class,
                "color_code": dataToshow[i3].color_code,
                "department": dataToshow[i3].department,
                "division": dataToshow[i3].division,
                "id_opname": dataToshow[i3].id_opname,
                "onhand_cost": dataToshow[i3].onhand_cost,
                "onhand_qty": parseInt(dataToshow[i3].onhand_qty),
                "onhand_retail": dataToshow[i3].onhand_retail,
                "product_code": dataToshow[i3].product_code,
                "season": dataToshow[i3].season,
                "season_collection": dataToshow[i3].season_collection,
                "short_name": dataToshow[i3].short_name,
                "size_code": dataToshow[i3].size_code,
                "store_code": dataToshow[i3].store_code,
                "store_name": dataToshow[i3].store_name,
                "sub_department": dataToshow[i3].sub_department,
                "unit_average_cost": dataToshow[i3].unit_average_cost,
                "unit_retail_price": dataToshow[i3].unit_retail_price
                })
            }
            newDataDummyz20.push({
                kategory:dataDummyz20[i2].department,
                onHand:qtyOnhand,
                data:dataPushTemp
            })
            dataPushTemp=[]
            qtyOnhand=0
        }
        return newDataDummyz20
    }
    z30OnHandCount = async (data) =>  {
        let datax = data
        let qtyOnhand=0
        for (let i2=0;i2<datax.length;i2++) {
            qtyOnhand=parseInt(qtyOnhand)+parseInt(datax[i2].onHand)
        }
        return qtyOnhand
    }
    scanPerkategory = async (data1,data2) =>  {
        let dataDummyz20=data1.filter((v,i,a)=>a.findIndex(t=>(t.department === v.department))===i)
        let newDataDummyz20 = []
        for (let i2=0;i2<dataDummyz20.length;i2++) {
            let dataToshow =  data2.filter(function(data) {
                return data.product_category == dataDummyz20[i2].department;
            });
            let dataPushTemp=[]
            let qtyOnhand=0
            for(let i3=0;i3<dataToshow.length;i3++){
                qtyOnhand=parseInt(qtyOnhand)+1
                dataPushTemp.push({
                "NIK": dataToshow[i3].NIK,
                "barcode": dataToshow[i3].barcode,
                "id_opname": dataToshow[i3].id_opname,
                "inseam": dataToshow[i3].inseam,
                "lokasi": dataToshow[i3].lokasi,
                "pc9": dataToshow[i3].pc9,
                "product_category": dataToshow[i3].product_category,
                "short_name": dataToshow[i3].short_name,
                "status_upload": dataToshow[i3].status_upload,
                "waist": dataToshow[i3].waist
                })
            }
            newDataDummyz20.push({
                kategory:dataDummyz20[i2].department,
                onScan:qtyOnhand,
                data:dataPushTemp
            })
            dataPushTemp=[]
            qtyOnhand=0
        }
        this.dataScanDetailProcess(data1,data2)
        return newDataDummyz20
    }
    OnScanCount = async (data) =>  {
        let datax = data
        let qtyOnhand=0
        for (let i2=0;i2<datax.length;i2++) {
            qtyOnhand=parseInt(qtyOnhand)+parseInt(datax[i2].onScan)
        }
        return qtyOnhand
    }
    dataScanDetailProcess = async (data1,data2) =>  {
        let dataScanDetail=[]
        let dataKategory=data1.filter((v,i,a)=>a.findIndex(t=>(t.department === v.department))===i)
        for (let i1=0;i1<dataKategory.length;i1++) {
            let dataLevel1 =  data2.filter(function(data) {
                return data.product_category == dataKategory[i1].department;
            });
            let dataScanDetailPC9List=[]
            let dataPC9=dataLevel1.filter((v,i,a)=>a.findIndex(t=>(t.pc9 === v.pc9))===i)
            for (let i2=0;i2<dataPC9.length;i2++) {
                let dataLevel2 =  data2.filter(function(data) {
                    return data.product_category == dataKategory[i1].department&&data.pc9 == dataPC9[i2].pc9;
                });
                let dataWaist=dataLevel2.filter((v,i,a)=>a.findIndex(t=>(t.waist === v.waist))===i)
                for (let i3=0;i3<dataWaist.length;i3++) {
                    let dataLevel3 =  data2.filter(function(data) {
                        return data.product_category == dataKategory[i1].department&&data.pc9 == dataPC9[i2].pc9&&data.waist == dataWaist[i3].waist;
                    });
                    let dataInseam=dataLevel3.filter((v,i,a)=>a.findIndex(t=>(t.inseam === v.inseam))===i)
                    for (let i4=0;i4<dataInseam.length;i4++) {
                        let dataLevel4 =  data2.filter(function(data) {
                            return data.product_category == dataKategory[i1].department&&data.pc9 == dataPC9[i2].pc9&&data.waist == dataWaist[i3].waist&&data.inseam == dataInseam[i4].inseam;
                        });
                        dataScanDetailPC9List.push({
                        "NIK": dataLevel4[0].NIK,
                        "barcode": dataLevel4[0].barcode,
                        "id_opname": dataLevel4[0].id_opname,
                        "inseam": dataLevel4[0].inseam,
                        "lokasi": dataLevel4[0].lokasi,
                        "pc9": dataLevel4[0].pc9,
                        "product_category": dataLevel4[0].product_category,
                        "short_name": dataLevel4[0].short_name,
                        "status_upload": dataLevel4[0].status_upload,
                        "waist": dataLevel4[0].waist,
                        "onScan": dataLevel4.length
                        })
                    }
                }
            }
            dataScanDetail.push({
                kategory:dataKategory[i1].department,
                onScan:dataLevel1.length,
                data:dataScanDetailPC9List
            })
        }
        this.setState({
        ...this.state,
        dataScanDetail:dataScanDetail
        });
    }
    dataz30VsScanByCategoryProsess = async (dataZ30,dataScan) =>  {
        let dataz30VsScanByCategory=[]
        for (let i1=0;i1<dataZ30.length;i1++) {
            let dataScanFind =  dataScan.filter(function(data) {
                return data.kategory == dataZ30[i1].kategory;
            });
            // console.log("dataScanFind",dataScanFind);
            dataz30VsScanByCategory.push({
                kategory:dataZ30[i1].kategory,
                onHand:dataZ30[i1].onHand,
                onScan:dataScanFind.length>0?dataScanFind[0].onScan:0,
                dataDiff:parseInt(dataScanFind.length>0?dataScanFind[0].onScan:0)-parseInt(dataZ30[i1].onHand)
            })
        }
        return dataz30VsScanByCategory
    }
    dataz30VsScanProsess = async (dataZ30,dataScan) =>  {
        let dataz30VsScan=[]
        for (let i1=0;i1<dataZ30.length;i1++) {
            let dataScanFind =  dataScan.filter(function(data) {
                return data.pc9 == dataZ30[i1].product_code&&data.waist == dataZ30[i1].size_code&&data.inseam == dataZ30[i1].color_code;
            });
            let onScan=dataScanFind.length>0?dataScanFind.length:0
            let diffQty=parseInt(onScan)-parseInt(dataZ30[i1].onhand_qty)
            // console.log("dataScanFind",dataScanFind);
            diffQty!=0&&
            dataz30VsScan.push({
                "class": dataZ30[i1].class,
                "color_code": dataZ30[i1].color_code,
                "department": dataZ30[i1].department,
                "division": dataZ30[i1].division,
                "id_opname": dataZ30[i1].id_opname,
                "onhand_cost": dataZ30[i1].onhand_cost,
                "onhand_qty": dataZ30[i1].onhand_qty,
                "onscan_qty": onScan,
                "diff_qty": diffQty,
                "onhand_retail": dataZ30[i1].onhand_retail,
                "product_code": dataZ30[i1].product_code,
                "season": dataZ30[i1].season,
                "season_collection": dataZ30[i1].season_collection,
                "short_name": dataZ30[i1].short_name,
                "size_code": dataZ30[i1].size_code,
                "store_code": dataZ30[i1].store_code,
                "store_name": dataZ30[i1].store_name,
                "sub_department": dataZ30[i1].sub_department,
                "unit_average_cost": dataZ30[i1].unit_average_cost,
                "unit_retail_price": dataZ30[i1].unit_retail_price
            })
        }
        return dataz30VsScan
    }
    dataUserProses = async (dataScan) =>  {
        let dataUserProsesRaw=dataScan.filter((v,i,a)=>a.findIndex(t=>(t.NIK === v.NIK))===i)
        let dataUserProses=[]
        for (let i1=0;i1<dataUserProsesRaw.length;i1++) {
            let JSONUser = await localStorage.getItem("userdata")
            let userParse = JSON.parse(JSONUser)
            let dataUserFind =  userParse.filter(function(data) {
                return data.NIK == dataUserProsesRaw[i1].NIK;
            });
            dataUserProses.push({
                "NIK": dataUserFind[0].NIK,
                "Nama": dataUserFind[0].Nama,
                "previlege": dataUserFind[0].previlege
            })
        }
        return dataUserProses
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
        this.loadingToggle()
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
                    data7:data[i].data[7].replace("'", ""),
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
        const dataToSend = {
            DATAZ30:dataCSV,
            IDOPNAME:this.state.dataSesi.id_opname
        };
        axios.post(`https://35de76956587.ngrok.io/z10/uploadZ30`, dataToSend, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async result => {
            await this.refreshPageData()
            this.loadingToggle()
        })
        .catch(error => {
            console.log(error);
        });
    }
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    hapusDataZ30 = async (data) => {
        this.loadingToggle()
        const dataToSend = {
            IDOPNAME:this.state.dataSesi.id_opname
        };
        axios.post(`https://35de76956587.ngrok.io/z10/hapusZ30`, dataToSend, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async result => {
            alert("Berhasil mengahapus data Z30")
            await this.refreshPageData()
            this.loadingToggle()
        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        // console.log("dataZ20",this.state.dataZ20);
        // console.log("dataScan",this.state.dataScan);
        // console.log("dataZ20ByCategory",this.state.dataZ20ByCategory);
        // console.log("dataScanByCategory",this.state.dataScanByCategory);
        // console.log("dataz30VsScanByCategory",this.state.dataz30VsScanByCategory);
        // console.log("dataz30VsScan",this.state.dataz30VsScan);
        console.log("dataUser",this.state.dataUser);
        const columnScan = [
          {
            name: 'Product code',
            selector: 'pc9',
            sortable: true,
          },
          {
            name: 'Product name',
            selector: 'short_name',
            sortable: true,
          },
          {
            name: 'Waist',
            selector: 'waist',
            sortable: true,
          },
          {
            name: 'Inseam',
            selector: 'inseam',
            sortable: true,
          },
          {
            name: 'onScan',
            selector: 'onScan',
            sortable: true,
          },
        ];
        const columnZ30 = [
            {
              name: 'Product category',
              selector: 'department',
              sortable: true,
            },
            {
              name: 'Product code',
              selector: 'product_code',
              sortable: true,
            },
            {
              name: 'Product name',
              selector: 'short_name',
              sortable: true,
            },
            {
              name: 'Waist',
              selector: 'size_code',
              sortable: true,
            },
            {
              name: 'Inseam',
              selector: 'color_code',
              sortable: true,
            },
            {
              name: 'onHand',
              selector: 'onhand_qty',
              sortable: true,
            },
        ];
        const columnScanVsZ30 = [
            {
              name: 'Product category',
              selector: 'department',
              sortable: true,
            },
            {
              name: 'Product code',
              selector: 'product_code',
              sortable: true,
            },
            {
              name: 'Product name',
              selector: 'short_name',
              sortable: true,
            },
            {
              name: 'Waist',
              selector: 'size_code',
              sortable: true,
            },
            {
              name: 'Inseam',
              selector: 'color_code',
              sortable: true,
            },
            {
              name: 'onHand',
              selector: 'onhand_qty',
              sortable: true,
            },
            {
              name: 'onScan',
              selector: 'onscan_qty',
              sortable: true,
            },
            {
              name: 'diff',
              selector: 'diff_qty',
              sortable: true,
            },
        ];
        const conditionalInventoryRowStyles = [
          {
            when: row => row.diff_qty < 0,
            style: row =>({
              color: 'red',
              '&:hover': {
                color: 'red',
                cursor: 'pointer',
              },
            }),
          },
        ];
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
                        JAYGEEGROUP
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.navToggle()} />
                        <Collapse isOpen={this.state.navCollapse} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className={this.state.tabPRM==""?"myNavbarStyle-active":"myNavbarStyle"}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"",})}>Detail Stok Opname</NavLink>
                            </NavItem>
                            <NavItem className={this.state.tabPRM=="z20"?"myNavbarStyle-active":"myNavbarStyle"}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"z20",})}>Kelola data Z30</NavLink>
                            </NavItem>
                            <NavItem className={this.state.tabPRM=="scan"?"myNavbarStyle-active":"myNavbarStyle"}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"scan",})}>Kelola data scan</NavLink>
                            </NavItem>
                            <NavItem className={this.state.tabPRM=="report"?"myNavbarStyle-active":"myNavbarStyle"}>
                                <NavLink onClick={() => this.setState({...this.state,tabPRM:"report",})}>Laporan</NavLink>
                            </NavItem>
                            <NavItem className={"myNavbarStyle"}>
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
                                <div className="card" style={{height:"100%"}}>
                                    <div className="card-body" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
                                        <p>Session Number</p>
                                        <h3>{this.state.dataSesi.id_opname}</h3>
                                        <p>Opname Location</p>
                                        <h3>{this.state.dataSesi.lokasi_opname}</h3>
                                        <p>Opname date</p>
                                        <h3>{this.state.dataSesi.tanggal_opname}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                            <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                                            <span>User yang tergabung</span>
                                            <h4>{this.state.dataUser.length} User</h4>
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
                                            <h4>{this.state.z30OnHand} Product</h4>
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
                                            <h4>{this.state.onScan} Product</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span class="h5">Detail data user</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul class="list-group">
                                            {this.state.dataUser.length > 0 && this.state.dataUser.map((dataUser,index) =>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                {dataUser.NIK} - {dataUser.Nama}
                                            </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-6 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span class="h5">Detail data Z30</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul class="list-group">
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
                                        <span class="h5">Detail data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul class="list-group">
                                            {this.state.dataScanByCategory.length > 0 && this.state.dataScanByCategory.map((kategory,index) =>
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                                {kategory.kategory}<span className={kategory.onScan>0?"badge badge-primary badge-pill":"badge badge-danger badge-pill"}>{kategory.onScan} Qty</span>
                                            </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span class="h5">Detail data z20 vs data scan percategory</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <ul class="list-group">
                                            {this.state.dataz30VsScanByCategory.length > 0 && this.state.dataz30VsScanByCategory.map((kategory,index) =>
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                                {kategory.kategory}<span className={kategory.dataDiff<0?"badge badge-danger badge-pill":"badge badge-primary badge-pill"}>{kategory.dataDiff} Qty</span>
                                            </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters row-flex" style={{padding:10}}>
                            <div className="col-md-12 col-sm-12 col-xs-12" style={{padding:10}}>
                                <div className="card">
                                    <div className="card-header">
                                        <span class="h5">Detail data z20 vs data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <DataTableExtensions
                                            columns={columnScanVsZ30}
                                            data={this.state.dataz30VsScan}
                                            print={false}
                                            exportHeaders={false}
                                            export={false}
                                        >
                                            <DataTable
                                            defaultSortField="title"
                                            pagination={true}
                                            highlightOnHover={true}
                                            striped={false}
                                            progressPending={false}
                                            noHeader={true}
                                            fixedHeader={false}
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5,10,50,100]}
                                            fixedHeaderScrollHeight="300px"
                                            conditionalRowStyles={conditionalInventoryRowStyles}
                                            />
                                        </DataTableExtensions>
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
                                        <span class="h5">Data Z30</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        {this.state.dataZ20.length==0?
                                        <div className="card-body">
                                            <CSVReader
                                                onDrop={this.handleOnDrop}
                                                onError={this.handleOnError}
                                                addRemoveButton
                                                removeButtonColor='#659cef'
                                            >
                                                <span>Drop CSV file here or click to upload.</span>
                                            </CSVReader>
                                        </div>
                                        :
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <DataTableExtensions
                                                        columns={columnZ30}
                                                        data={this.state.dataZ20}
                                                        print={false}
                                                        exportHeaders={false}
                                                        export={false}
                                                    >
                                                        <DataTable
                                                        defaultSortField="title"
                                                        pagination={true}
                                                        highlightOnHover={true}
                                                        striped={false}
                                                        progressPending={false}
                                                        noHeader={true}
                                                        fixedHeader={false}
                                                        paginationPerPage={5}
                                                        paginationRowsPerPageOptions={[5,10,50,100]}
                                                        fixedHeaderScrollHeight="300px"
                                                        />
                                                    </DataTableExtensions>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Button color="danger" block={true} onClick={()=>this.hapusDataZ30()}>Hapus data Z30</Button>
                                                </div>
                                            </div>
                                        </div>
                                        }
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
                                        <span class="h5">Data scan</span>
                                    </div>
                                    <div className="card-body" style={{padding:0}}>
                                        <div className="card-body">
                                            <Accordion defaultActiveKey="0">
                                                {this.state.dataScanDetail.length > 0 && this.state.dataScanDetail.map((kategory,index) =>
                                                <Card key={index}>
                                                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                                                        <div className="row">
                                                            <div className="col" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                                                {kategory.kategory}
                                                            </div>
                                                            <div className="col" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                                                                <span className={kategory.onScan>0?"badge badge-primary badge-pill":"badge badge-danger badge-pill"}>{kategory.onScan} Qty</span>
                                                            </div>
                                                        </div>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={index}>
                                                    <Card.Body>
                                                        <DataTableExtensions
                                                            columns={columnScan}
                                                            data={kategory.data}
                                                            print={false}
                                                            exportHeaders={false}
                                                            export={false}
                                                        >
                                                            <DataTable
                                                            defaultSortField="title"
                                                            pagination={true}
                                                            highlightOnHover={true}
                                                            striped={false}
                                                            progressPending={false}
                                                            noHeader={true}
                                                            fixedHeader={false}
                                                            paginationPerPage={5}
                                                            paginationRowsPerPageOptions={[5]}
                                                            fixedHeaderScrollHeight="300px"
                                                            />
                                                        </DataTableExtensions>
                                                    </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                                )}
                                            </Accordion>
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