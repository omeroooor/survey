$(document).ready(function() {
    loadData();
});

function loadData() {
    $("#charts").html("");
    pages = [];

    var questionnaireIds = $("#questionnaireIds").val();
    var questionAswerIds = [];
    //alert(questionnaireIds);
    //return;
    $.get("../questionnaire-compare-results/"+questionnaireIds, function(data) {
        //console.log(data);
        res = JSON.parse(data);
        //console.log(res);
        var answers = d3.nest()
      .key(function(d) { return d.domain; })
      .key(function(d) { return d.questionnaire; })
      .rollup(function(v, d) { return {
        count: v.length,
        total: d3.sum(v, function(d) { return d.percentage; }),
        votes_no: v[0].count,
        total_votes: v[0].total,
        total_max: v[0].total_max,
        percentage: v[0].percentage,
      }; })
      .entries(res);
      //console.log(answers);
      
        $.each(answers, function(domainkey, domainValue){
            var counts = [];
            var labels = [];
            var values = [];
            var datasets = [];
            //console.log(domainValue.domain)
            $.each(domainValue.values, function(questionnairekey, questionnaireValue){
                console.log(questionnaireValue.value.percentage)
                labels.push(questionnaireValue.key);
                values.push(questionnaireValue.value.percentage);
                counts.push(questionnaireValue.value.votes_no);
            })
            datasets = [];
            //console.log(labels)
            //console.log(counts)
            //console.log(values)
            canvasId = "chart"+domainkey;
            title = domainValue.key;
            $("#charts").append("<md-card><md-card-content><canvas id='"+canvasId+"'></canvas></md-card-content></md-card>")
            datasets = [
                {
                    type: 'bar', 
                    label: 'عدد الإستبيانات', 
                    data: counts, 
                    backgroundColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }, {
                    type: 'bar', 
                    label: 'قيمة الإستبيانات', 
                    data: values, 
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                }
            ]
            
            drawChart(canvasId, labels, datasets, title);

        })
        
    });
}


function drawChart(canvasId, labels, datasets, title) {
    var ctx = document.getElementById(canvasId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            title: {
                display: true,
                text: title
            } , scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

