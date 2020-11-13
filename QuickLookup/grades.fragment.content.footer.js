<script type="text/javascript">

   /*grades.fragment.content.footer.txt*/
    $j(document).ready(function(){
        $j("#quickLookup table tr:contains('Current weighted GPA')").remove();
        $j("#quickLookup table tbody tr th:contains('Attendance By Class')").html("Attendance and Grades By Class");

        var breakPosition;
        var stringWithoutPercentage;
        $j("#quickLookup table td a[href*='scores']").each(function(){
            breakPosition = $j(this).html().indexOf('<br>');
            if (breakPosition >= 0) {
                stringWithoutPercentage = $j(this).html().substring(0,breakPosition);
                $j(this).html(stringWithoutPercentage);
            }
        });    
        
        $j("#quickLookup table td a[href*='scores']").each(function(){
            if ($j(this).html() == "[ i ]") {
                $j(this).html("<img src='../images/img/detail_icon2.png' style='height: 25px; width: auto; border: 0;' />");
            }
        });          

        var numColumns = parseInt($j("#quickLookup table th:contains('Attendance Totals')").attr('colspan').trim());
        numColumns = numColumns - 1;
        $j("#quickLookup table th:contains('Attendance Totals')").attr("colspan",numColumns);
        
        $j("table:contains('Attendance By Day')").remove();
        $j("table.linkDescList th:contains('Exp')").hide();
        $j("table.linkDescList td:nth-child(1)").hide();
        $j("#legend p:last").remove();
        $j("<div class='box-round'><h3>Instructions for using this page</h3><p>Click on the <img src='../images/img/detail_icon2.png' style='height: 15px; width: auto; border: 0;' /> icon, or on any of the grades under the Term Columns (T1, T2, T3, S1 or S2 as appropriate) to show the assignments for that term, and any associated standards if applicable.</p><p>Click on the number of absences to show which dates the absences were on.</p></div>").insertBefore("div.box-round:first");
    });
</script>
