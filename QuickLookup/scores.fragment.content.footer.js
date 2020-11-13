<script>
    $j(document).ready(function()
    {
        $j('h1:first').html("Class Score Detail: ~(studentname)");
        $j("table.linkDescList tbody tr th:eq(0)").parent().removeClass("center");   
    $j("table.linkDescList tbody tr th:eq(0)").parent().addClass("left");  
    $j("table.linkDescList tbody tr td:eq(0)").parent().removeClass("center");   
    $j("table.linkDescList tbody tr td:eq(0)").parent().addClass("left"); 
    
    $j("table.linkDescList tbody tr th:nth-child(4)").remove();
    $j("table.linkDescList tbody tr td:nth-child(4)").remove();
    $j("table.linkDescList tbody tr th:nth-child(3)").remove();
    $j("table.linkDescList tbody tr td:nth-child(3)").remove();        
    
    
    $j("p:contains('Comments')").remove();
    $j("p:contains('Description')").remove();
    $j("div.comment").remove();
    
        $j("<div class='box-round'><h3>Information on Class Assignment Scores</h3><p>This page shows each piece of work (assignment) that the students have completed that have been assessed by the teacher. The scores shown on this page are updated whenever the teachers adds or changes an assignmnent (they represent live data). Each time you return to this page there may be additional assignments or changes to the scores.</p><p>Click on the <img src='../images/img/standard-final-grade-white-30x30.svg' style='height: 16px; width: auto; border: 0; background-color: #195F7D;' /> icon to see the assessment criteria that were assessed for the assignment.</p><h3>Assessment Guidelines</h3><p>The IB has developed assessment criteria against which the student’s work will be assessed.</p><p>The student will not be judged against work of other students, but against assessment criteria, which the teacher will have shared with the student prior to assessment. This will help the student to reflect on their progress and set growth goals and learning targets.</p><p>The overall assignment is graded on a letter scale, and the criteria are assessed on a 1-4 number scale as below:<ul><li>E (4) - means the student has exceeded the criteria for the assessment</li><li>M (3) - means the student has met the criteria for the assessment</li><li>D (2) - means the student is developing towards the criteria set for the assessment</li><li>N (1) - means the skills and knowledge to meet the criteria are not yet evident</li><li>NA - means not Assessed </li></div>").insertBefore("div.box-round:first");   

});
 
    setTimeout(function(){
        checkForDataLoad(); 
    }, 100);    
    
    function checkForDataLoad() {
        var colNum = $j("tbody.ng-scope tr:nth-child(1) td").length;
        
        if (colNum != 0) {
        
            $j("table:contains('Due Date') th:contains('Category')").removeClass("center"); 
            $j("table:contains('Due Date') th:contains('Category')").addClass("left");
            $j("table:contains('Due Date') th:contains('Due Date')").removeClass("center"); 
            $j("table:contains('Due Date') th:contains('Due Date')").addClass("left");        
            $j("table:contains('Due Date') th:contains('Assignment')").removeClass("center"); 
            $j("table:contains('Due Date') th:contains('Assignment')").addClass("left"); 
            $j("th:contains('Flags')").html("Flags (see legend)");

            var itxt;
            var icols;
            var icolsTotal = 0;
            var scoreInColumn = 0;
            var gradeInColumn = 0;
            $j(".box-round table:contains('Due Date') th").each(function(i) {
                itxt = $j(this).text();
                icols = $j(this).attr("colspan");
                if (icols == undefined) { icolsTotal = icolsTotal + 1; }
                else { icolsTotal = icolsTotal + parseInt(icols); }
                if((itxt.indexOf("Score") >= 0) ) {
                    scoreInColumn = icolsTotal;
                }
            });
            

            $j(".box-round table:contains('Due Date') td:nth-child(" + scoreInColumn + ")").each(function() {
                var scoretxt = $j(this).text().trim();
                if((scoretxt.indexOf("/") >= 0) ) {
                    var gradeText = $j(this).parent().find($j("td:nth-child(" + (scoreInColumn+1) + ")")).text().trim();
                    $j(this).text(gradeText);
                }
                else { gradeText = scoretxt; }
                switch(gradeText) {
                    case "1":
                        gradeText = "N";
                        break;
                    case "2":
                        gradeText = "D";
                        break;
                    case "3":
                        gradeText = "M";
                        break;
                    case "4":
                        gradeText = "E";
                        break;                            
                }  
                $j(this).text(gradeText);
            }); 
            
            $j("th:contains('Grade')").text("");        
            $j(".box-round table:contains('Due Date') td:nth-child(" + (scoreInColumn+1) + ")").text("");  
            $j("p:contains('special weighting')").remove(); 
        }
        else {
            setTimeout(function(){
                checkForDataLoad(); 
            }, 100);
        }
    }    
</script>        
