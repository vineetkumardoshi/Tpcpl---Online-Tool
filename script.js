var po = function(qty, re, moq){

	return Math.max(0,Math.ceil((re-qty)/moq)*moq)

}
$(document).ready(function(){
	var QuantityInStock       = "td input:eq(0)"
    var RestockLevel          = "td input:eq(1)"
    var PurchaseOrderQuantity = "td span:eq(1)"
    var MOQBatchUnits         = "td input:eq(2)"
    var ForcedRatio           = "td input:eq(3)"
    var ForcedOrder           = "td span:eq(2)"
    var SaleWeights           = [0.030075,0.125313,0.177945,0.105263,0.107769,0.085213,0.077694,0.025063,0.002506,0.070175,0.102757,0.035088,0.010025,0.045113]
	var SaleWeightsSorted     = SaleWeights.slice().sort()
    var i=0;
    $(".os-r, .rec-r, .acc-r, .axf-s, .axf-t").each(function(){

		$(PurchaseOrderQuantity,this).html(po($(QuantityInStock,this).val(),$(RestockLevel,this).val(),$(MOQBatchUnits,this).val()))
        
        $(".axf-s td:nth-child(7), .axf-t td:nth-child(7)").css({"background-color":"brown"})         
        
        $(ForcedRatio, this).val(SaleWeights[i])
        i=(i+1)%14;
                        
        $(this).bind("keyup keypressed change input", function(){
    		
            $(PurchaseOrderQuantity,this).html(po($(QuantityInStock,this).val(),$(RestockLevel,this).val(),$(MOQBatchUnits,this).val()))
    	
            var OrderSum = 0;  
            $(".orderquantity").each(function() {
                
                var val = $.trim( $(this).text() );

                if ( val ) {
                    val = parseFloat( val.replace( /^\$/, "" ) );

                    OrderSum += !isNaN( val ) ? val : 0;
                }
                if(OrderSum >= 25.0){
                    $(".axf-s td:nth-child(5), .axf-t td:nth-child(5)").css({"background-color": "green"});    
                } else {
                    $(".axf-s td:nth-child(5), .axf-t td:nth-child(5)").css({"background-color": "black"});    
                }
            });
            var StockSum = 0;
            
            $(".quantityInStock").each(function(){
                StockSum += parseInt($(this).val())
            });
            $(".quantityInStockTotal").val(StockSum);

            var OrderQuantitySum = 0;
            $(".orderquantity").each(function(){
                OrderQuantitySum += parseInt($(this).html())
                console.log(parseInt($(this).html()))
            });
            $(".orderquantityTotal").val(OrderQuantitySum);


            var LeftOver = 25-OrderSum;
            if(LeftOver <= 25){
                $(".axf-s td:nth-child(7), .axf-t td:nth-child(7)").css({"background-color":"blue"})
                var IntegralSumOrder = 0;
                $(".axf-s,.axf-t").each(function(){
                    var forcedOrderValue = Math.round($(ForcedRatio,this).val()*LeftOver)+Math.round($(PurchaseOrderQuantity,this).html())
                    $(ForcedOrder,this).html(forcedOrderValue)
                    IntegralSumOrder += forcedOrderValue
                });
                console.log(IntegralSumOrder)
                //Reducing Stock
                if(IntegralSumOrder > 25){
                    console.log("IntegralSumOrder > 25")
                    var diff = 25 - IntegralSumOrder;
                    
                }
            } else {
                $(".axf-s,.axf-t").each(function(){
                    $(ForcedOrder,this).html("#NA")
                    $(".axf-s td:nth-child(7), .axf-t td:nth-child(7)").css({"background-color":"brown"})  
                });
            }
        }); 
    });         

    $("#passcode").bind("keyup keypressed change input", function(){
		if($("input:eq(0)", this).val() === "navin"){
			$(this).css('visibility', 'hidden');
			$("#content").css('visibility', 'visible');
		};
    });
});
