function getCoord(object, direction){
	if(direction == 'LEFT')
		return object.offset().left;
	else if(direction == 'RIGHT')
		return object.offset().left + object.width();
	else if(direction == 'TOP')
		return object.offset().top;
	else if(direction == 'BOTTOM')
		return object.offset().top + object.height();
	else if(direction == 'HCENTER')
		return object.offset().left + object.width()/2;
	else if(direction == 'VCENTER')
		return object.offset().top + object.height()/2;
}