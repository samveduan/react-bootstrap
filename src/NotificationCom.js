import React from 'react'
import { Button, notification } from 'antd';

const openNotification = () => {
    notification.open({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export default class MenuCom extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            <Button type="primary" onClick={openNotification}>
                Open the notification box
            </Button>
        </div>)
    }
}