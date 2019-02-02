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
      .key(function(d) { return d.label; })
      .rollup(function(v, d) { return {
        count: v.length,
        total: d3.sum(v, function(d) { return d.value; }),
        total_max: d3.sum(v, function(d) { return d.max; }),
      }; })
      .entries(data.data);
      console.log(answers);
      //return
      
      $.each(answers, function(domainkey, domainValue){
          //console.log(domainValue.key)
          $.each(domainValue.values, function(questionkey, questionValue){
              //console.log(questionValue.key)
              labels = [];
              values = [];
              counts = [];
              maxes = [];
              datasets = [];
              $.each(questionValue.values, function(labelkey, labelValue){
                  //console.log(labelValue.key)
                  labels.push(labelValue.key)
                  counts.push(labelValue.value.count)
                  values.push(labelValue.value.total)
              })
              console.log(labels)
              console.log(counts)
              console.log(values)
              canvasId = "chart"+domainkey+"-"+questionkey;
              title = domainValue.key + "( "+questionValue.key+" )";
              $("#charts").append("<md-card><md-card-content><canvas id='"+canvasId+"'></canvas></md-card-content></md-card>")
              datasets = [
                    {
                        type: 'bar', 
                        label: 'عدد الإجابات', 
                        data: counts, 
                        backgroundColor: 'rgba(255,99,132,1)',
                        borderWidth: 1
                    }
                ]
                
                 
                drawChart(canvasId, labels, datasets, title);
          })
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

