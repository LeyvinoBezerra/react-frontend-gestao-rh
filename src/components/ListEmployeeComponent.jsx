import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import AuthService from '../api/AuthService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        //EmployeeService.deleteEmployee(id).then( res => {
          //  this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        //});

        EmployeeService.deleteEmployee(id, 
            () => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
               
            },
            error => this.setErrorState(error));
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
          if (!AuthService.isAuthenticated()) {
            return;
        }
        //EmployeeService.getEmployees().then((res) => {
        //    this.setState({ employees: res.data});
        //});
        this.setState({ loading: true });
        EmployeeService.getEmployees(
            employees => this.setState({ employees: employees, loading: false }),
            error => this.setErrorState(error)
        );
    }

    setErrorState(error) {
        this.setState({ alert: `Erro na requisição: ${error.message}`, loading: false })
    }


    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Lista de Funcionários</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Adicionar Funcionário</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Primeiro Nome</th>
                                    <th> Segundo Nome</th>
                                    <th> E-mail</th>
                                    <th> Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Atualizar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Deletar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">Visualizar </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
