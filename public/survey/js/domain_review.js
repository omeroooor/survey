$(document).ready(function() {
    loadData();
});

function loadData() {
    $("#charts").html("");
    pages = [];

    var questionnaireId = $("#questionnaireId").val();
    var questionAswerIds = [];
    var labels = [];
    var values = [];
    var datasets = [];
    
    var filters = [];
    $.each($(".filter"), function(k, v) {
        //console.log("ID: "+$(v).attr('id')+" Value: "+$(v).val());
        filters.push({question_id: $(v).attr('id'), answer: $(v).val()})
    });
    //console.log(filters);
    $.post("http://localhost:8000/api/questionnaire-results",{questionnaireId:questionnaireId, filters: filters}, function(data) {
        //console.log(data);
       //$("#reviewResult").html(data);
       var answers = d3.nest()
      .key(function(d) { return d.domain; })
      .key(function(d) { return d.question; })
      .rollup(function(v) { return {
        count: v.length,
        total: d3.sum(v, function(d) { return d.value; }),
        total_max: d3.sum(v, function(d) { return d.max; }),
      }; })
      .entries(data.data);
      console.log(answers);
      //return
      var canvasId = 0;
      $.each(answers, function(domainkey, domainValue){
          canvasId ++;
          //console.log(domainValue.key)
          labels = [];
          values = [];
          counts = [];
          datasets = [];
          $.each(domainValue.values, function(questionkey, questionValue){
              console.log(questionValue.value)
              labels.push(questionValue.key)
              counts.push(questionValue.value.count)
              values.push((questionValue.value.total/questionValue.value.total_max)*100)
          })
          console.log(labels)
          console.log(counts)
          console.log(values)
          //canvasId = "chart"+domainkey;
          title = domainValue.key;
          $("#charts").append("<md-card><md-card-content><canvas id='canvas"+canvasId+"'></canvas></md-card-content></md-card>")
          datasets = [
                {
                    type: 'bar', 
                    label: 'قيمة الإستبيانات', 
                    data: values, 
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                }
            ]
            
             
            drawChart('canvas'+canvasId, labels, datasets, title);
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

