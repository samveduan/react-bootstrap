import React from 'react'
import { Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import $http from './ajax/http.js'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js'
import 'bootstrapvalidator/dist/css/bootstrapValidator.min.css'
import 'bootstrapvalidator/dist/js/bootstrapValidator.min.js'
import 'ztree/css/metroStyle/metroStyle.css'
import 'ztree/js/jquery.ztree.core.js'
import 'ztree/js/jquery.ztree.exedit.js'
import 'ztree/js/jquery.ztree.excheck.js'
import 'ztree/js/jquery.ztree.exhide.js'

export default class Bs extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            nodesArrForTable: null
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModal = e => {
        $("#add-dept-modal").modal({
            show: true,
            backdrop: "static"
        });
    };

    addData = () => {
        let nodesArrForTable = [
            {
                id: "id",
                title: "标题",
                field: "content",
                create_time: "添加时间"
            }
        ];

        this.state.$adminTable.bootstrapTable('prepend', nodesArrForTable);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Button type="primary" icon={<SearchOutlined />} onClick={() => this.showModal()}>
                            Search
                        </Button>

                        <Button type="primary" icon={<SearchOutlined />} onClick={this.addData}>
                            Add
                        </Button>
                    </Col>
                </Row>
                <table id="bootstrap-table"></table>
                <div id="tree" className="ztree" style={{ height: '300px' }}></div>

                {/*Modal begin*/}
                <div
                    className="modal fade"
                    id="add-dept-modal"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                >
                    <div className="modal-dialog modal-create">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                >×</button>
                                <h4 className="modal-title">增加用户组</h4>
                            </div>
                            <form id="add-dept-modal-form" method="post" className="form-horizontal">
                                <div className="modal-body">

                                    <div className="form-group">
                                        <label
                                            className="col-lg-4 col-md-4 col-sm-4 control-label font-normal"
                                            style={{ textAlign: 'right' }}
                                        >组名：</label>
                                        <div className="col-lg-5 col-md-5 col-sm-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="add-dept-modal-name"
                                                name="addDeptModalName"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-success" type="submit">确 定</button>
                                    <button className="btn btn-default" type="button" data-dismiss="modal">取 消</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Modal end*/}
            </div>
        )
    }

    componentDidMount() {
        let _this = this;
        $("#add-dept-modal-form")
        .bootstrapValidator({
            message: "This value is not valid",
            feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            excluded: [":disabled"],
            fields: {
                addDeptModalName: {
                    message: "名称无效",
                    validators: {
                        notEmpty: {
                            message: "名称不能为空"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                            message: "名称为1至32位汉字、字母、数字、下划线或中英文括号"
                        }
                    }
                }
            }
        })
        .on("success.form.bv", function (e) {
            e.preventDefault();

        });
        
        let orgTreeSetting = {
            view: {
                showLine: true,
                showIcon: true,
                selectedMulti: true
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId"
                }
                /*key: {
                           name: "alias",
                               title: "name"
                      } */
            },
            callback: {
                onClick: this.onClick
            }
        }

        let znodes = [
            { id: 1, pId: 0, name: "随意勾选 1", open: true },
            { id: 11, pId: 1, name: "随意勾选 1-1" },
            { id: 12, pId: 1, name: "随意勾选  1-2", open: true },
            { id: 121, pId: 12, name: "随意勾选 1-2-1", checked: true },
            { id: 122, pId: 12, name: "随意勾选 1-2-2" },
            { id: 123, pId: 12, name: "随意勾选 1-2-3" },
            { id: 13, pId: 1, name: "随意勾选 1-3" },
            { id: 2, pId: 0, name: "随意勾选 2", open: true },
            { id: 21, pId: 2, name: "随意勾选 2-1" },
            { id: 22, pId: 2, name: "随意勾选 2-2", open: true },
            { id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true },
            { id: 222, pId: 22, name: "随意勾选 2-2-2" },
            { id: 223, pId: 22, name: "随意勾选 2-2-3" },
            { id: 23, pId: 2, name: "随意勾选 2-3", checked: true }
        ]

        $.fn.zTree.init($("#tree"), orgTreeSetting, znodes);

        let $adminTable = $("#bootstrap-table")
            .bootstrapTable("destroy")
            .bootstrapTable({
                url: "",
                method: "GET",
                uniqueId: "id", // 绑定ID，不显示
                striped: false, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                sortable: true, //是否启用排序
                sortOrder: "asc", //排序方式
                sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
                undefinedText: "--",
                //singleSelect: true,                  // 单选checkbox，默认为复选
                showRefresh: false, // 显示刷新按钮
                showColumns: false, // 选择显示的列
                toolbar: "#item_info_toolbar", // 搜索框位置
                search: false, // 搜索开启,
                strictSearch: true,
                clickToSelect: true, // 点击选中行
                pagination: true, //是否显示分页
                pageNumber: 1, //初始化加载第一页，默认第一页,并记录
                pageSize: 5, //每页显示的数量
                pageList: [5, 10, 20, 50, 100], //设置每页显示的数量
                paginationPreText: "上一页",
                paginationNextText: "下一页",
                paginationLoop: false,
                //showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
                //cardView: false,                    //是否显示详细视图
                //detailView: false,                  //是否显示父子表
                //showPaginationSwitch: true,
                //得到查询的参数
                queryParams: function (params) {
                    //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    var temp = {
                        rows: params.limit, //页面大小
                        page: params.offset / params.limit + 1, //页码
                        sort: params.sort, //排序列名
                        sortOrder: params.order //排位命令（desc，asc）
                    };
                    return temp;
                },
                columns: [
                    {
                        checkbox: true,
                        width: 20,
                    },
                    {
                        field: "id",
                        title: "ID",
                        valign: "middle",
                        sortable: true
                    },
                    {
                        field: "title",
                        title: "标题"
                    },
                    {
                        field: "content",
                        title: "内容"
                    },
                    {
                        field: "create_time",
                        title: "添加时间",
                        valign: "middle"
                    }
                ],
                onLoadSuccess: function () {
                    alert("表格加载成功！");
                },
                onLoadError: function () {

                },
                onDblClickRow: function (row, $element) {
                    var id = row.ID;
                    //EditViewById(id, 'view');
                }
            });

            _this.setState({
                $adminTable
            })

        $http.get("/article/all/?pageSize=5&pageNumber=1&sortName=id&sortOrder=desc&_=1595252243084")
          .then(function (response) {
            let blogArr = [];
            for(let i = 0; i<response.rows.length; i++){
                blogArr.push({
                    id: response.rows[i].id,
                    title: response.rows[i].title,
                    content: response.rows[i].content,
                    create_time: response.rows[i].create_time
                })
            }

            _this.state.$adminTable.bootstrapTable("removeAll");
            _this.state.$adminTable.bootstrapTable("prepend", blogArr);
          })
          .catch(function (error) {
            console.log(error);
        })
    }
}