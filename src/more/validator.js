/*验证插件*/
/*eg:
var list = {
 checklist : [{
 el : sendToYJMsg,
 type : "check280",
 wrongPlace:"sendToYJMsgPlace"
 }]
 }
 var valiList = new ValidateAll(list);
 if (valiList.checkAll()) {
 // do something
 }
*
* */
function ValidateAll(list) {
    this.list = list.checklist;
    this.result = true;
}

ValidateAll.prototype = {
    valiType:{
        'isNull':{
            'filter':function (str) {
                var str = this.elem.value;
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                return !(str == "" || re.test(str));
            }
        },
        'isSpecial':{
            'filter':function (str) {
                var str = this.elem.value;
                var re = new RegExp(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/);
                return !(str == "" || re.test(str));
            }
        },
        'checkname':{
            'filter':function (str) {
                var str = this.elem.value;
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                return !(str == "" || re.test(str));
            }
        },
        'checkusername':{
            'filter':function (str) {
                var str = this.elem.value;
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                return !(str == "" || re.test(str));
            }
        },
        'checkphone':{
            'reg':/^0?1\d{10}$/
        },

        'plate':{
            'reg':/^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/
        },

        'isNum':{
            'reg':/^\d.*\d$/
        },

        'check140' : {
            'filter' : function () {
                return this.getCharLength() <= 140;
            }
        },

        'check280' : {
            'filter' : function () {
                return this.getCharLength() <= 280;
            }
        },
        'checkmail' : {
            'reg' : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/
        },

        'check70':{
            'filter':function () {
                return this.getCharLength() <= 70;
            }
        },

        'check100' : {
            'filter' : function() {
                return this.getCharLength() <=100;
            }
        },

        'check120' : {
            'filter' : function() {
                return this.getCharLength() <=120;
            }
        }
    },

    //统计字数
    getCharLength:function () {
        var str = this.elem.value;
        var aMatch = str.match(/[^x00-xff]/g);
        return str.length + (!aMatch ? 0 : aMatch.length);
    },


    right:function () {
		this.elem.style.borderColor = "#ccc";
        this.wrongPlace.style.display = "none";
    },

    wrong:function () {
		this.elem.style.borderColor = "red";
        this.wrongPlace.innerHTML = this.wrongMsg;
        this.wrongPlace.style.display = "block";
    },

    check:function (elem, type, wrongMsg,wrongPlace,str) {
        this.elem = elem;
        console.log(wrongPlace)
        this.wrongPlace = wrongPlace;
        this.wrongMsg = wrongMsg;
        var str = this.elem.value;
        var vali = this.valiType[type],
            reg = vali.reg,
            filter = vali.filter,
            result = filter ? filter.call(this) : reg.test(str);
			console.log(result,filter,vali)
        if (result) {
            this.right();
            return true;
        } else {
            this.wrong();
            return false;
        }
    },
    checkAll:function () {
        var l = this.list.length;
        for (var i = 0; i < l; i += 1) {
            if (!this.check(this.list[i]['el'], this.list[i]['type'],  this.list[i]['wrongMsg'],this.list[i]['wrongPlace'],this.list[i]['el'].value)) {
                this.result = false;
                break;
            }
        }
        return this.result;
    }
}