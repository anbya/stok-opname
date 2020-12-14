import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
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
import CSVReader from "./csvReader";

class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingParam:"none",
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      prmModaladd:false,
      buttonAddPrm:false,
      buttonAddText:"Add",
      prmModaledit:false,
      PICDetail:"",
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      tambahnamaoutlet:"",
      tambahKeteranganSO:"",
      dateForm:""
    };
  }
  componentDidMount = async () =>  {
    await localStorage.removeItem("dataSesi");
    let dataParse = await localStorage.getItem("authToken")
    let userInfo = JSON.parse(dataParse)
    const dataToSend = {
      NIK:userInfo.NIK
    };
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .post(`https://35de76956587.ngrok.io/z10/daftarSesi`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataSesiOpname: result.data.dataSesi,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = async () =>  {
    let dataParse = await localStorage.getItem("authToken")
    let userInfo = JSON.parse(dataParse)
    const dataToSend = {
      NIK:userInfo.NIK
    };
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .post(`https://35de76956587.ngrok.io/z10/daftarSesi`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataSesiOpname: result.data.dataSesi,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    let dataParse = await localStorage.getItem("authToken")
    let userInfo = JSON.parse(dataParse)
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    await axios
    .get(`https://api.jaygeegroupapp.com/hris/getSCUOutlet`)
    .then( result => {
      this.setState({
        ...this.state,
        masterOutletList: result.data.dataToShow
      });
    })
    .catch(error => {
      console.log(error);
    });
    const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
    this.setState({
      ...this.state,
      loadingParam:"none",
      prmModaladd: true,
      PICDetail:userInfo,
      prmOutlet:"",
      tambahkodeoutlet:"",
      tambahnamaoutlet:"",
      tambahKeteranganSO:"",
      dateForm:dateToForm
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      PICDetail:"",
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      dateForm: "",
      tambahnamaoutlet:"",
      tambahKeteranganSO:""
    });
  }
  loadDataSesi = async (data) =>  {
    await localStorage.setItem("dataSesi",JSON.stringify(data))
    this.props.history.push({ pathname: "/detail" })
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  onSelectChangedMasterOutlet = async (value) => {
    await this.setState({
      ...this.state,
      prmOutlet: value,
      tambahkodeoutlet:value.value,
      tambahnamaoutlet:value.label
    });
  }
  submitData = () => {
    const dataToSend = {
      NIKUSER:this.state.PICDetail.NIK,
      NAMAUSER:this.state.PICDetail.Nama,
      TANGGAL:this.state.dateForm,
      IDLOKASI: this.state.tambahkodeoutlet,
      NAMALOKASI: this.state.tambahnamaoutlet,
      NOTE:this.state.tambahKeteranganSO
    };
    if(dataToSend.IDLOKASI === ""){
      alert("Lokasi stok opname tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://35de76956587.ngrok.io/z10/addSession`, dataToSend, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async result => {
        await this.setState({
          ...this.state,
          buttonAddPrm:false,
          buttonAddText:"Save",
        });
        alert("data berhasil Ditambahkan")
        await this.modalAddClose()
        // this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  render() {
    // console.log(this.state.prmBarang.unit);
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.loadDataSesi(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'ID Opname',
        selector: 'id_opname',
        sortable: true,
      },
      {
        name: 'Tanggal Opname',
        selector: 'tanggal_opname',
        sortable: true,
      },
      {
        name: 'PIC Opname',
        selector: 'nama_user',
        sortable: true,
      },
      {
        name: 'Lokasi Opname',
        selector: 'lokasi_opname',
        sortable: true,
      },
      {
        name: 'Status Opname',
        selector: 'status_opname',
        sortable: true,
      },
      {
        name: 'Tool',
        button: true,
        cell: row => DataButton(row),
      },
    ];
    return (
      <div>
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"} size="lg">
          <ModalHeader toggle={() => this.modalAddClose()}>Form pembuatan sesi opname</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="detailbuatpo">PIC Stok Opname</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.PICDetail.Nama} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal Stok Opname</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="tambahKeteranganSO">Keterangan Stok Opname</Label>
                  <Input type="textarea" name="tambahKeteranganSO" id="tambahKeteranganSO" value={this.state.tambahKeteranganSO} onChange={this.handleChange} placeholder="Keterangan Stok Opname" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="detailbuatpo">Lokasi Stok opname</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmOutlet"
                    value={this.state.prmOutlet}
                    options={this.state.masterOutletList}
                    onChange={this.onSelectChangedMasterOutlet.bind(this)}
                    placeholder="Pilih tujuan kirim"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.submitData()}>
              <ScaleLoader
                height={18}
                width={4}
                radius={2}
                margin={2}
                color={'#FFFFFF'}
                loading={this.state.buttonAddPrm}
              />
              {this.state.buttonAddText}
            </Button>
            <Button color="danger" onClick={() => this.modalAddClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <div>
            <Row>
              <Col xs="12" sm="12" md="12" style={{padding:0}}>
                <div className="card">
                  <div className="card-header">
                    <span style={{fontWeight:"bold"}}>Hello {this.props.userinfo.Nama}</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>daftar sesi stok opname anda</span>
                      </Col>
                      <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-body">
                    <DataTableExtensions
                        columns={columns}
                        data={this.state.dataSesiOpname}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={this.state.pagination}
                        highlightOnHover={this.state.highlight}
                        striped={this.state.striped}
                        progressPending={this.state.loading}
                        noHeader={this.state.noHeader}
                        fixedHeader={this.state.fixedHeader}
                        fixedHeaderScrollHeight="300px"
                      />
                    </DataTableExtensions>
                  </div>
                  {/* <div className="card-body">
                    <CSVReader/>
                  </div> */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
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

export default withRouter(connect(mapStateToProps)(mainPage));