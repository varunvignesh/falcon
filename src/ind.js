
window.addEventListener('load',
    function () {

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let data = this.responseText;
                let o = JSON.parse(data);
                console.log(o);
                if (o.code == 200) {
                    let fname = o.account.firstname;
                    let lname = o.account.lastname;
                    let email1 = o.account.email;
                    let password = o.account.password;
                    let city1 = o.account.city;
                    let state1 = o.account.state;
                    let country1 = o.account.country;
                    let zip1 = o.account.zipcode;
                    let phnum1 = o.account.phone;
                    let alternateemail1 = o.account.alteremail;

                    document.getElementById("fname").value = fname;
                    document.getElementById("lname").value = lname;
                    document.getElementById("email").value = email1;
                    document.getElementById("password").value = password;
                    document.getElementById("city").value = city1;
                    document.getElementById("state").value = state1;
                    document.getElementById("country").value = country1;
                    document.getElementById("zip").value = zip1;
                    document.getElementById("phnum").value = phnum1;
                    document.getElementById("alternateemail").value = alternateemail1;


                }
            };
        }
        xhttp.open("GET", "http://localhost:8080/api/v1/clone_available", true);
        xhttp.send();


        /* var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = this.responseText;
                data = JSON.parse(data);
            }
        };
        xhttp.open("GET", "http://localhost:8080/api/v1/clone", true);
        xhttp.send(); */

        /* let LS = JSON.parse(localStorage.getItem('data'));
    
        console.log(LS);
        if(LS && LS.clone > -1){
                console.log("in");
                for(let i=0; i<LS.account.length; i++){  
                    console.log("in");
                    if(LS.account[i].id == LS.clone ){
                        console.log("in");
                        let {
                            firstname, lastname, email, password, city, state, country, zip, phnum, alternateemail
                        } = LS.account[i];
    
                        /*let fname = LS.account[i].firstname;
                        let lname = LS.account[i].lastname;
                        let email1 = LS.account[i].email;
                        let password = LS.account[i].password;
                        let city1 = LS.account[i].city;
                        let state1 = LS.account[i].state;
                        let country1 = LS.account[i].country;
                        let zip1 = LS.account[i].zip;
                        let phnum1 = LS.account[i].phnum;
                        let alternateemail1 = LS.account[i].alternateemail;
                        
                        document.getElementById("fname").value = firstname;
                        document.getElementById("lname").value = lastname;
                        document.getElementById("email").value = email;
                        document.getElementById("password").value = password;
                        document.getElementById("city").value = city;
                        document.getElementById("state").value = state;
                        document.getElementById("country").value = country;
                        document.getElementById("zip").value = zip;
                        document.getElementById("phnum").value = phnum;
                        document.getElementById("alternateemail").value = alternateemail; 
                        LS.clone = null;
                        localStorage.setItem("data",JSON.stringify(LS));
                        break;
                    }
                }
        } */

    }, false);

function submitAction() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email1 = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let city1 = document.getElementById("city").value;
    let state1 = document.getElementById("state").value;
    let country1 = document.getElementById("country").value;
    let zip1 = document.getElementById("zip").value;
    let phnum1 = document.getElementById("phnum").value;
    let alternateemail1 = document.getElementById("alternateemail").value;


    //let key = 'account';
    //o[key] = [];

    let data = {
        "firstname": fname,
        "lastname": lname,
        "email": email1,
        "password": password,
        "city": city1,
        "state": state1,
        "country": country1,
        "zip": zip1,
        "phnum": phnum1,
        "alternateemail": alternateemail1
    }

    let o = { account: data };
    //o[key].push(data);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            let data = JSON.parse(this.responseText);
            /* if (data.code == 201) {
                window.location.href = "/gmaps/profile.html";
            }
            else if (data.code == 304) {
                alert(data.internalMessage);
            }
            else {
                
                alert(data.internalMessage);
            } */
            window.location.href = "/gmaps/profile.html";
        }
        else if ( this.status == 304) {
            alert('email already exists');
        }
        else if ( this.status == 500) {
            let data = JSON.parse(this.responseText);
            alert(data.internalMessage);
        }
    };
    xhttp.open("POST", "http://localhost:8080/api/v1/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o));
    // let LS = JSON.parse(localStorage.getItem('data'));
    // console.log(LS)

    /* if(LS){

        let o = LS.account;
        console.log(o);
        let id = o.length;
        
        let data ={
            "firstname" : fname,
            "lastname" : lname,
            "email" : email1,
            "password" : password,
            "city" : city1,
            "state" : state1,
            "country" : country1,
            "zip" : zip1,
            "phnum" : phnum1,
            "alternateemail" : alternateemail1,
            "id": id
        }
        o.push(data);
        localStorage.setItem("data", JSON.stringify(LS));
        window.location.href= "/gmaps/profile.html";
    }
    else{

        o = {};
        let key = 'account';
        o[key] = [];
        let data ={
            "firstname" : fname,
            "lastname" : lname,
            "email" : email1,
            "password" : password,
            "city" : city1,
            "state" : state1,
            "country" : country1,
            "zip" : zip1,
            "phnum" : phnum1,
            "alternateemail" : alternateemail1,
            "id": 0
        }
        o[key].push(data);
        localStorage.setItem("data", JSON.stringify(o));
        window.location.href= "/gmaps/profile.html";    
    } */

}

