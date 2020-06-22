// .navbar[0] 标题
// #sidebar   侧边栏 


window._themeSettings = {
    set: {
        navbar: {
            div: '.navbar .navbar-inner',
            attr: {
                backgroundColor: 'yellow',
            }
        },
    },
    init: function () {
        _this.getSetValue(_this.set)
        // $('.navbar .navbar-inner').css('background-color', _this.set.navbar.backgroundColor)
    },
    getSetValue: function (obj) {
        // 递归遍历对象的属性和值
        for (let key in obj) {
            // if (!obj.hasOwnProperty(key)) return;//排除掉原型继承而来的属性
            console.log('属性' + key + '为：' + obj[key])
            if (typeof obj[key] == 'object' || typeof obj[key] == 'function') {
                this.getSetValue(obj[key]);//递归遍历属性值的子属性
            }
        }
    }
}
window.themeSettings = window._themeSettings
window.themeSettings.init()
