import React from 'react'
import { Button } from 'antd';

export default class MenuCom extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <br />
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
        </div>)
    }
}