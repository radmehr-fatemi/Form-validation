const inputUser = document.querySelector(".user-input");
const inputPassOnce = document.querySelector(".pass-input-once");
const inputPassTwice = document.querySelector(".pass-input-twice");
const msgUser = document.querySelector(".username-msg");
const msgPass = document.querySelector(".password-msg");
const msgStatus = document.querySelector(".signin-status");
const signinButton = document.querySelector(".signin-button");

signinButton.addEventListener("click" ,signin);

function signin(event) {
    event.preventDefault();
    const userValue = inputUser.value;
    const passValueOnce = inputPassOnce.value;
    const passValueTwice = inputPassTwice.value;
    let ifSend = true;

    msgUser.innerHTML = "";
    const userRegex = /^\w+@[a-zA-Z]{3,6}\.[a-zA-Z]{2,3}/g;
    if (userValue.length === 0 || userRegex.test(userValue) === false) {
        msgUser.innerHTML = "Pleas enter a valid emai";
        ifSend = false;
    }

    msgPass.innerHTML = "";
    if (passValueOnce.length === 0 || passValueOnce.length < 4) {
        msgPass.innerHTML = "Your password is too short"
        ifSend = false;
    } else if (passValueOnce !== passValueTwice) {
        msgPass.innerHTML = "The passwords do not match"
        ifSend = false;
    }

    if (ifSend) {
        const body = JSON.stringify({
            userName : userValue,
            password : passValueOnce
        })

        const headers = {
            "Content-Type" : "Application/json"
        }

        const url = "https://jsonplaceholder.typicode.com/users";

        fetch(url ,{
            method : "POST",
            body : body,
            headers : headers
        })
        // .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.ok) {
                msgStatus.innerHTML = "Youre signin is seccessfully"
            }
        })
    }
}
