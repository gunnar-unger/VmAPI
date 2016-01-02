//-----------------------------------------------------------------
VmAPI.request=function(options){
	var data=options.data;
	var call_back=options.call_back;
	VmFramework.ajax_server_error=0;
	var url=VmFramework.api_base+'api.aspx';
	$.ajax({
        type: "POST", 
        url: url,
        contentType: "application/json",
        charset:"utf-8",
        dataType: "json",
        error: function(jqXHR,error, errorThrown){ if(jqXHR.status) {alert(jqXHR.responseText);} else {alert("Something went wrong");}},
		data: JSON.stringify(data),
		success: function(c,textStatus, request){
			if(VmFramework.ajax_server_error==1) return;
			try{
				if(call_back!==undefined) call_back(c);
			}catch(err){
				alert(err.toString());
			}
		},
		dataFilter: VmAPI.request_filter,
	})
};
//-----------------------------------------------------------------
VmAPI.request_filter=function(c){
	var a=$.parseJSON(c);
	if(a.Error!=undefined){
		alert("Server side error: "+a.Error); 
		VmFramework.ajax_server_error=1;
		if(typeof(VmFramework.submit_div)!=='undefined' && VmFramework.submit_div!=""){
   			$('#D'+VmFramework.submit_div).triggerHandler('submit_failed');
		}
	}
	return c;
}
//-----------------------------------------------------------------


