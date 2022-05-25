import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isModalOpen: false,
      user: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:8080/user/auth"
    axios.post(url, data)
      .then(res => {
        if (res.data.logged === true) {
          let name = res.data.data.nama
          let user = res.data.data
          let token = res.data.token
          let id_user = res.data.data.id_user
          let id_outlet = res.data.data.id_outlet
          let role = res.data.data.role
          let url1 = "http://localhost:8000/transaksi/myclass/" + id_user
          localStorage.setItem("name", name)
          localStorage.setItem("id_user", id_user)
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("id_outlet", id_outlet)
          axios.get(url1)
            .then(res => {
              this.setState({
                class: res.data.data
              })
              localStorage.setItem("class", JSON.stringify(this.state.class))
            })
            .catch(error => {
              console.log(error)
            })
          // if(role == "admin"){
            window.location = "/"
          // }
        }
        else {
          window.alert(res.data.message)
        }
      })
  }

  render() {
    return (
      <div className='container col-md-15 col-lg-5 order-md-last' >
        <br></br><br></br><br></br><br></br><br></br>
        <form className='form' onSubmit={(e) => this.handleLogin(e)}>
          <div class="mb-3">
            <label for="exampleInputText1" class="form-label">Username</label>
            <input type="text" className='form-control' value={this.state.username} onChange={this.handleChange} name="username"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className='form-control' value={this.state.password} onChange={this.handleChange} name="password"/>
          </div>
          <input type="submit" className='btn btn-secondary w-100' value="Login"/>
        </form>
      </div>
    )
  }
}