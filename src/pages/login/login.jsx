import React from 'react'
import { Button, notification } from 'antd';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-table/dist/bootstrap-table.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js'
import 'ztree/css/metroStyle/metroStyle.css'
import 'bootstrapvalidator/dist/css/bootstrapValidator.min.css'
import 'bootstrapvalidator/dist/js/bootstrapValidator.min.js'
import $http from '../../ajax/http.js'
import './login.less'

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description
    });
};

export default class Login extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div id="login-container">
            <div id="login">
                <form id="login-form" className="form-horizontal">
                    <div id="login-name">
                        <div id="login-logo">KSS008</div>
                    </div>

                    <div className="form-group login-input-container" id="login-user-name-container">
                        <span className="input-group-addon login-icon" style={{ color: '#555555' }}>
                            <i className="glyphicon glyphicon-user" aria-hidden="true" style={{ paddingTop: '2px' }}></i>
                        </span>
                        <div className="col-lg-12 col-md-12 col-sm-12" style={{ height: '34px' }}>
                            <input type="text" style={{width: 0}}/>
                            <input
                                type="text"
                                className="form-control login-input"
                                id="login-user-name"
                                name="loginUserName"
                                placeholder="用户名"
                            />
                            <input type="text" style={{width: 0}}/>
                            <div className="login-input-below bg-white" id="login-user-name-tips"></div>
                        </div>
                    </div>

                    <div className="form-group login-input-container" id="login-password-container">
                        <span className="input-group-addon login-icon" style={{ color: '#555555' }}>
                            <i className="glyphicon glyphicon-lock" aria-hidden="true" style={{ paddingTop: '2px' }}></i>
                        </span>

                        <div className="col-lg-12 col-md-12 col-sm-12" style={{ height: '34px' }}>
                            <input type="password" style={{width: 0}}/>
                            <input
                                type="password"
                                className="form-control login-input"
                                id="login-password"
                                name="loginPassword"
                                placeholder="密码"
                            />
                            <div className="login-input-below bg-white" id="login-password-tips"></div>
                        </div>
                    </div>

                    <button
                        className="btn btn-success"
                        id="login-submit"
                        type="submit"
                    >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>

                    <div id="copyright"></div>
                </form>
            </div>
        </div>)
    }

    componentDidMount() {
        let _this = this;

        $("#login-form")
        .bootstrapValidator({
            message: "This value is not valid",
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                loginUserName: {
                    message: "用户名无效",
                    validators: {
                        notEmpty: {
                            message: "用户名不能为空"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                            message:
                                "用户名为1至32位汉字、字母、数字、下划线或中英文括号，为了能在路径中尽可能多的显示文件夹，请尽量减小名称长度！"
                        }
                    }
                },
                loginPassword: {
                    message: "密码无效",
                    validators: {
                        notEmpty: {
                            message: "密码不能为空"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                            message:
                                "密码为1至32位汉字、字母、数字、下划线或中英文括号，为了能在路径中尽可能多的显示文件夹，请尽量减小名称长度！"
                        }
                    }
                }
            }
        })
        .on("success.form.bv", function (e) {
            e.preventDefault();

            let param = new URLSearchParams()
            param.append('username', $("#login-user-name").val())
            param.append('password', $("#login-password").val())

            $http({
                method: "POST",
                url: "/article/check_login_status/",
                data: param
            })
                .then(res => {
                    if (res.ret) {
                        localStorage['token'] = 20;
                        //this.props.history.push("/first/admin")
                        $("#login-form")[0].reset();
                        $("#login-form").data('bootstrapValidator').resetForm();
                        _this.props.history.replace("/");
                    } else {
                        notification['error']({
                            message: '错误提示',
                            description: '用户名或秘密错误，登录失败！'
                        });
                    }
                })
                .catch(err => {
                    notification['error']({
                        message: '错误提示',
                        description: '网络错误，登录失败！'
                    });
                });
        });
    }
}
