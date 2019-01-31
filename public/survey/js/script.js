$(document).ready(function() {
    pages = [];
    var questionnaire_id = $("#questionnaireId").val();
    console.log(questionnaire_id)
    $.get("http://localhost:8000/api/questionnaires/"+questionnaire_id, function(data) {
        //console.log(data);
        questionnaire = data.data
        questionnaire_id = questionnaire.id;
        
            //jsonString = JSON.stringify(questionnaire).split('"domains":').join('"pages":')
            //console.log(questionnaire[0].domains)
            $.each(questionnaire.domains, function(key, value){
                console.log(value)
                page = {}
                elements = []
                $.each(value.questions, function(k, v) {
                    element = {}
                    element.title = v.question.name
                    element.type = v.question.answer_set.type
                    element.name = value.domain.id + '-' + v.question.id
                    
                    element.isRequired = v.is_required
                    
                    panelElements = []
                    $.each(v.question.answer_set.values, function(k1, v1) {
                        choice = {}
                        choice.value = v1.id
                        choice.text = v1.name
                        panelElements.push(choice)
                    })
                    //console.log('element')
                    element.choices = panelElements
                    elements.push(element)
                })
                page.elements = elements;
                
                pages.push(page)
            })
            
            //console.log(pages)
            json = {"pages":pages}
        console.log(json)

        window.survey = new Survey.Model(json);

        survey
            .onComplete
            .add(function (result) {
                document
                    .querySelector('#surveyResult')
                    .innerHTML = "result: " + JSON.stringify(result.data);
                //alert(JSON.stringify(result.data));
                postResult(questionnaire_id, result.data)
            });

        $("#surveyElement").Survey({model: survey});
    });

});

function postResult(questionnaire_id, result) {
    $.post("http://localhost:8000/api/answer", {questionnaire_id:questionnaire_id, result:result}, function(data) {
       //alert(data); 
    })
}


