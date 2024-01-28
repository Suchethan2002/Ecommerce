import React, {Component} from "react";

export default class UserDetails extends Component{
    ComponentDidMount(){
        fetch("http://localhost:5000/userData",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            token:window.localStorage.getItem("token"),
        }),
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            console.log(data,"userData");
        });
    }
}