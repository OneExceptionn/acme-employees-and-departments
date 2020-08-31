import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Employees = ( {employees, deptId, remove, unassign} ) => {
    return (
        <ul>
            {
                employees.map(employee => {
                    if (employee.department === parseInt(deptId)) {
                        return (
                            <li id='employee' key={employee.id}>
                                {employee.name}
                                <button onClick={() => remove(employee.id)}>X</button>
                                <button onClick={() => unassign(employee.id)}>Remove From Department</button>
                            </li>
                        )
                    }
                })
            }
        </ul>
    )
}

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            employees: []
        }
        this.remove = this.remove.bind(this)
        this.unassign = this.unassign.bind(this)
    }

    async componentDidMount () {
        try {
            const employees = await axios.get('/api/employees')
            this.setState( {
                employees: employees.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    async remove(id) {
        try {
            await axios.delete(`/api/employees/${id}`)
            const employees = this.state.employees.filter(employee => employee.id !== id)
            this.setState({
                employees: employees
            })
        } catch (err) {
            console.log(err)
        }
    }

    async unassign(id) {
        try {
            await axios.put(`/api/employees/${id}`, { department: 0})
            const employees = this.state.employees
            employees.forEach( employee => {
                if (employee.id === id) {
                    employee.department = 0
                }
            })
            this.setState({
                employees: employees
            })
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        const counter = (employees, id) => {
            let count = 0;
            employees.forEach(employee => {
                if (employee.department === parseInt(id)) {
                    count++
                }
            })
            return count
        }
        return (
            <div>
                <div id='total'>({this.state.employees.length}) Total Employees</div>
                <br></br>
                <br></br>
                <div id='departments'>
                    <div id='0'>
                        Employees Without Departments({counter(this.state.employees, 0)})
                        <Employees employees= {this.state.employees} deptId='0' remove={this.remove} unassign={this.unassign} />
                    </div>
                    <div id='1'>
                        COMPUTERS({counter(this.state.employees, 1)})
                        <Employees employees= {this.state.employees} deptId='1' remove={this.remove} unassign={this.unassign}/>    
                    </div>
                    <div id='2'>
                        SHOES({counter(this.state.employees, 2)})
                        <Employees employees= {this.state.employees} deptId='2' remove={this.remove} unassign={this.unassign} />
                    </div>
                    <div id='3'>
                        GAMES({counter(this.state.employees, 3)})
                        <Employees employees= {this.state.employees} deptId='3' remove={this.remove} unassign={this.unassign} />
                    </div>
                    <div id='4'>
                        HOME ({counter(this.state.employees, 4)})
                        <Employees employees = {this.state.employees} deptId='4' remove={this.remove} unassign={this.unassign} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('main')
)