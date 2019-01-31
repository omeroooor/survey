$(document).ready(function() {
   loadData(); 
});
   
function loadData() {   
    pages = [];

    var questionnaireId = $("#questionnaireId").val();
    var questoinnaireDomains = [];
    var questoinnaireQuestions = [];
    var labels = [];
    var values = [];
    var datasets = [];
    
    var row = {};
    var rowId = 0;
    
    var filters = [];
    $.each($(".filter"), function(k, v) {
        //console.log("ID: "+$(v).attr('id')+" Value: "+$(v).val());
        filters.push({question_id: $(v).attr('id'), answer: $(v).val()})
    });
    
    $.post("http://localhost:8000/api/questionnaire-results",{questionnaireId:questionnaireId, filters: filters}, function(data) {
        //console.log(data);
        var domains = data;
        $.each(domains.data, function(key, value){
            console.log(value);
            datasets.push(value);
        })
        drawPivot(domains.data);
    });
}


// This example is the most basic usage of pivot()

 function drawPivot(datasets){
    var tpl = $.pivotUtilities.aggregatorTemplates;
    var numberFormat = $.pivotUtilities.numberFormat;
    var intFormat = numberFormat({digitsAfterDecimal: 0});
    
    var inputFunction = function (callback) {
        datasets.forEach(function (element, index) {
            callback({
                question: element.question,
                label: element.label,
                domain: element.domain,
                type: element.type,
                count: element.label,
                total: element.value
            });
        });
    };
    
    $("#output").pivotUI(
        datasets,
        {
            rows: ['question','label'],
            cols: ['domain'],
            aggregators: {
                "count": function() { return tpl.count()(["label"])},
                "Total Weight": function() { return tpl.sum(intFormat)(["value"])},
            },
        }
    );
    
    /*
    $("#output").pivotUI(
      $.pivotUtilities.tipsData, {
        rows: ["sex", "smoker"],
        cols: ["day", "time"],
        vals: ["tip", "total_bill"],
        aggregatorName: "Sum over Sum",
        rendererName: "Heatmap"
      });
    */
}

