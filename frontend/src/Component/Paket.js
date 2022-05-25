import React from 'react';
import Navbar from './Navbar'
import NavbarKasir from './NavbarKasir';
import NavbarOwner from './NavbarOwner';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      paket: [],
      isModalOpen: false,
      token: "",
      id_paket: 0,
      id_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
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

  getPaket = () => {
    let url = 'http://localhost:8080/paket/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          paket: res.data.paket
        })
        console.log(this.state.paket)
      })
      .catch(error => {
        console.log(error)
      })
  }

//   searching = event => {
//     if(event.keyCode === 13){
//     // 13 adalah kode untuk tombol enter
//     let keyword = this.state.keyword.toLowerCase()
//     let tempMember = this.state.member
//     let result = tempMember.filter(item => {
//     return item.tlp.toLowerCase().includes(keyword) ||
//     item.nama.toLowerCase().includes(keyword) ||
//     item.alamat.toLowerCase().includes(keyword)
//     })
//     this.setState({member: result})
//     }
// }

// findMember = (event) => {
// let url = "http://localhost:8080/member/";
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
// this.setState({member: response.data.member});
// })
// .catch(error => {
// console.log(error);
// });
// }
// }

  handleEdit = (item) => {
    let url = "http://localhost:8080/paket/" + item.id_paket
    axios.get(url)
      .then(res => {
        this.setState({
          isModalOpen: true,
          id_paket: item.id_paket,
          id_outlet: item.id_outlet,
          jenis: item.jenis,
          nama_paket: item.nama_paket,
          harga: item.harga,
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
      id_paket: "",
      id_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
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
      id_paket: this.state.id_paket,
      id_outlet: this.state.id_outlet,
      jenis: this.state.jenis,
      nama_paket: this.state.nama_paket,
      harga: this.state.harga
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/paket/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getPaket()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/paket/" + this.state.id_paket
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getPaket()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/paket/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getPaket()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  handleChoose = (selectedItem) =>{
    if(localStorage.getItem("id_member") !== null){
      let tempCart = []

      if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
      }

       // cek data yang dipilih user ke keranjang belanja
       let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
       if (existItem) {
           // jika item yang dipilih ada pada keranjang belanja
           window.alert(`You have choose ${selectedItem.nama_paket} package`)
       }
       else {
           // user diminta memasukkan jumlah item yang dibeli
           let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
           if (promptJumlah !== null && promptJumlah !== "") {
               // jika user memasukkan jumlah item yang dibeli
               // menambahkan properti "jumlahBeli" pada item yang dipilih
               selectedItem.qty = promptJumlah
               // masukkan item yang dipilih ke dalam cart
               tempCart.push(selectedItem)
               // simpan array tempCart ke localStorage
               localStorage.setItem("cart", JSON.stringify(tempCart))
           }
       }



    }else{
      window.alert("Choose Member First!!")
      window.location = '/choosemember'
    }
  }

  componentDidMount() {
    this.getPaket()
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
                <span className="display-6">Paket Data</span>
                </h4><br></br>
          <div className="row">
            {/* <div className="col-6 md-5">
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findPaket} class="form-control form-input" placeholder="Find Paket"/>
            </div> */}
            <div>
              <button className="btn btn-primary form-control form-input" id="btn-blue" onClick={() => this.handleAdd()}>Add New Paket</button>
            </div>
          </div>

          <br></br> <br></br>


          <table className="table">
            <thead>
              <tr>
                <th>id_paket</th>
                <th>id_outlet</th>
                <th>jenis</th>
                <th>nama_paket</th>
                <th>harga</th>
                <th>aksi</th>

              </tr>
            </thead>
            <tbody>
              {this.state.paket.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_paket}</td>
                    <td>{item.id_outlet}</td>
                    <td>{item.jenis}</td>
                    <td>{item.nama_paket}</td>
                    <td>{item.harga}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}>Edit</button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.Drop(item.id_paket)}>Delete</button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.handleChoose(item)}>Choose</button>
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
            <Modal.Title>ID_Paket</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="id_outlet">
                <Form.Label>ID_Outlet</Form.Label>
                <Form.Control type="text" name="id_outlet" placeholder="input id_outlet"
                  value={this.state.id_outlet} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="jenis">
                <Form.Label>Jenis</Form.Label>
                <Form.Control type="text" name="jenis" placeholder="Input jenis"
                  value={this.state.jenis} onChange={this.handleChange} />

              </Form.Group>
              <Form.Group className="mb-2" controlId="nama_paket">
                <Form.Label>Nama_Paket</Form.Label>
                <Form.Control type="text" name="nama_paket" placeholder="Input nama_paket"
                  value={this.state.nama_paket} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="harga">
                <Form.Label>Harga</Form.Label>
                <Form.Control type="text" name="harga" placeholder="harga"
                  value={this.state.harga} onChange={this.handleChange} />
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

export default Paket;