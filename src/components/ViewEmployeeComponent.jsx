import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id,
            emp => this.setState({ emp : emp, loading: false}),
            error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        this.setErrorState("Colaborador não encontrado");
                    } else {
                        this.setErrorState(`Erro ao carregar dados: ${error.response}`);
                    }
                } else {
                    this.setErrorState(`Erro na requisição: ${error.message}`);
                }
            });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nome  </label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Sobrenome </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> E-mail: </label>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
