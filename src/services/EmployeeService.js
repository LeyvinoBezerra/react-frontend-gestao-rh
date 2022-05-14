import AuthService from "../api/AuthService";
import axios from 'axios';
import { API_ENDPOINT } from "../constants";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    getEmployees(onFetch, onError){
        axios.get(`${API_ENDPOINT}/employees`, this.buildAuthHeader())
        .then(response => onFetch(response.data))
        .catch(e => onError(e));
    }

    createEmployee(employee, onSave, onError){
        axios.post(`${API_ENDPOINT}/employees`, employee, this.buildAuthHeader())
                .then(() => onSave())
                .catch(e => onError(e));
       // return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId, onLoad, onError){
        axios.get(`${API_ENDPOINT}/employees/${employeeId}`, this.buildAuthHeader())
        .then(response => onLoad(response.data))
        .catch(e => onError(e));
        //return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId, onSave, onError){
        axios.put(`${API_ENDPOINT}/employees/${employeeId}`, employee, this.buildAuthHeader())
        .then(() => onSave())
        .catch(e => onError(e));
        //return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId, onDelete, onError){
        axios.delete(`${API_ENDPOINT}/employees/${employeeId}`, this.buildAuthHeader())
        .then(() => onDelete())
        .catch(e => onError(e));
        //return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    buildAuthHeader() {
        return {
            headers: {
                'Authorization': `Bearer ${AuthService.getJWTToken()}`
            }
        }
    }
}

export default new EmployeeService()