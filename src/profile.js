/* window.addEventListener('load', 
  function() { 
      let d = JSON.parse(localStorage.getItem('data'));
      let node = document.getElementById("details");
      let o = d.account;
      console.log(d);

      for(let i=0; i<o.length; i++){  

        let view = {
            "people" : o
            /* firstname : o[i].firstname,
            lastname : o[i].lastname,
            email : o[i].email,
            password : o[i].password,
            city : o[i].city,
            state : o[i].state,
            country : o[i].country,
            zipcode : o[i].zip,
            phone : o[i].phnum,
            Alternate_email : o[i].alternateemail, 
          }; 

          let output = Mustache.render(
          /* * {{firstname}}
          * {{lastname}}
          * {{email}}
          * {{password}}
          * {{city}}
          * {{state}}
          * {{country}}
          * {{zipcode}}
          * {{phone}}
          * {{Alternate_email}} 
         `{{#people}}
         * {{.}}
         {{/people}}
         `
          
          , view);
          //node.innerHTML = output;
        /* let elementnode = document.createElement('div');
            elementnode.setAttribute("class","mt-5")
            elementnode.innerHTML = `<strong>First name : </strong> ${o[i].firstname} <br>
            <strong>Last name : </strong> ${o[i].lastname} <br>
            <strong>Email Address : </strong> ${o[i].email} <br>
            <strong>Password : </strong> ${o[i].password} <br>
            <strong>city : </strong> ${o[i].city} <br>
            <strong>State : </strong> ${o[i].state} <br>
            <strong>Country : </strong> ${o[i].country} <br>
            <strong>Zipcode : </strong> ${o[i].zip} <br>
            <strong>Phone number : </strong> ${o[i].phnum} <br>
            <strong>Alternate email : </strong> ${o[i].alternateemail} <br>`  
            node.appendChild(elementnode);

            let button = document.createElement('button');
            button.setAttribute("class","btn btn-success mt-2 mb-5");
            button.setAttribute("onClick",`edit(${o[i].id})`);
            button.innerHTML = "Clone";
            node.appendChild(button);

            let button1 = document.createElement('button');
            button1.setAttribute("class","btn btn-danger mt-2 ml-2 mb-5");
            button1.setAttribute("onClick",`destroy(${o[i].id})`);
            button1.innerHTML = "Delete";
            node.appendChild(button1);

            let button2 = document.createElement('button');
            button2.setAttribute("class","btn btn-primary mt-2 ml-2 mb-5");
            button2.setAttribute("onClick","add()");
            button2.innerHTML = "Add new person";
            node.appendChild(button2); 
        }
        /*
        document.getElementById("details").innerHTML = `<strong>First name : </strong> ${data.firstname} <br>
        <strong>Last name : </strong> ${data.lastname} <br>
        <strong>Email Address : </strong> ${data.email} <br>
        <strong>Password : </strong> ${data.password} <br>
        <strong>city : </strong> ${data.city} <br>
        <strong>State : </strong> ${data.state} <br>
        <strong>Country : </strong> ${data.country} <br>
        <strong>Zipcode : </strong> ${data.zip} <br>
        <strong>Phone number : </strong> ${data.phnum} <br>
        <strong>Alternate email : </strong> ${data.alternateemail} <br>`

    }, false);
 */

function destroy(id1) {

    let o = {
        id: id1
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 204) {
            location.reload();
            /* if (data.code == 404) {
                alert(data.internalMessage);
            }
            else if (data.code == 204) {
                location.reload();
            } else {
                alert(data.userMessage);
            } */
        }
        else if (this.readyState == 4 && this.status == 404) {
            alert(data.internalMessage);
        }
        else if (this.readyState == 4 && this.status == 500) {
            alert(data.error[0].userMessage);
        };

    }
    xhttp.open("DELETE", "http://localhost:8080/api/v1/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o));
};

function add() {
    window.location.href = "http://localhost/gmaps/ind.html";
};


function edit(id1) {
    let o = {
        id: id1
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            let data = JSON.parse(this.responseText);
            window.location.href = "http://localhost/gmaps/ind.html";
            /* if (data.code == 404) {
                alert(data.internalMessage);
            }
            else if (data.code == 201) {
                window.location.href = "http://localhost/gmaps/ind.html";
            } else {
                alert(data.userMessage);
                console.log(data.internalMessage);
            } */
        }
        else if (this.readyState == 4 && this.status == 404){
            let data = this.responseText;
            alert(data.internalMessage);
        }
        else if (this.readyState == 4 && this.status == 500){
            let data = this.responseText;
            alert(data.errors[0].userMessage);
        };
    }
    xhttp.open("PUT", "http://localhost:8080/api/v1/clone", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o));
}