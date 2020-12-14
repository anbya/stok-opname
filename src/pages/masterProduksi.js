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

class masterProduksi extends Component {
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
      prmModaledit:false,
      detailbuatpo:"",
      dataMasterProduksiH:[],
      dataProduksiPakaiD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailDataProduksi:"",
      // state form add produksi
      prmModaladd:false,
      dateForm:"",
      addNote:"",
      // state button add produksi
      buttonAddPrm:false,
      buttonAddText:"Add",
      // state button edit produksi
      buttonEditPrm:false,
      buttonEditText:"NONACTIVATE",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      masterBarangPakaiList:[],
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      listAddBarangPakai:[],
      tambahqtybarangpakai:"",
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      masterBarangSisaList:[],
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahprmbarangsisa:"",
      tambahopsicost:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmBarangHasil:"",
      masterBarangHasilList:[],
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
      // state edit barang pakai produksi
      prmBarangPakaiE:"",
      masterBarangPakaiListE:[],
      tambahkodebarangpakaiE:"",
      tambahnamabarangpakaiE:"",
      tambahsatuanbarangpakaiE:"",
      listAddBarangPakaiE:[],
      // state edit barang sisa produksi
      prmBarangSisaE:"",
      masterBarangSisaListE:[],
      tambahkodebarangsisaE:"",
      tambahnamabarangsisaE:"",
      tambahsatuanbarangsisaE:"",
      tambahprmbarangsisaE:"",
      tambahkonversionratebarangsisaE:"",
      listAddBarangSisaE:[],
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`http://localhost:3009/centralkitchen/masterproduksi`)
    .then(result => {
      this.setState({
        ...this.state,
        dataMasterProduksiH: result.data.dataMasterProduksiH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`http://localhost:3009/centralkitchen/masterproduksi`)
    .then(result => {
      this.setState({
        ...this.state,
        dataMasterProduksiH: result.data.dataMasterProduksiH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    await axios
    .get(`http://localhost:3009/centralkitchen/getFormAddMasterProduksi`)
    .then( result => {
      this.setState({
        ...this.state,
        masterBarangPakaiList: result.data.dataMasterBarang,
        masterBarangSisaList: result.data.dataMasterBarang,
        masterBarangHasilList: result.data.dataMasterBarang,
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
      dateForm:dateToForm,
      addNote:"",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      tambahqtybarangpakai:"",
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmBarangHasil:"",
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      dateForm:"",
      addNote:"",
      // state tambah barang pakai produksi
      masterBarangPakaiList:[],
      prmBarangPakai:"",
      masterBarangPakaiList:[],
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      listAddBarangPakai:[],
      tambahqtybarangpakai:"",
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      masterBarangSisaList:[],
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahprmbarangsisa:"",
      tambahopsicost:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmBarangHasil:"",
      masterBarangHasilList:[],
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      KODEMASTERPRODUKSIH: data.kode_master_produksi_h
    };
    await axios
    .post(`http://localhost:3009/centralkitchen/getMasterProduksi`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataProduksiHasilD:result.data.dataMasterProduksiHasilD,
        dataProduksiPakaiD:result.data.dataMasterProduksiPakaiD,
        masterBarangPakaiListE: result.data.dataMasterBarang,
        masterBarangSisaListE: result.data.dataMasterBarang,
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataProduksi:data
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"NONACTIVATE",
      dataProduksiHasilD:[],
      dataProduksiPakaiD:[],
      detailDataProduksi:"",
      // state edit barang pakai produksi
      prmBarangPakaiE:"",
      masterBarangPakaiListE:[],
      tambahkodebarangpakaiE:"",
      tambahnamabarangpakaiE:"",
      tambahsatuanbarangpakaiE:"",
      listAddBarangPakaiE:[],
      // state edit barang sisa produksi
      prmBarangSisaE:"",
      masterBarangSisaListE:[],
      tambahkodebarangsisaE:"",
      tambahnamabarangsisaE:"",
      tambahsatuanbarangsisaE:"",
      tambahprmbarangsisaE:"",
      tambahkonversionratebarangsisaE:"",
      listAddBarangSisaE:[],
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  submitData = () => {
    const dataToSend = {
        ADDDATABARANGPAKAI: this.state.listAddBarangPakai,
        ADDDATABARANGHASIL: this.state.listAddBarangHasil
    };
    const cekAddDataBarangPakai = this.state.listAddBarangPakai.length
    const cekAddDataBarangHasil = this.state.listAddBarangHasil.length
    if (cekAddDataBarangHasil < 1){
      alert("Data barang hasil produksi tidak boleh kosong")
    } else if (cekAddDataBarangPakai < 1){
      alert("Data barang pakai produksi tidak boleh kosong")
    } else {
        this.setState({
            ...this.state,
            buttonAddPrm:true,
            buttonAddText:""
        });
        axios
        .post(`http://localhost:3009/centralkitchen/addMasterProduksi`, dataToSend, {
            headers: {
            "Access-Control-Allow-Origin": "*"
            }
        })
        .then(async result => {
            let statusApi = result.data.status
            if(statusApi === "00"){
              await this.setState({
              ...this.state,
              buttonAddPrm:false,
              buttonAddText:"Save",
              });
              alert("kode barang hasil produksi sudah ada di sistem")
            } else {
              await this.setState({
              ...this.state,
              buttonAddPrm:false,
              buttonAddText:"Save",
              });
              alert("data berhasil Ditambahkan")
              await this.modalAddClose()
              // window.open("http://google.com", "_blank")
              this.refreshPageData()
            }
        })
        .catch(error => {
            console.log(error);
            console.log(this.props);
        });
    }
  }
  // function barang hasil produksi
  onSelectChangedMasterBarangHasil = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangHasil: value,
      tambahkodebaranghasil:value.value,
      tambahnamabaranghasil:value.nama_barang,
      tambahsatuanbaranghasil:value.satuan,
    });
  }
  addDataHasil = async () => {
    if(this.state.tambahkodebaranghasil === ""){
      alert("barang hasil produksi tidak boleh kosong")
    } else if(this.state.tambahqtybaranghasil == ""){
      alert("qty barang hasil produksi tidak boleh kosong")
    } else {
      let daftarBarang = this.state.listAddBarangHasil
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebaranghasil}`);
      let dataTopush = {kode_barang:`${this.state.tambahkodebaranghasil}`,nama_barang:`${this.state.tambahnamabaranghasil}`,satuan:`${this.state.tambahsatuanbaranghasil}`,qty:`${this.state.tambahqtybaranghasil}`}
      await daftarBarang.push(dataTopush)
      await this.setState({
        ...this.state,
        listAddBarangHasil: daftarBarang,
        prmBarangHasil:"",
        tambahkodebaranghasil:"",
        tambahnamabaranghasil:"",
        tambahsatuanbaranghasil:"",
        tambahqtybaranghasil:"",
      });
    }
  }
  eraseAddDataHasil = async (keyArray) => {
    let daftarBarang = this.state.listAddBarangHasil
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarangHasil: daftarBarang
    });
  }
  // function barang pakai produksi
  onSelectChangedMasterBarangPakai = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangPakai: value,
      tambahkodebarangpakai:value.value,
      tambahnamabarangpakai:value.nama_barang,
      tambahsatuanbarangpakai:value.satuan,
    });
  }
  addDataPakai = async () => {
    if(this.state.tambahkodebarangpakai === ""){
      alert("barang pakai produksi tidak boleh kosong")
    } else {
      let daftarBarang = this.state.listAddBarangPakai
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangpakai}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarangpakai}`,nama_barang:`${this.state.tambahnamabarangpakai}`,satuan:`${this.state.tambahsatuanbarangpakai}`,qty:`${this.state.tambahqtybarangpakai}`,cost:`0`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          listAddBarangPakai: daftarBarang,
          prmBarangPakai:"",
          tambahkodebarangpakai:"",
          tambahnamabarangpakai:"",
          tambahsatuanbarangpakai:"",
          tambahqtybarangpakai:"",
        });
      } else {
        alert("barang sudah ada di list barang pakai produksi")
        this.setState({
          ...this.state,
          listAddBarangPakai: daftarBarang,
          prmBarangPakai:"",
          tambahkodebarangpakai:"",
          tambahnamabarangpakai:"",
          tambahsatuanbarangpakai:"",
          tambahqtybarangpakai:"",
        });
      }
    }
  }
  eraseAddDataPakai = async (keyArray) => {
    // let daftarBarang = this.state.listAddBarangPakai
    // await daftarBarang.splice(keyArray, 1)
    // await this.setState({
    //   ...this.state,
    //   listAddBarangPakai: daftarBarang
    // });
    let daftarBarangPakai = this.state.listAddBarangPakai
    let daftarBarangSisa = this.state.listAddBarangSisa
    let resultChecked = daftarBarangSisa.find(o => o.prm === `${daftarBarangPakai[keyArray].kode_barang}`);
    if(resultChecked===undefined){
      await daftarBarangPakai.splice(keyArray, 1)
      await this.setState({
        ...this.state,
        listAddBarangPakai: daftarBarangPakai
      });
    } else {
      let result = daftarBarangSisa.filter(o => o.prm === `${daftarBarangPakai[keyArray].kode_barang}`);
      for(let ia =0;ia<result.length;ia++){
        let indexArray = daftarBarangSisa.findIndex(x => x.kode_barang === `${result[ia].kode_barang}`);
        this.eraseAddDataSisa(indexArray)
      }
      await daftarBarangPakai.splice(keyArray, 1)
      await this.setState({
        ...this.state,
        listAddBarangPakai: daftarBarangPakai
      });
    }
  }
  handleChangeDatapakaiQTYD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listAddBarangPakai
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      listAddBarangPakai: daftarBarang
    });
  }
  handleChangeDatapakaiCOSTD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listAddBarangPakai
    daftarBarang[IdData].cost=event.target.value
    this.setState({
      ...this.state,
      listAddBarangPakai: daftarBarang
    });
  }
  // function barang sisa produksi
  onSelectChangedMasterBarangSisa = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangSisa: value,
      tambahkodebarangsisa:value.value,
      tambahnamabarangsisa:value.nama_barang,
      tambahsatuanbarangsisa:value.satuan,
    });
  }
  addDataSisa = async () => {
    if(this.state.tambahkodebarangsisa === ""){
      alert("barang sisa produksi tidak boleh kosong")
    } else if(this.state.tambahprmbarangsisa === ""){
        alert("barang pakai tidak boleh kosong")
    } else if(this.state.tambahopsicost === ""){
        alert("pengaturan cost tidak boleh kosong")
    } else {
      let daftarBarang = this.state.listAddBarangSisa
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangsisa}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarangsisa}`,nama_barang:`${this.state.tambahnamabarangsisa}`,prm:`${this.state.tambahprmbarangsisa}`,opsicost:`${this.state.tambahopsicost}`,satuan:`${this.state.tambahsatuanbarangsisa}`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          listAddBarangSisa: daftarBarang,
          prmBarangSisa:"",
          tambahkodebarangsisa:"",
          tambahnamabarangsisa:"",
          tambahsatuanbarangsisa:"",
          tambahprmbarangsisa:"",
          tambahopsicost:"",
        });
      } else {
        alert("barang sudah ada di list barang sisa produksi")
        this.setState({
          ...this.state,
          listAddBarangSisa: daftarBarang,
          prmBarangSisa:"",
          tambahkodebarangsisa:"",
          tambahnamabarangsisa:"",
          tambahsatuanbarangsisa:"",
          tambahprmbarangsisa:"",
          tambahopsicost:"",
        });
      }
    }
  }
  eraseAddDataSisa = async (keyArray) => {
    let daftarBarang = this.state.listAddBarangSisa
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarangSisa: daftarBarang
    });
  }
  // function edit barang pakai produksi
  onSelectChangedMasterBarangPakaiE = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangPakaiE: value,
      tambahkodebarangpakaiE:value.value,
      tambahnamabarangpakaiE:value.nama_barang,
      tambahsatuanbarangpakaiE:value.satuan,
    });
  }
  addDataPakaiE = async () => {
    if(this.state.tambahkodebarangpakaiE === ""){
      alert("barang pakai produksi tidak boleh kosong")
    } else {
      let daftarBarang = this.state.dataProduksiPakaiD
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangpakaiE}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarangpakaiE}`,nama_barang:`${this.state.tambahnamabarangpakaiE}`,satuan_barang:`${this.state.tambahsatuanbarangpakaiE}`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          dataProduksiPakaiD: daftarBarang,
          prmBarangPakaiE:"",
          tambahkodebarangpakaiE:"",
          tambahnamabarangpakaiE:"",
          tambahsatuanbarangpakaiE:"",
        });
      } else {
        alert("barang sudah ada di list barang pakai produksi")
        this.setState({
          ...this.state,
          dataProduksiPakaiD: daftarBarang,
          prmBarangPakaiE:"",
          tambahkodebarangpakaiE:"",
          tambahnamabarangpakaiE:"",
          tambahsatuanbarangpakaiE:"",
        });
      }
    }
  }
  eraseAddDataPakaiE = async (keyArray) => {
    // let daftarBarang = this.state.dataProduksiPakaiD
    // await daftarBarang.splice(keyArray, 1)
    // await this.setState({
    //   ...this.state,
    //   dataProduksiPakaiD: daftarBarang
    // });
    let daftarBarangPakai = this.state.dataProduksiPakaiD
    let daftarBarangSisa = this.state.dataProduksiSisaD
    let resultChecked = daftarBarangSisa.find(o => o.prm_kode_barang_pakai === `${daftarBarangPakai[keyArray].kode_barang}`);
    if(resultChecked===undefined){
      await daftarBarangPakai.splice(keyArray, 1)
      await this.setState({
        ...this.state,
        dataProduksiPakaiD: daftarBarangPakai
      });
    } else {
      let result = daftarBarangSisa.filter(o => o.prm_kode_barang_pakai === `${daftarBarangPakai[keyArray].kode_barang}`);
      for(let ia =0;ia<result.length;ia++){
        let indexArray = daftarBarangSisa.findIndex(x => x.kode_barang === `${result[ia].kode_barang}`);
        this.eraseAddDataSisaE(indexArray)
      }
      await daftarBarangPakai.splice(keyArray, 1)
      await this.setState({
        ...this.state,
        dataProduksiPakaiD: daftarBarangPakai
      });
    }
  }
  // function barang sisa produksi
  onSelectChangedMasterBarangSisaE = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangSisaE: value,
      tambahkodebarangsisaE:value.value,
      tambahnamabarangsisaE:value.nama_barang,
      tambahsatuanbarangsisaE:value.satuan,
    });
  }
  addDataSisaE = async () => {
    if(this.state.tambahkodebarangsisaE === ""){
      alert("barang sisa produksi tidak boleh kosong")
    } else if(this.state.tambahprmbarangsisaE === ""){
        alert("barang pakai tidak boleh kosong")
    } else if(this.state.tambahkonversionratebarangsisaE === ""){
        alert("satuan konversi tidak boleh kosong")
    } else {
      let daftarBarang = this.state.dataProduksiSisaD
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangsisaE}`);
      if(resultChecked===undefined){
        let dataTopush = {
        kode_barang:`${this.state.tambahkodebarangsisaE}`,
        nama_barang_sisa:`${this.state.tambahnamabarangsisaE}`,
        prm_kode_barang_pakai:`${this.state.tambahprmbarangsisaE}`,
        conversion_rate:`${this.state.tambahkonversionratebarangsisaE}`,
        satuan_barang_sisa:`${this.state.tambahsatuanbarangsisaE}`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          dataProduksiSisaD: daftarBarang,
          prmBarangSisaE:"",
          tambahkodebarangsisaE:"",
          tambahnamabarangsisaE:"",
          tambahsatuanbarangsisaE:"",
          tambahprmbarangsisaE:"",
          tambahkonversionratebarangsisaE:"",
        });
      } else {
        alert("barang sudah ada di list barang sisa produksi")
        this.setState({
          ...this.state,
          dataProduksiSisaD: daftarBarang,
          prmBarangSisaE:"",
          tambahkodebarangsisaE:"",
          tambahnamabarangsisaE:"",
          tambahsatuanbarangsisaE:"",
          tambahprmbarangsisaE:"",
          tambahkonversionratebarangsisaE:"",
        });
      }
    }
  }
  eraseAddDataSisaE = async (keyArray) => {
    let daftarBarang = this.state.dataProduksiSisaD
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      dataProduksiSisaD: daftarBarang
    });
  }
  // function update master produksi
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      IDPLANPRODUCTION:this.state.detailDataProduksi.kode_master_produksi_h
    };
    axios
    .post(`http://localhost:3009/centralkitchen/updateMasterProduksi`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"NONACTIVATE",
      });
      alert("Data plan produksi berhasil di nonaktifkan")
      await this.modalEditClose()
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  // function delete master produksi
  deleteData = (data) => {
    const dataToSend = {
      ID: data.kode_master_produksi_h,
    };
    axios
    .post(`http://localhost:3009/centralkitchen/deleteMasterProduksi`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      alert("data berhasil dihapus")
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
        {/* <button className="myBtn" onClick={() => { if (window.confirm('Apakah anda yakin akan menghapus master produksi ini ?')) this.deleteData(data) } }><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button> */}
      </div>
    );
    const columns = [
      {
        name: 'Kode Master Produksi',
        selector: 'kode_master_produksi_h',
        sortable: true,
      },
      {
        name: 'Nomor Master Produksi',
        selector: 'nomor_master_produksi',
        sortable: true,
      },
      {
        name: 'Kode Barang',
        selector: 'kode_barang',
        sortable: true,
      },
      {
        name: 'Nama Barang',
        selector: 'nama_barang',
        sortable: true,
      },
      {
        name: 'Tanggal Buat',
        selector: 'tanggal_buat',
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
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalAddClose()}>Form master plan produksi</ModalHeader>
          <ModalBody>
            {/* hasil produksi section start */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang hasil produksi</h3>
              </Col>
            </Row>
            {
            this.state.listAddBarangHasil.length > 0 ?""
            :
            <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
              <Col xs="12" sm="12" md="7">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={true}
                  name="prmBarangHasil"
                  value={this.state.prmBarangHasil}
                  options={this.state.masterBarangHasilList}
                  onChange={this.onSelectChangedMasterBarangHasil.bind(this)}
                  placeholder="Pilih Barang"
                />
              </Col>
              <Col xs="12" sm="12" md="2">
                <Input
                  type="number"
                  name="tambahqtybaranghasil"
                  id="tambahqtybaranghasil"
                  placeholder="qty"
                  value={this.state.tambahqtybaranghasil}
                  onChange={this.handleChange}
                  min="0"
                />
              </Col>
              <Col xs="12" sm="12" md="1" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <span style={{fontWeight:"bold"}}>{this.state.tambahsatuanbaranghasil == ""?"---":this.state.tambahsatuanbaranghasil+"/batch"}</span>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button block={true} color="success" onClick={() => this.addDataHasil()}>
                  Add
                </Button>
              </Col>
            </Row>
            }
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarangHasil.length > 0 && this.state.listAddBarangHasil.map((listAddBarangHasil,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.kode_barang}</span></Col>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.satuan}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddDataHasil(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* hasil produksi section end */}
            {/* pakai produksi section start */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang pakai produksi</h3>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
              <Col xs="12" sm="12" md="7">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={true}
                  name="prmBarangPakai"
                  value={this.state.prmBarangPakai}
                  options={this.state.masterBarangPakaiList}
                  onChange={this.onSelectChangedMasterBarangPakai.bind(this)}
                  placeholder="Pilih Barang"
                />
              </Col>
              <Col xs="12" sm="12" md="2">
                <Input
                  type="number"
                  name="tambahqtybarangpakai"
                  id="tambahqtybarangpakai"
                  placeholder="qty"
                  value={this.state.tambahqtybarangpakai}
                  onChange={this.handleChange}
                  min="0"
                />
              </Col>
              <Col xs="12" sm="12" md="1" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <span style={{fontWeight:"bold"}}>{this.state.tambahsatuanbarangpakai == ""?"---":this.state.tambahsatuanbarangpakai+"/batch"}</span>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button block={true} color="success" onClick={() => this.addDataPakai()}>
                  Add
                </Button>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarangPakai.length > 0 && this.state.listAddBarangPakai.map((listAddBarangPakai,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.kode_barang}</span></Col>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.satuan}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddDataPakai(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* pakai produksi section end */}
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
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Master plan Produksi</ModalHeader>
          <ModalBody>
            {/* hasil produksi section start */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang hasil produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiHasilD.length > 0 && this.state.dataProduksiHasilD.map((dataProduksiHasilD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* hasil produksi section end */}
            {/* pakai produksi section start */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang pakai produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiPakaiD.length > 0 && this.state.dataProduksiPakaiD.map((dataProduksiPakaiD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="danger" block={true} onClick={() => { if (window.confirm('Apakah anda yakin akan menonaktifkan master plan produksi ini ?')) this.updateData() } }>
                  <ScaleLoader
                    height={18}
                    width={4}
                    radius={2}
                    margin={2}
                    color={'#FFFFFF'}
                    loading={this.state.buttonEditPrm}
                  />
                  {this.state.buttonEditText}
                </Button>
              </Col>
            </Row>
            {/* pakai produksi section end */}
          </ModalBody>
          {/* <ModalFooter>
            <Button color="success" onClick={() => this.updateData()}>
              <ScaleLoader
                height={18}
                width={4}
                radius={2}
                margin={2}
                color={'#FFFFFF'}
                loading={this.state.buttonEditPrm}
              />
              {this.state.buttonEditText}
            </Button>
            <Button color="danger" onClick={() => this.modalEditClose()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Master Plan Produksi</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataMasterProduksiH}
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(masterProduksi));