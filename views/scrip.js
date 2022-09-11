function signup(e) {

    event.preventDefault();

    var prefix = document.getElementById('prefix').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var company = document.getElementById('company').value;
    var position = document.getElementById('position').value;
    var department = document.getElementById('department').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var data = JSON.stringify({
        prefix: prefix,
        fname: fname,
        lname: lname,
        company: company,
        position: position,
        department: department,
        phone: phone,
        email: email,
    });

    // Put the object into storage
    localStorage.setItem('register_user', JSON.stringify(data));
    location.href ="/visitfactory"

}


