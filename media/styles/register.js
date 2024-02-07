const firebaseConfig = {
    apiKey: "AIzaSyBY_lWg3sBzk-4xL-R_ODsUT6W6TQrHFys",
    authDomain: "learning-management-syst-afc94.firebaseapp.com",
    databaseURL: "https://learning-management-syst-afc94-default-rtdb.firebaseio.com",
    projectId: "learning-management-syst-afc94",
    storageBucket: "learning-management-syst-afc94.appspot.com",
    messagingSenderId: "638048520902",
    appId: "1:638048520902:web:0d0d191aade0edc644e5c7",
    measurementId: "G-7TYWNT4BV9"
  };

  firebase.initializeApp(firebaseConfig);


function handler(event){
    event.preventDefault();
    var name=document.getElementById('user').value;
    var password=document.getElementById('pass').value;
    var email=document.getElementById('email').value;
    var colledge=document.getElementById('colledge').value;
    var phno=document.getElementById('mobile').value;

     
    

    var nameErr=passErr=emailErr=colledgeErr=mobileErr=true;
    if(name==null || name == undefined || name === ""){
        document.getElementById('nameErr').innerText = "Name Cannot be Empty";
    }else
    {
        let regexp=/^[A-Za-z\s]+$/;
        if(regexp.test(name)===false){
            document.getElementById('nameErr').innerText = "Pls Enter Your Valid Name";
            document.getElementById('nameErr').style.color="red";


        }else{
            document.getElementById('nameErr').innerText="Perfect";
        
            document.getElementById('nameErr').style.color="Green";
            
            userErr=false;
        }
    }

    if(password==null||password==undefined||password=== ""){
        document.getElementById('passErr').innerText=" Password Cannot Be Empty";
    }else{
        let regexp=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(regexp.test(password)===false){
        document.getElementById('passErr').innerText = " Pls Enter valid Password";
            
        }else{
        document.getElementById('passErr').innerText = "StrongPassword";
        document.getElementById('passErr').style.color="Green";

        




            passErr=false;
        }
    }

    if(email==null||email==undefined||email===""){
        document.getElementById("emailErr").innerText="Please enter your email it cannot be empty";
    }else{
        let regex=/^[a-zA-Z0-9\S]+@[a-zA-Z0-9\S]+\.[a-zA-Z\S]{2,6}$/;
        if(regex.test(email)===false){
            document.getElementById("emailErr").innerText="Inavlid Email id";
        }else{
            document.getElementById("emailErr").innerText="Email Exists";
            document.getElementById('emailErr').style.color="Green";

            emailErr=false;
        }
    }

    if(colledge==null || colledge == undefined || colledge ===""){
        document.getElementById('colledgeErr').innerText = "colledge Name Cannot be Empty";
    }else
    {
        let regexp=/^[A-Za-z\s]+$/;
        if(regexp.test(colledge)===false){
            document.getElementById('colledgeErr').innerText = "Pls Enter Your Valid  Colledge Name";

        }else{
            document.getElementById("colledgeErr").innerText="colledge Exists";
            document.getElementById('colledgeErr').style.color="Green";

            colledgeErr=false;
        }
    }


    if(phno==null || phno == undefined || phno === ""){
        document.getElementById('mobileErr').innerText = "Number Cannot be Empty";
    }else
    {
        let regexp=/^[0|+91|91]?[6-9]\d{9}$/;
        if(regexp.test(phno)===false){
            document.getElementById('mobileErr').innerText = "Pls Enter Your Valid  Number";

        }else{
            document.getElementById("mobileErr").innerText="Number Exists";
            document.getElementById('mobileErr').style.color="Green";

            phnoErr=false;
        }
    }


    





}

function resethandler(){
    window.confirm(`Are You Sure TO Reset`)
    window.location.reload();
}




  const auth=firebase.auth();
  const database=firebase.database();

  //set up our regestration function
  function register(){
    //get all our input field
    var email=document.getElementById('email').value;
    var password=document.getElementById('pass').value;
    var fullname=document.getElementById('user').value;
  

  auth.createUserWithEmailAndPassword(email,password)
  .then(function(){
    var user=auth.currentUser
    //add the user to firebase Database
    // alert(user.uid)
    var database_ref=database.ref();

    //create User  Data
    var user_data={
        email:email,
        full_name:fullname,
        Last_login:Date.now(),
        status:"Offline",
        uid:user.uid

    }

    database_ref.child('user/'+ user.uid).set(user_data);

    alert("Account Created!!");
    window.location.href = "http://127.0.0.1:5500/learning-managment-system/login.html"

  })

  .catch(function(err){
    var error_code=err.code
    var error_message=err.message

    alert(error_message)
  })
}

function login(){
    //get all our input field
    var email=document.getElementById('email').value;
    var password=document.getElementById('pass').value;
  

  auth.signInWithEmailAndPassword(email,password)
  .then(function(){
    var user=auth.currentUser
    //add the user to firebase Database
    document.getElementById('conform').innerText="Login succesfull"
    
    window.location.href= "http://127.0.0.1:5500/learning-managment-system/Dashboard.html"
    // var database_ref=database.ref();

    // //create User  Data
    // var user_data={
    //     email:email,
    //     full_name:full_name,
    //     Last_login:Date.now(),
    //     status:"Offline"
    // }

    //push to firebase Database
    // database_ref.child('user/'+user.uid).set(user_data);
    //Done message will Be poped up

    // alert("Account Created!!");
  })

  .catch(function(err){
    var error_code=err.code
    var error_message=err.message

    alert("Invalid email and password")
  })
}

