/**
 * BASE64 EN/DECODER
 */
function base64_encode(){
	var str=CryptoJS.enc.Utf8.parse($("#txt-source").val());
	var base64=CryptoJS.enc.Base64.stringify(str);
	$("#txt-result").val(base64);
}
function base64_decode(){
	var words  = CryptoJS.enc.Base64.parse($("#txt-result").val());
	$("#txt-source").val(words.toString(CryptoJS.enc.Utf8));
}

/**
 * SQL Generator
 */
function generate(){
    var excelSource = $("#txt-excelSource").val();
    $.ajax({
        type: "POST",
        url: "../action/create_table_sql_build.php",
        data: {
            excelSource: excelSource
        }
    }).done(function (data) {
        $("#txt-sqlResult").val(data);
    });
}

/**
 * Initial Loading
 */
$(function(){
    $('.nav-sidebar').on('click', 'li', function(e){
    	switch($(this).attr("id")){
			case "li-base64":
				common.li_base64_click();
				break;
			case "li-json":
				common.li_json_click();
				break;
            case "li-sql":
                common.li_sql_click();
                break;
			default:
				break;
		}
    });
    common.init();
});

var common = {
	"li_base64_click" : function(){
		$.each($('.nav-sidebar li'), function(key, value){
			if($(this).attr("id") == "li-base64"){
				$("#li-base64").addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
		$("#div-json").css("display", "none");
        $("#div-sql").css("display", "none");
		$("#div-base64").css("display", "block");
	},
	"li_json_click" : function(){
		$.each($('.nav-sidebar li'), function(key, value){
			if($(this).attr("id") == "li-json"){
				$("#li-json").addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
		$("#div-base64").css("display", "none");
        $("#div-sql").css("display", "none");
		$("#div-json").css("display", "block");
	},
    "li_sql_click" : function(){
        $.each($('.nav-sidebar li'), function(key, value){
            if($(this).attr("id") == "li-sql"){
                $("#li-sql").addClass("active");
            }else{
                $(this).removeClass("active");
            }
        });
        $("#div-base64").css("display", "none");
        $("#div-json").css("display", "none");
        $("#div-sql").css("display", "block");
    },
    "init" : function(){
        var container, options, json, editor;

        container = document.getElementById('jsoneditor');

        options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            error: function (err) {
                alert(err.toString());
            }
        };

        json = {
            "array": [1, 2, 3],
            "boolean": true,
            "null": null,
            "number": 123,
            "object": {"a": "b", "c": "d"},
            "string": "Hello World"
        };

        editor = new JSONEditor(container, options, json);
    }
};