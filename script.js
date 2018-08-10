	var po = function(qty, re, moq){

    	return Math.max(0,Math.ceil((re-qty)/moq)*moq)
    
    }
    $(document).ready(function(){
		var n =  new Date();
		var y = n.getFullYear();
		var m = n.getMonth() + 1;
		var d = n.getDate();
	
    	$(".os-r, .rec-r, .acc-r, .axf-s, .axf-t").each(function(){
    		$(this).bind("keyup keypressed change input", function(){
	    		$("td span:eq(1)",this).html(po($("td input:eq(0)",this).val(),$("td input:eq(1)",this).val(),$("td input:eq(2)",this).val()))
	    		$("td span:eq(2)",this).html(parseInt($("td span:eq(1)",this).html())*$("td input:eq(3)",this).val())
	    		$("td span:eq(3)",this).html(d + "/" + m + "/" + y);
    		});
    	});

    	$("#passcode").bind("keyup keypressed change input", function(){
    		if($("input:eq(0)", this).val() === "navin"){
    			$(this).css('visibility', 'hidden');
    			$("#content").css('visibility', 'visible');
    		};
    	});

    });
