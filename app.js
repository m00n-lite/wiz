(function()
{
	var einsteinRiddle = function(questions, formselector){
		riddle=this;
		riddle.form = $(formselector);
		
		if(typeof questions == 'object'){
			riddle.questions = questions;
			riddle.init();
		}
		else if(typeof questions == 'string')
		{
			$.ajax({
  				url: questions,
  				dataType: "json",
  				success: function(data){
  					riddle.questions=data;
  					riddle.init();
  				},
  				error: function (request, status, error) {
        			alert(error);
    			}
			});	
		}
		
	}
	einsteinRiddle.prototype.init = function(){
		for(i in this.questions)
		{
			var html = '<div class="form-group">\r\n';
			html+='\t<label>'+this.questions[i].question+'</label>\r\n';
            html+=this.renderInput(this.questions[i]);
            html +='</div>';
            this.form.append(html);
        }
        this.form.append('<button type="submit" class="btn btn-success">Отправить</button>');
	};
	einsteinRiddle.prototype.renderInput = function(question){
		var html ='';
    	if(question.hasOwnProperty('variants')){
			for(i in question.variants){
				html+='<div class="'+question.type+'">\r\n<label>\r\n';
				html+='<input type="'+question.type+'"  name="'+question.name+'" value="'+question.variants[i]+'">';
				html+=question.variants[i]+'</label></div>';	
			}
		}
		else{
			html+='<input type="'+question.type+'" class="form-control" name="'+question.name+'">';	
		}
		return html;
	}
	window.einsteinRiddle = einsteinRiddle;
})();

$(document).ready(function() {
//////////////////////////////////////////////////////////////////////////////////////    
	array = [
		{'name':'sum','question':'Сколько будет 2+2','type':'radio','variants' : [2,4,6]},
		{'name':'multiply','question':'Сколько будет 3*3','type':'radio','variants' : [3,6,9]},
		{'name':'crocodile','question':'Крокодил:','type':'checkbox','variants':['зеленый','квадратный','млекопитающее','хладнокровное']},
		{'name':'surname','question':'Фамилия','type':'text'},
		{'name':'name','question':'Имя','type':'text'},
		{'name':'group','question':'Группа','type':'text'}
	];
	//document.write(JSON.stringify(array));
	var test = new einsteinRiddle(array,'#test');

});
