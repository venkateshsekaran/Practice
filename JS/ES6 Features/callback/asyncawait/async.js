let employees = [{ id: 101, name: "Rahul", sal: 45000 },
{ id: 102, name: "Sonia", sal: 55000 }
]
let createEmployee = (emp) => {
    return new Promise ((resolve,reject) => {
        let flag = true;
    setTimeout(() => {
        employees.push(emp);
        flag ? resolve("success") : reject("failed")
    }, 1500)})
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
    }, 2000)
}
let run = async () => {
await createEmployee({ id: 103, name: "Priyanka", sal: 65000 })
getEmployee();
}
run();
