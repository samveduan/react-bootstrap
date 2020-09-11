import React from 'react'
import { Button } from 'antd';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    redirectHandle = () => {
        console.log("aaa");
        this.props.history.push("/home");
    }

    render() {
        return (<Button type="primary" onClick={()=>this.redirectHandle()}>Primary Button</Button>)
    }
}