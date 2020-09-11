import React from 'react'
import { Row, Col } from 'antd';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.css'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class One extends React.Component {
    constructor() {
        super();
    }

    state = {
        visible: false
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (<div>
            <Row>
                <Col span={24}>
                    <table className="table table-bordered" style={{ marginBottom: 0 }}>
                        <tbody>
                            <tr>
                                <td
                                    width="340"
                                    align="left"
                                    valign="top"
                                    style={{ padding: 0, borderRight: "1px solid #e4eaec" }}
                                >
                                    <div style={{ height: '48px', padding: '10px' }}>
                                        <Button type="primary" icon={<PlusOutlined />} size="small" onClick={() => this.showModal()}>
                                            创建
                                        </Button>

                                        <Button type="primary" icon={<EditFilled />} size="small" style={{ marginLeft: '10px' }}>
                                            编辑
                                        </Button>

                                        <Button type="primary" icon={<DeleteFilled />} size="small" style={{ marginLeft: '10px' }}>
                                            删除
                                        </Button>
                                    </div>

                                    <ul
                                        id="dept-tree"
                                        className="ztree"
                                        style={{ overflowY: 'scroll', borderTop: '1px solid #e4eaec' }}
                                        v-loading="loading"
                                    ></ul>
                                </td>

                                <td
                                    align="left"
                                    valign="top"
                                    style={{ padding: 0, verticalAlign: 'top' }}
                                    id="user-container"
                                >
                                    <div style={{ padding: '10px' }}>
                                        <Button type="primary" icon={<PlusOutlined />} size="small">
                                            创建
                                        </Button>

                                        <Button type="primary" icon={<EditFilled />} size="small" style={{ marginLeft: '10px' }}>
                                            编辑
                                        </Button>

                                        <Button type="primary" icon={<DeleteFilled />} size="small" style={{ marginLeft: '10px' }}>
                                            删除
                                        </Button>
                                    </div>

                                    <Form
                                        {...layout}
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* 创建用户组 begin */}
                    <Modal
                        title="创建用户组"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    {/* 创建用户组 end */}
                </Col>
            </Row>
        </div>)
    }
}