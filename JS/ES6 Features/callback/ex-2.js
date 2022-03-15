let employees = [{ id: 101, name: "Rahul", sal: 45000 },
{ id: 102, name: "Sonia", sal: 55000 }
]
let createEmployee = (emp, callback) => {
    setTimeout(() => {
        employees.push(emp);
        callback()
    }, 1500)
}
let getEmployee = () => {
    setTimeout(() => {
        let rows = ""
        employees.forEach((employee) => {
            rows = rows + `<tr>
                            <td>${employee.id}</td>
                            <td>${employee.name}</td>
                            <td>${employee.sal}</td>
                           </tr>`
        });
        document.getElementById('tbody-data').innerHTML = rows
    }, 1000)
}
createEmployee({ id: 103, name: "Priyanka", sal: 65000 }, getEmployee)