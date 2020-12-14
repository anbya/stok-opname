import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
  InputGroup,
  InputGroupAddon,
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
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import dataDummy from "./dummyData";
import { HashLoader, ScaleLoader } from "react-spinners";
import Select from "react-select";
import { CSVReader } from "react-papaparse";

class z10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prmoverlay:false,
        dataZ10: [],
    };
  }

  loadingToggle = () => {
    this.setState({
      ...this.state,
      prmoverlay: !this.state.prmoverlay,
    });
  };
  cekData = (data) => {
      let csvFormat =[
        "Product_Code",
        "short_name",
        "Season",
        "Level1_Description",
        "Level2_Description",
        "Level3_Description",
        "Level4_Description",
        "size_code",
        "color_code",
        "SHORT_SKU",
        "barcode",
        "SKU_TYPE_CODE",
        "Retail_Price",
        "ts_id"]
      let dataEror =0
      for(let icek=0;icek<14;icek++){
        if(data[0].data[icek]!=csvFormat[icek]){
            dataEror++
        }
      }
      if(dataEror>0){
        alert("format csv tidak sesuai")
        this.props.history.push({pathname: "/temp"})
        this.props.history.goBack()
      } else {
        this.handleOnDrop(data)
      }
  };
  handleOnDrop = async (data) => {
    this.loadingToggle()
    let dataCSV=[]
    for(let i=1;i<data.length;i++){
        if(data[i].data[1]!=undefined){
            let dataTopush1 = {
                Product_Code:data[i].data[0].trim().replace("'", "").replace(`"`, ``),
                short_name:data[i].data[1].trim().replace("'", "").replace(`"`, ``),
                Season:data[i].data[2].trim().replace("'", "").replace(`"`, ``),
                Level1_Description:data[i].data[3].trim().replace("'", "").replace(`"`, ``),
                Level2_Description:data[i].data[4].trim().replace("'", "").replace(`"`, ``),
                Level3_Description:data[i].data[5].trim().replace("'", "").replace(`"`, ``),
                Level4_Description:data[i].data[6].replace("'", "").replace(`"`, ``),
                size_code:data[i].data[7].trim().replace("'", "").replace(`"`, ``),
                color_code:data[i].data[8].trim().replace("'", "").replace(`"`, ``),
                SHORT_SKU:data[i].data[9].trim().replace("'", "").replace(`"`, ``),
                barcode:data[i].data[10].trim().replace("'", "").replace(`"`, ``),
                SKU_TYPE_CODE:data[i].data[11].trim().replace("'", "").replace(`"`, ``),
                Retail_Price:data[i].data[12].trim().replace(".00", "").replace(",", "").replace(`"`, ``),
                ts_id:data[i].data[13].trim().replace("'", "").replace(`"`, ``)
            }
            dataCSV.push(dataTopush1)
        }
    }
    await this.setState({
      ...this.state,
      dataZ10: dataCSV
    });
    this.loadingToggle()
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    this.setState({
        ...this.state,
        dataZ10: []
    });
  };
    uploadData = () => {
      this.loadingToggle()
      const dataToSend = {
            DATAZ10:this.state.dataZ10
      };
      axios.post(`https://35de76956587.ngrok.io/z10/addZ10`, dataToSend, {
          headers: {
              "Access-Control-Allow-Origin": "*"
          }
      })
      .then( async result => {
        if(result.data.status=="01"){
            alert("data Z10 berhasil diupload")
            this.props.history.push({pathname: "/temp"})
            this.props.history.goBack()
        } else{
            alert("gagal mengupload data z10")
        }
      })
      .catch(error => {
          console.log(error);
      });
    }
  render() {
    const columnZ10 = [
      {
        name: "Product_Code",
        selector: "Product_Code",
        sortable: true,
      },
      {
        name: "short_name",
        selector: "short_name",
        sortable: true,
      },
      {
        name: "Season",
        selector: "Season",
        sortable: true,
      },
      {
        name: "Level1_Description",
        selector: "Level1_Description",
        sortable: true,
      },
      {
        name: "Level2_Description",
        selector: "Level2_Description",
        sortable: true,
      },
      {
        name: "Level3_Description",
        selector: "Level3_Description",
        sortable: true,
      },
      {
        name: "Level4_Description",
        selector: "Level4_Description",
        sortable: true,
      },
      {
        name: "size_code",
        selector: "size_code",
        sortable: true,
      },
      {
        name: "color_code",
        selector: "color_code",
        sortable: true,
      },
      {
        name: "SHORT_SKU",
        selector: "SHORT_SKU",
        sortable: true,
      },
      {
        name: "barcode",
        selector: "barcode",
        sortable: true,
      },
      {
        name: "SKU_TYPE_CODE",
        selector: "SKU_TYPE_CODE",
        sortable: true,
      },
      {
        name: "Retail_Price",
        selector: "Retail_Price",
        sortable: true,
      },
      {
        name: "ts_id",
        selector: "ts_id",
        sortable: true,
      }
    ];
    return (
      <div>
        <div
          style={{
            visibility: this.state.prmoverlay == true ? "visible" : "hidden",
          }}
        >
          <div className="overlayMask">
            <ScaleLoader
              height={90}
              width={20}
              radius={10}
              margin={10}
              color={"#ffffff"}
              loading={this.state.prmoverlay == true ? true : false}
            />
          </div>
        </div>
        <Container fluid={true} style={{ padding: 0 }}>
          <div className="row no-gutters row-flex" style={{ padding: 10 }}>
            <div
              className="col-md-12 col-sm-12 col-xs-12"
              style={{ padding: 10 }}
            >
              <div className="card">
                <div className="card-header">
                  <span class="h5">Data Z10</span>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="card-body">
                    <CSVReader
                      onDrop={this.cekData}
                      onError={this.handleOnError}
                      noDrag
                      addRemoveButton
                      removeButtonColor="#659cef"
                      onRemoveFile={this.handleOnRemoveFile}
                    >
                      <span>Drop CSV file here or click to upload.</span>
                    </CSVReader>
                  </div>
                  {this.state.dataZ10.length > 0 && (
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <DataTableExtensions
                            columns={columnZ10}
                            data={this.state.dataZ10}
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
                              paginationRowsPerPageOptions={[5, 10, 50, 100]}
                              fixedHeaderScrollHeight="300px"
                            />
                          </DataTableExtensions>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Button
                            color="success"
                            block={true}
                            onClick={() => this.uploadData()}
                          >
                            Upload data Z10
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    anbyaBoilerplate: state.reducer.anbyaBoilerplate,
  };
};

export default withRouter(connect(mapStateToProps)(z10));
