import React from 'react';
import axios from 'axios';
import './App.css';
import imgHome from './cafe_manha.jpg'

export default class App extends React.Component {

  constructor() {
    super()
    this.api = 'https://unidac-api-rest.herokuapp.com/'
  }

  state = {
    nomeColaborador: '',
    cpf: '',
    alimento: '',
    id: '',
    registros: [],
    nomeBotao: 'Cadastrar',
    validaCpf: false,
    validaCampoPreenchido: false
  }

  handleChangeId = event => {
    this.setState({ id: event.target.value })
  }

  handleChangeNome = event => {
    this.setState({ nomeColaborador: event.target.value })
    this.setState({validaCampoPreenchido: false})

  }

  handleChangeCpf = event => {
    this.setState({ cpf: event.target.value })
    this.setState({ validaCpf: false })
    this.setState({validaCampoPreenchido: false})

  }

  handleChangeAlimento = event => {
    this.setState({ alimento: event.target.value })
    this.setState({ validaCpf: false })
    this.setState({validaCampoPreenchido: false})
  }

  handleSubmit = event => {
    event.preventDefault()

    const cadastro = {
      nomeColaborador: this.state.nomeColaborador,
      cpf: this.state.cpf,
      alimento: this.state.alimento
    }

    if (this.state.nomeColaborador === '' || this.state.cpf === '' || this.state.alimento === '') {
      this.setState({validaCampoPreenchido: true})
    } else {
      if (this.state.nomeBotao === 'Cadastrar') {
        axios.post('https://api-unidac.herokuapp.com/api/v1/colaborador/', cadastro)
          .then(res => {
            console.log(res.data);
            console.log(res)
            console.log(res.status)
          })
          .catch(res => {
            console.log(res.response)
            console.log(res.request)
            if (res.response.status == 400)
              this.setState({ validaCpf: true })
          })
      }

      else if (this.state.nomeBotao === 'Editar') {
        axios.put(`https://api-unidac.herokuapp.com/api/v1/colaborador/${this.state.id}`, cadastro)
          .then(res => {
            console.log(res.data);
            console.log(res)
          })

        this.setState({ nomeBotao: 'Cadastrar' })
      }

      else if (this.state.nomeBotao === 'Deletar') {
        axios.delete(`https://api-unidac.herokuapp.com/api/v1/colaborador/${this.state.id}`)
          .then(res => {
            console.log(res.data);
            console.log(res)
          })

        this.setState({ nomeBotao: 'Cadastrar' })
      }
    }

  }

  handleGet = event => {
    axios.get('https://api-unidac.herokuapp.com/api/v1/colaborador/')
      .then(res => {
        console.log(res.data);
        console.log(res)
        this.setState({ registros: res.data })
      })

    console.log(this.state.registros)
  }

  refeicoesCadastradas() {

    return (
      this.state.registros.map(item => <tr>
        <td>{item.id}</td>
        <td>{item.nomeColaborador}</td>
        <td>{item.cpf}</td>
        <td>{item.alimento}</td>
      </tr>
      )
    )
  }

  modoEdicao() {
    this.setState({ nomeBotao: 'Editar' })
  }

  modoDeletar() {
    this.setState({ nomeBotao: 'Deletar' })
  }

  render() {

    return (
      <div className="App" >
        <section className="secHome" id="secHome">
          <header>
            <ul>
              <li><a href="#secHome">Início</a></li>
              <li><a href="#secForm">Cadastro</a></li>
              <li><a href="#secGet">Ver Cadastros</a></li>
            </ul>
          </header>
          <figure>
            <div></div>
            <img src={imgHome} alt=""></img>
          </figure>
          <div>
            <h1>Bem vindo!</h1>
            <p>Esta é a central de cadastro de café da manhã do grupo WL</p>
          </div>
        </section>
        <section className="secForm" id="secForm">
          <form className="formPost" onSubmit={this.handleSubmit}>
            <h1>Cadastre seu café da manhã</h1>
            {this.state.validaCpf ? <span className="validacao">CPF ou Refeição já cadastrados.</span> : ''}
            {this.state.validaCampoPreenchido ? <span className="validacao">Preencha todas as informações.</span> : ''}

            <label>Nome:</label>
            <input type="text" onChange={this.handleChangeNome}></input>

            <label>CPF:</label>
            <input type="text" onChange={this.handleChangeCpf}></input>

            <label>Refeição:</label>
            <input type="text" onChange={this.handleChangeAlimento}></input>

            {this.state.nomeBotao === "Cadastrar" ? '' : <label>Id:</label>}
            {this.state.nomeBotao === "Cadastrar" ? '' : <input type="text" onChange={this.handleChangeId}></input>}


            <button type="submit">{this.state.nomeBotao}</button>
          </form>
        </section>
        <section className="secGet" id="secGet">
          <div className="divGet">
            <h1>Cadastros registrados</h1>
            <table>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Alimento</th>
              </tr>
              {this.refeicoesCadastradas()}
            </table>
            <div className="grpBotoes">
              <button className="btnAtualizar" onClick={this.handleGet}>Atualizar</button>
              <a href="#secForm"><button className="btnEditar" onClick={() => this.modoEdicao()}>Editar</button></a>
              <a href="#secForm"><button className="btnDeletar" onClick={() => this.modoDeletar()}>Deletar</button></a>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

