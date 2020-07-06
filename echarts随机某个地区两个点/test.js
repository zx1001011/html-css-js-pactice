window.onload = function () {
    console.log('hhahha')

    var map = {
        place: '江苏省',
        allData: { "code": 0, "desc": null, "detailInfo": [{ "cityName": "常州市", "unitCount": 7, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "无锡市", "unitCount": 9, "deviceCount": 166, "cameraCount": 10 }, { "cityName": "镇江市", "unitCount": 7, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "扬州市", "unitCount": 11, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "连云港市", "unitCount": 35, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "南京市", "unitCount": 32, "deviceCount": 110, "cameraCount": 15 }, { "cityName": "宿迁市", "unitCount": 22, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "徐州市", "unitCount": 15, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "淮安市", "unitCount": 40, "deviceCount": 0, "cameraCount": 0 }, { "cityName": "苏州市", "unitCount": 25, "deviceCount": 11, "cameraCount": 7 }, { "cityName": "泰州市", "unitCount": 9, "deviceCount": 1, "cameraCount": 0 }, { "cityName": "南通市", "unitCount": 24, "deviceCount": 26, "cameraCount": 0 }, { "cityName": "盐城市", "unitCount": 14, "deviceCount": 0, "cameraCount": 0 }] },
        toolTipData: [],
        renderMap: function () {
            var _this = this
            var mapName = 'beijing'
            var myChart = echarts.init(document.getElementById('map'));

            myChart.setOption({
                backgroundColor: '#404a59',
                geo: {
                    map: mapName,
                    silent: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111',
                            borderWidth: 0.1
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: [{
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: []
                }]
            });

            var device = {
                data: [],
                min: 0,
                max: 0,
                geoCoordMap: {}
            }
            var unit = {
                data: [],
                min: 0,
                max: 0,
                geoCoordMap: {
                    '南京市': [118.867413, 31.741544],
                    '南通市': [120.594676, 32.281143],
                    '宿迁市': [118.578186, 34.041280],
                    '常州市': [119.690551, 31.704270],
                    '徐州市': [116.861572, 34.626427],
                    '扬州市': [119.342736, 33.208818],
                    '无锡市': [120.454101, 31.774877],
                    '泰州市': [119.974572, 32.669436],
                    '淮安市': [119.100036, 33.690067],
                    '盐城市': [119.918518, 34.218615],
                    '苏州市': [120.988562, 31.388812],
                    '连云港市': [119.053344, 34.888183],
                    '镇江市': [119.473571, 32.124453],
                }
            }
            /*获取地图数据*/
            myChart.showLoading();
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            myChart.hideLoading();

            // 封装数据
            mapFeatures.forEach(function (v, index) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                device.geoCoordMap[name] = v.properties.cp;
            });
            // unit.geoCoordMap['南京市'][0] = device.geoCoordMap['南京市'][0]
            // unit.geoCoordMap['南京市'][1] = device.geoCoordMap['南京市'][1] + 0.1
            for (var i = 0; i < _this.allData.length; i++) {
                device.data.push({
                    name: _this.allData[i].cityName,
                    value: _this.allData[i].deviceCount,
                })
                unit.data.push({
                    name: _this.allData[i].cityName,
                    value: _this.allData[i].unitCount,
                })
            }
            var geo = myChart.getModel().getComponent('geo').coordinateSystem;
            console.log(geo)
            var data = []
            for (let i in device.geoCoordMap) {
                var tmpArr = []
                tmpArr.push(i)
                tmpArr.push(device.geoCoordMap[i][0])
                tmpArr.push(device.geoCoordMap[i][1])
                data.push(tmpArr);
            }
            var min = Infinity;
            var max = -Infinity;
            data.forEach(function (item) {
                max = Math.max(item[2], max);
                min = Math.min(item[2], min);
            });
            data.forEach(function (item, index) {
                // var randomCount = Math.round(item[2] / (max / 1000));
                var randomCount = 2
                console.log(randomCount);
                var name = item[0].replace('柯尔克孜', '');
                var region = geo.getRegion(name);
                if (!region) {
                    return;
                }
                var rect = region.getBoundingRect();
                // console.log(rect)
                // console.log(item)
                var zoom = 0.8  // 可以改变离散程度
                rect.x += (rect.width * (1 - zoom) / 2)
                rect.y += (rect.height * (1 - zoom) / 2)
                rect.width *= zoom
                rect.height *= zoom
                for (var i = 0; i < randomCount; i++) {
                    var coord = [Infinity, Infinity];
                    while (!region.contain(coord)) {
                        coord[0] = rect.x + Math.random() * rect.width;
                        coord[1] = rect.y + Math.random() * rect.height;
                    }
                    if (i === 0) {
                        device.geoCoordMap[name] = coord
                    }
                    if (i === 1) {
                        unit.geoCoordMap[name] = coord
                    }
                }
                var name = item[0].replace('柯尔克孜', '');
                var region = geo.getRegion(name);
                if (!region) {
                    return;
                }
            });

            // 以便计算气泡的大小
            device.data.sort(function (obj1, obj2) {
                return obj1.value - obj2.value;
            }) // 从小到大排序
            device.min = device.data[0].value
            device.max = device.data[device.data.length - 1].value
            unit.data.sort(function (obj1, obj2) {
                return obj1.value - obj2.value;
            }) // 从小到大排序
            unit.min = unit.data[0].value
            unit.max = unit.data[unit.data.length - 1].value
            var scatterSymbolSizeScale = 40


            var series = [
                {
                    name: '散点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: _this.mapConvertData(device.data, device.geoCoordMap), // 物联网设备
                    symbolSize: function (val) {
                        return (val[2] - device.min + 1) / (device.max - device.min) * scatterSymbolSizeScale;  // 将数据转成[0-1] * scatterSymbolSizeScale,气泡大小正合适
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            color: '#47dcdd',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#12f9b3',
                            shadowBlur: 10,
                            shadowColor: '#12f9b3'
                        }
                    },
                }
                ,
                {
                    name: '散点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: _this.mapConvertData(unit.data, unit.geoCoordMap),  // 企业主体
                    symbolSize: function (val) {
                        return (val[2] - unit.min + 1) / (unit.max - unit.min) * scatterSymbolSizeScale;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff70f',
                            shadowBlur: 10,
                            shadowColor: '#fff70f'
                        }
                    },
                    zlevel: 1,
                }
            ]
            option = {
                title: {},
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof (params.value)[2] == "undefined") {
                            var toolTiphtml = ''
                            for (var i = 0; i < _this.toolTipData.length; i++) {
                                if (params.name == _this.toolTipData[i].name) {
                                    toolTiphtml += _this.toolTipData[i].name + ':<br>'
                                    for (var j = 0; j < _this.toolTipData[i].value.length; j++) {
                                        toolTiphtml += _this.toolTipData[i].value[j].name + ':' + _this.toolTipData[i]
                                            .value[j].value + "<br>"
                                    }
                                }
                            }
                            return toolTiphtml;
                        } else {
                            var toolTiphtml = ''
                            for (var i = 0; i < _this.toolTipData.length; i++) {
                                if (params.name == _this.toolTipData[i].name) {
                                    toolTiphtml += _this.toolTipData[i].name + ':<br>'
                                    for (var j = 0; j < _this.toolTipData[i].value.length; j++) {
                                        toolTiphtml += _this.toolTipData[i].value[j].name + ':' + _this.toolTipData[i]
                                            .value[j].value + "<br>"
                                    }
                                }
                            }
                            return toolTiphtml;
                        }
                    }
                },
                geo: {
                    show: true,
                    map: mapName,
                    slient: true,
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#71dbef',
                            borderWidth: 2,
                            shadowBlur: 15,
                            shadowColor: '#0f7284',
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    },
                    zoom: 0.9,
                    center: [120.5, 32.1]
                },
                series: series
            };
            myChart.setOption(option, true)
        },
        mapConvertData: function (data, geoCoordMap) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        },
        getMapJson: function () {
            var secScript = document.createElement("script");
            secScript.setAttribute("type", "text/javascript");
            secScript.setAttribute("src", "./map/" + this.place + '.js');
            document.body.appendChild(secScript);
        },
        init: function () {
            var _this = this
            _this.getMapJson()
            _this.allData = _this.allData.detailInfo
            // 封装数据
            for (var i = 0; i < _this.allData.length; i++) {
                _this.toolTipData.push({
                    name: _this.allData[i].cityName,
                    value: []
                })
                _this.toolTipData[i].value.push({
                    name: '应用主体',
                    value: _this.allData[i].unitCount,
                })
                _this.toolTipData[i].value.push({
                    name: '物联网设备',
                    value: _this.allData[i].deviceCount,
                })
                _this.toolTipData[i].value.push({
                    name: '网络摄像头',
                    value: _this.allData[i].cameraCount,
                })
            }
            console.log(_this.allData)
            console.log(_this.toolTipData)
            _this.renderMap()
        }
    }
    map.init()
}