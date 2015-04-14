$(document).ready(function(){
			
			$('.starteroption').not('#formatspacing').change(function(){
				$('#cannedresponses').html("");
			});
			
			var generateFields = function(){
				var name = $('#studentname').val();
				var gender = $('#gender option:selected').text().toLowerCase();		 	
				var himher = gender=="boy"?"him":"her";
				var hisher = gender=="boy"?"his":"her";
				var heshe = gender=="boy"?"he":"she";

							 
			var obj = $('#gradeselect option:selected').val() == "grade1" ? firstgradecomments : secondgradecomments;

			var output = "";
			for(var i=0;i<obj.subjects.length;i++){
				var subjobj = obj.subjects[i];
				var selections = '<option value="">--</option>';
				for (var j = 0; j<subjobj.responses.length;j++){
					var addname = subjobj.responses[j].response;
					addname = addname.replace(/\s{2,}/g, ' ');
					addname = addname.replace(/--name--/g,name);
					addname = addname.replace(/--heshe--/g,heshe);
					addname = addname.replace(/--himher--/g,himher);
					addname = addname.replace(/--hisher--/g,hisher);
					addname = addname.replace(/\. she /g,". She ");
					addname = addname.replace(/\. he /g,". He ");
					addname = addname.replace(/\. his /g,". His ");
					addname = addname.replace(/\. her /g,". Her ");
					var comment = addname[0].toUpperCase()+addname.substr(1);
					selections += '<option value="'+comment+'">'+subjobj.responses[j].responsetype+'</option>'
				}
				output += 
					'<div class="subjectresponse">'+
						'<h3>'+subjobj.subject+'</h3>'+
						'<select class="selector" id="selector'+i+'">'+
							selections+
						'</select>'+
						'<div class="message"></div>'+
					'</div>';
			}
			$('#cannedresponses').html(output);
			$('<button id="getallmessages">All Messages</button>').appendTo('#cannedresponses');
			$('<br>').appendTo('#cannedresponses');
			$('<div id="allmessages" class="subjectresponse" />').appendTo('#cannedresponses');
			$('#cannedresponses').append('<a href="#" id="scrolltotop">^ Scroll Back to the Top ^</a>');
			$('#scrolltotop').click(function(ev){
				ev.preventDefault();
				$('body,html').animate({scrollTop:0});
			});
			$('<hr>').appendTo('#cannedresponses');
			$('#allmessages').click(function(){
		        if (document.selection) {
		            var range = document.body.createTextRange();
		            range.moveToElementText(document.getElementById('allmessages'));
		            range.select();
		        } else if (window.getSelection) {
		            var range = document.createRange();
		            range.selectNode(document.getElementById('allmessages'));
		            window.getSelection().addRange(range);
		        }
		    });
			$('#getallmessages').click(function(){
				$('#allmessages').html("");
				var formatoptions = {singlecharacterspace:" ",singlelinebreak:"<br/>",doublelinebreak:"<br/><br/>",listsingle:"<br/>&bull;&nbsp;",listdouble:"<br/><br/>&bull;&nbsp;"};
				var chosenspacing = formatoptions[$('#formatspacing option:selected').val()];
				$('.message').each(function(){
					if($(this).text() != "") {
						var appender = ((chosenspacing)+$(this).text());
					$('#allmessages').append(appender);
					}
				});
			});
				
			$('.selector').change(function(){
			 	$(this).parent().find('.message').text($(this).val());
			 	$('#allmessages').html("");
		 	});
		 	
		 	var consolemessage = "";
		 	$('#cannedresponses option').each(function(){
			 	consolemessage += $(this).val()+" ";
		 	});
		 	console.log(consolemessage);
		 	
	 	}; //end generateFields function
	 	
	 	
			
			$('#responseoptions').click(function(event){
				event.preventDefault();
				generateFields();
			});
			$('#studentname, #gender, #responseoptions').keyup(function(event){
				if (event.keyCode == 13) {
					generateFields();
				}
			});
			
			// Remember Formatting
			if (localStorage.lineformat) {
				$('#formatspacing #'+localStorage.lineformat).attr('selected','selected');
			}
			$('#formatspacing').change(function(){
				localStorage.lineformat = $('#formatspacing option:selected').attr('id');
			});
			
			
			//Remember Grade
			if (localStorage.grade) {
				$('#gradeselect #'+localStorage.grade).attr('selected','selected');
			}
			$('#gradeselect').change(function(){
				localStorage.grade = $('#gradeselect option:selected').attr('id');
			});
	 	
	 	
	 	
	});