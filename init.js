function inputSharedKey(){	
	var checker = true;
	var input;		
	while(checker){
		input = prompt('키를 입력해주세요(16진수 10자 입력)\n취소를 누르시면 0000000000으로 설정됩니다.', '');
		if(input.length != 10){
			alert('자리수가 10이 아닙니다!');
			continue;
		}
		for(var i = 0; i < 10; i++){
			if(!((input[i].toLowerCase() >= 'a' && input[i].toLowerCase() <= 'f') || (input[i] >= '0' && input[i] <= '9' ))){
				alert('잘못 된 키입니다!');
				break;
			}
			if(i == 9)
				checker = false;
		}
	}
	$('.text_sharedKey_16').html(input);
	sharedKey_16 = input;
}
function setInit(){
	var client = $('.img_client');
	var target = $('.img_target');
	var start = $('.button_start');
	var message = $('.box_message');
				
	target.css('display','block');
	start.css('display','block');

	target.css('top',$(window).height()-target.height()-50);
	start.css('left',getCoord(client,'HCENTER')-start.width()/2);
	start.css('top',(getCoord(client,'BOTTOM')+getCoord(target,'TOP')-start.height())/2);
	message.css('top',getCoord(target,'BOTTOM')+10);
	message.css('left',getCoord(target,'HCENTER')-message.width()/2);

	setLocation(stage);
}
function setLocation(stage){
	var crc = $('.box_crc');
	var rc = $('.box_rc');
	var xor = $('.box_xor');
	var client = $('.img_client');
	var target = $('.img_target');
	var message = $('.img_message');
	
	crc.css('display','block');
	rc.css('display','block');
	xor.css('display','block');
			
	if(stage <= 3){
		crc.css('left', getCoord(client,'LEFT')-crc.width()-200);
		crc.css('top', getCoord(client,'BOTTOM')+message.height());
		rc.css('left', getCoord(client,'HCENTER')-rc.width()/2-20);
		rc.css('top', getCoord(crc,'BOTTOM')+20);
		xor.css('left',getCoord(client,'RIGHT')+200);
		xor.css('top', getCoord(rc,'BOTTOM')+20);
	}else{	
		rc.css('left', getCoord(target,'RIGHT')+200);
		rc.css('top', getCoord(target,'TOP')-message.height()-rc.height());
		xor.css('left', getCoord(target,'HCENTER')-xor.width()/2-20);
		xor.css('top', getCoord(rc,'TOP')-xor.height()-20);
		crc.css('left',getCoord(target,'LEFT')-crc.width()-200);
		crc.css('top', getCoord(xor,'TOP')-crc.height()-20);
	}

	crc.css('display','none');
	rc.css('display','none');
	xor.css('display','none');
}