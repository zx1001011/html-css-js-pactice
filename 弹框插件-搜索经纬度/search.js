var myLocation = function () {
}

myLocation.prototype = {
    MAP: -1,
    renderHTML: function (el) {
        var tmp = '<div class="my-location-layer" style="display: none;height: 100%;width: 100%;">' +
            '<div style="position: absolute;top: 20px;left: 20px;z-index: 1;">' +
            '<input type="text" placeholder="请输入名称" class="my-location-address layui-input" style="padding-right: 30px;"' +
            'name="my-location-address">' +
            '<i type="button" class="my-location-btn layui-icon layui-icon-search" style="position: absolute;top: 10px; right: 10px;"></i>' +
            '</div>' +
            '<div id="my-location-map" style="height: 100%;width: 100%;"></div>' +
            '</div>';
        var div = document.createElement('div')
        div.innerHTML = tmp
        document.body.appendChild(div)
        var _this = this
        layui.use('layer', function () {
            el.focus(function () {
                layer.open({
                    type: 1,
                    title: '定位',
                    area: ['400px', '300px'],
                    shade: 0,
                    offset: 'rb',
                    content: $('.my-location-layer'),
                    zIndex: layer.zIndex,
                    success: function () {
                        _this.MAP = new BMap.Map("my-location-map");
                        _this.MAP.centerAndZoom("江苏", 11);
                        _this.MAP.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
                        _this.MAP.enableKeyboard(true); //启用键盘操作，默认禁用。
                        _this.MAP.enableDragging(); //启用地图拖拽，默认启用
                        _this.MAP.enableDoubleClickZoom(); //启用双击放大，默认启用
                        _this.MAP.addEventListener("click", function (e) {
                            _this.MAP.clearOverlays();
                            // alert(e.point.lng + "," + e.point.lat);
                            point = new BMap.Point(e.point.lng, e.point.lat);
                            var geoc = new BMap.Geocoder();
                            geoc.getLocation(point, function (rs) {
                                var addComp = rs.addressComponents;
                                // {streetNumber: "", street: "", district: "沙坪坝区", city: "重庆市", province: "重庆市"}
                                var address = addComp.province + addComp.city + addComp
                                    .district + addComp.street +
                                    addComp.streetNumber
                                $('input[name=my-location-address]').val(address)
                            });
                            var marker = new BMap.Marker(point);
                            _this.MAP.addOverlay(marker);
                            // document.getElementById("map").value = e.point.lng + "," + e.point.lat;
                            el.val(e.point.lng + ',' + e.point.lat)
                        });

                        // 按钮事件(自己定义)
                        $(".my-location-btn").click(function () {
                            _this.setPlace($('input[name=my-location-address]').val(), el);
                        });
                    }
                });
            })
        })
    },
    setPlace: function (value, el) {
        var _this = this
        var local, point, marker = null;
        local = new BMap.LocalSearch(_this.MAP, { //智能搜索
            onSearchComplete: fn
        });

        local.search(value);

        function fn() {
            //如果搜索的有结果
            if (local.getResults() != undefined) {
                _this.MAP.clearOverlays(); //清除地图上所有覆盖物
                if (local.getResults().getPoi(0)) {
                    point = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                    _this.MAP.centerAndZoom(point, 18);
                    marker = new BMap.Marker(point); // 创建标注
                    _this.MAP.addOverlay(marker); // 将标注添加到地图中
                    marker.enableDragging(); // 可拖拽
                    // alert("当前定位经度:"+point.lng+"纬度:"+point.lat);
                    el.val(point.lng + ',' + point.lat)
                } else {
                    alert("未匹配到地点!可拖动地图上的红色图标到精确位置");
                }
            } else {
                alert("未找到搜索结果")
            }
        }
    }
}