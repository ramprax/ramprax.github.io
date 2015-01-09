   function get_num_talks() {
     return 653;
   }
   function init_talks() {
     $.get( "talk_text_date_corrected.txt", function( data ) {
       //$( ".result" ).html( data );
       //alert( "1 Load was performed." );
       var ti = 1;
       var talk_prefix = "Talk ";
       var talk_suffix = ".";
       var cur_talk_start = "";
       var next_talk_start = "";
       var talk_len = data.length;
       var cur_talk = "";
       
       for(ti = 1; ti <= get_num_talks(); ti++) {
       
         cur_talk_start = make_talk_title( ti );
         next_talk_start = make_talk_title( ti+1 );
         
         start_index = data.indexOf(cur_talk_start);
         end_index = data.indexOf(next_talk_start);
         if(end_index < 0) {
           end_index = talk_len;
         }
         
         var cur_talk = data.substring(start_index, end_index);
         TALKS_TEXT[cur_talk_start] = cur_talk.replace(/\r?\n/g,"<br />");         
       }
       //alert( "2 Load was performed." );
       var talk_no = getUrlParameter("talk_no");
       if(talk_no) {
         display_talk(talk_no);
       } else {
         random_talk();
       }
     });
   }
   function make_talk_title(talk_index) {
     var talk_prefix = "Talk ";
     var talk_suffix = ".";
     return talk_prefix + talk_index + talk_suffix;
   }
   function display_talk(talk_index) {
     //alert("Display called."+talk_index);
     if(talk_index < 1) return;
     if(talk_index > get_num_talks()) return;
     var cur_talk_start = make_talk_title(talk_index);
     
     $('#talk_text').html(TALKS_TEXT[cur_talk_start]);
     $('#cur_talk_index').val(talk_index);
     var newTitle = cur_talk_start + " - " + RAMANA_TALKS_TITLE;
     $(document).prop('title', cur_talk_start + " - " + RAMANA_TALKS_TITLE);
     
     var newURL = RAMANA_TALK_PAGE_NAME + "?talk_no=" + talk_index;
     if(newURL != window.location) {
       history.pushState({}, newTitle, newURL);
     }
   }
   function random_talk() {
     var rand_talk_index = Math.floor((Math.random() * get_num_talks()) + 1);
     display_talk(rand_talk_index);
   }
   function first_talk() {
     display_talk(1);
   }
   function prev_talk() {
     var cur_ti = $('#cur_talk_index').val();
     cur_ti = parseInt(cur_ti) - 1;
     if(cur_ti < 1)
       return;
     display_talk(cur_ti);
   }
   function next_talk() {
     var cur_ti = $('#cur_talk_index').val();
     cur_ti = parseInt(cur_ti) + 1;
     if(cur_ti > get_num_talks())
       return;
     display_talk(cur_ti);
   }
   function last_talk() {
     display_talk(get_num_talks());
   }
   function goto_talk() {
     var cur_ti = $('#cur_talk_index').val();
     display_talk(cur_ti);
   }
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
   
