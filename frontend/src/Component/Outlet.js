import React from 'react';
import Navbar from './Navbar'
import NavbarKasir from './NavbarKasir';
import NavbarOwner from './NavbarOwner';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Outlet extends React.Component {
  constructor() {
    super();
    this.state = {
      outlet: [],
      isModalOpen: false,
      token: "",
      id_outlet: 0,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      tlp: "",
      search: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } 
    else {
      window.location = "/login"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false,
      isModalPw: false,
    })
  }

  getOutlet = () => {
    let url = 'http://localhost:8080/outlet/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

//   searching = event => {
//     if(event.keyCode === 13){
//     // 13 adalah kode untuk tombol enter
//     let keyword = this.state.keyword.toLowerCase()
//     let tempOutlet = this.state.outlet
//     let result = tempOutlet.filter(item => {
//     return item.tlp.toLowerCase().includes(keyword) ||
//     item.nama.toLowerCase().includes(keyword) ||
//     item.alamat.toLowerCase().includes(keyword)
//     })
//     this.setState({outlet: result})
//     }
// }

// findOutlet = (event) => {
// let url = "http://localhost:8080/outlet/";
// if (event.keyCode === 13) {
// // menampung data keyword pencarian
//     let form = {
//     find: this.state.search
// }
// // mengakses api untuk mengambil data pegawai
// // berdasarkan keyword
// axios.post(url, form)
//     .then(response => {
// // mengisikan data dari respon API ke array pegawai
// this.setState({member: response.data.outlet});
// })
// .catch(error => {
// console.log(error);
// });
// }
// }

  handleEdit = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          isModalOpen: true,
          nama: item.nama,
          alamat: item.alamat,
          jenis_kelamin: item.jenis_kelamin,
          tlp: item.tlp,
          id_outlet: item.id_outlet,
          action: "update"
        })
      })
      .catch(error => {
        console.log(error)
      })

  }



  // handleEditPw = (item) => {
  //     this.setState({
  //         isModalPw: true,
  //         id_user: item.id_user,
  //         password_user: item.password_user
  //     })
  // }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      tlp: "",
      action: "insert"
    })
  }

  // handleSavePw = (e) => {
  //     e.preventDefault()
  //     let data = {
  //       password_user: this.state.password_user
  //     }
  //     if (window.confirm("Are you sure to change password?")) {
  //       let url = "http://localhost:8000/user/update/" + this.state.id_user
  //       axios.put(url, data)
  //         .then(res => {
  //           window.location = '/user'
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     }
  //   }
  handleSave = e => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      tlp: this.state.tlp
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/outlet/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/outlet/" + this.state.id_outlet
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getOutlet()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/outlet/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getOutlet()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getOutlet()
  }



  render() {
    return (
      <div>
        {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
        <div className="container"> <br></br>
            <h4 >
                <span className="display-6">Outlet Data</span>
                </h4><br></br>
          <div className="row">
            {/* <div className="col-6 md-5">
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} class="form-control form-input" placeholder="Find Member"/>
            </div> */}
            <div>
              <button className="btn btn-primary form-control form-input" id="btn-blue" onClick={() => this.handleAdd()}>Add New Outlet</button>
            </div>
          </div>

          <br></br> <br></br>


          <table className="table">
            <thead>
              <tr>
                <th>Outlet ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>No Telp</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.outlet.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_outlet}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.tlp}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}>Edit</button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.Drop(item.id_outlet)}>Hapus</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>



        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Member</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Input address"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="tlp">
                <Form.Label>No Telp</Form.Label>
                <Form.Control type="text" name="tlp" placeholder="Input telp"
                  value={this.state.tlp} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </div>
    );
  }
}

export default Outlet;