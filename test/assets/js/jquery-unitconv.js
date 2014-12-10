$.metricUnits = ['kg','g','t','mm','cm','m','km','sq mm','sq cm','sq m','sq km','cu mm','cu cm','cu m','cu km','ml','l'];

$.convertUnits = function(toSystem)
{
	var toSystem = toSystem || 'imperial';
	
	var convertables = $('[data-unit], [data-unit-value]');
	var convertable;
	
	for(var c = 0; c < convertables.length; c++)
	{
		convertable = $(convertables[c]);
		
		unit = convertable.data('unit');
		value = convertable.data('unitValue') || convertable.html();
		
		if(unit === undefined || unit == '')
		{
			// Mass
			if(value.indexOf('lb') >= 0 || value.indexOf('lbs') >= 0) { unit = 'lb'; }
			else if(value.indexOf('oz') >= 0 && value.indexOf('fl oz') == -1) { unit = 'oz'; }
			else if(value.indexOf('gr') >= 0) { unit = 'gr'; }
			else if(value.indexOf('cwt') >= 0) { unit = 'cwt'; }
			
			else if(value.indexOf('kg') >= 0) { unit = 'kg'; }
			else if(value.indexOf('g') >= 0) { unit = 'g'; }
			else if(value.indexOf('t') >= 0) { unit = 't'; }
			
			// Length
			else if(value.indexOf('pi') >= 0) { unit = 'pi'; }
			else if(value.indexOf('in') >= 0) { unit = 'in'; }
			else if(value.indexOf('ft') >= 0) { unit = 'ft'; }
			else if(value.indexOf('yd') >= 0) { unit = 'yd'; }
			else if(value.indexOf('mi') >= 0) { unit = 'mi'; }
			
			else if(value.indexOf('mm') >= 0) { unit = 'mm'; }
			else if(value.indexOf('cm') >= 0) { unit = 'cm'; }
			else if(value.indexOf('m') >= 0) { unit = 'm'; }
			else if(value.indexOf('km') >= 0) { unit = 'km'; }
			
			// Area
			else if(value.indexOf('acre') >= 0) { unit = 'acre'; }
			else if(value.indexOf('in³') >= 0 || value.indexOf('sq in') >= 0) { unit = 'sq in'; }
			else if(value.indexOf('ft³') >= 0 || value.indexOf('sq ft') >= 0) { unit = 'sq ft'; }
			else if(value.indexOf('yd²') >= 0 || value.indexOf('sq yd') >= 0) { unit = 'sq yd'; }
			else if(value.indexOf('mm²') >= 0) { unit = 'sq mm'; }
			else if(value.indexOf('cm²') >= 0) { unit = 'sq cm'; }
			else if(value.indexOf('m²') >= 0) { unit = 'sq m'; }
			else if(value.indexOf('km²') >= 0) { unit = 'sq km'; }
			
			// Volume
			else if(value.indexOf('in³') >= 0 || value.indexOf('cu in') >= 0) { unit = 'cu in'; }
			else if(value.indexOf('ft³') >= 0 || value.indexOf('cu ft') >= 0) { unit = 'cu ft'; }
			else if(value.indexOf('yd³') >= 0 || value.indexOf('cu yd') >= 0) { unit = 'cu yd'; }
			else if(value.indexOf('acre ft') >= 0) { unit = 'acre ft'; }
			
			else if(value.indexOf('mm³') >= 0) { unit = 'cu mm'; }
			else if(value.indexOf('cm³') >= 0) { unit = 'cu cm'; }
			else if(value.indexOf('m³') >= 0) { unit = 'cu m'; }
			else if(value.indexOf('km³') >= 0) { unit = 'cu km'; }
			
			// Fluids
			else if(value.indexOf('fl oz') >= 0) { unit = 'fl oz'; }
			else if(value.indexOf('pt') >= 0) { unit = 'pt'; }
			else if(value.indexOf('qt') >= 0) { unit = 'qt'; }
			else if(value.indexOf('gal') >= 0) { unit = 'gal'; }
			else if(value.indexOf('tsp') >= 0) { unit = 'tsp'; }
			else if(value.indexOf('tbsp') >= 0) { unit = 'tbsp'; }
			else if(value.indexOf('cup') >= 0 || value.indexOf('cp') >= 0) { unit = 'cup'; }
			else if(value.indexOf('barrel') >= 0 || value.indexOf('bbl') >= 0) { unit = 'bbl'; }
			
			else if(value.indexOf('ml') >= 0) { unit = 'ml'; }
			else if(value.indexOf('l') >= 0) { unit = 'l'; }
		}
		else
		{
			switch(unit)
			{
				case 'lbs': unit = 'lb'; break;
				
				case 'in²': unit = 'sq in'; break;
				case 'ft²': unit = 'sq ft'; break;
				case 'yd²': unit = 'sq yd'; break;
				
				case 'mm²': unit = 'sq mm'; break;
				case 'cm²': unit = 'sq cm'; break;
				case 'm²': unit = 'sq m'; break;
				case 'km²': unit = 'sq km'; break;
				
				case 'in³': unit = 'cu in'; break;
				case 'ft³': unit = 'cu ft'; break;
				case 'yd³': unit = 'cu yd'; break;
				
				case 'mm³': unit = 'cu mm'; break;
				case 'cm³': unit = 'cu cm'; break;
				case 'm³': unit = 'cu m'; break;
				case 'km³': unit = 'cu km'; break;
				
				case 'cp': unit = 'cup'; break;
				case 'barrel': unit = 'bbl'; break;
			}
		}
		
		value = parseFloat(value);
		
		convertable.data('unit',unit);
		convertable.data('unitValue',value);
		
		output = '';
		
		if(toSystem == 'imperial')
		{
			switch(unit)
			{
				case 'lb':
					
					if(value < 1)
					{
						value *= 16;
						unit = 'oz';
					}
					else if(value >= 1000)
					{
						value *= 0.0005;
						unit = 'ton';
					}
					
					break;
				
				case 'oz':
				
					if(value >= 16 && value < 16000)
					{
						value *= 0.0625;
						unit = 'lb';
					}
					else if(value >= 16000)
					{
						value *= 0.000003125;
						unit = 'ton';
					}
					
					break;
				
				case 'kg':
					
					if(value < 1)
					{
						value *= 35.274;
						unit = 'oz';
					}
					else
					{
						value *= 2.20462;
						unit = 'lb';
					}
					
					break;
					
			/*// Mass
			else if(value.indexOf('gr') >= 0) { unit = 'gr'; }
			else if(value.indexOf('cwt') >= 0) { unit = 'cwt'; }
			
			else if(value.indexOf('g') >= 0) { unit = 'g'; }
			else if(value.indexOf('t') >= 0) { unit = 't'; }
			
			// Length
			else if(value.indexOf('pi') >= 0) { unit = 'pi'; }
			else if(value.indexOf('in') >= 0) { unit = 'in'; }
			else if(value.indexOf('ft') >= 0) { unit = 'ft'; }
			else if(value.indexOf('yd') >= 0) { unit = 'yd'; }
			else if(value.indexOf('mi') >= 0) { unit = 'mi'; }
			
			else if(value.indexOf('mm') >= 0) { unit = 'mm'; }
			else if(value.indexOf('cm') >= 0) { unit = 'cm'; }
			else if(value.indexOf('m') >= 0) { unit = 'm'; }
			else if(value.indexOf('km') >= 0) { unit = 'km'; }
			
			// Area
			else if(value.indexOf('acre') >= 0) { unit = 'acre'; }
			else if(value.indexOf('in³') >= 0 || value.indexOf('sq in') >= 0) { unit = 'sq in'; }
			else if(value.indexOf('ft³') >= 0 || value.indexOf('sq ft') >= 0) { unit = 'sq ft'; }
			else if(value.indexOf('yd²') >= 0 || value.indexOf('sq yd') >= 0) { unit = 'sq yd'; }
			else if(value.indexOf('mm²') >= 0) { unit = 'sq mm'; }
			else if(value.indexOf('cm²') >= 0) { unit = 'sq cm'; }
			else if(value.indexOf('m²') >= 0) { unit = 'sq m'; }
			else if(value.indexOf('km²') >= 0) { unit = 'sq km'; }
			
			// Volume
			else if(value.indexOf('in³') >= 0 || value.indexOf('cu in') >= 0) { unit = 'cu in'; }
			else if(value.indexOf('ft³') >= 0 || value.indexOf('cu ft') >= 0) { unit = 'cu ft'; }
			else if(value.indexOf('yd³') >= 0 || value.indexOf('cu yd') >= 0) { unit = 'cu yd'; }
			else if(value.indexOf('acre ft') >= 0) { unit = 'acre ft'; }
			
			else if(value.indexOf('mm³') >= 0) { unit = 'cu mm'; }
			else if(value.indexOf('cm³') >= 0) { unit = 'cu cm'; }
			else if(value.indexOf('m³') >= 0) { unit = 'cu m'; }
			else if(value.indexOf('km³') >= 0) { unit = 'cu km'; }
			
			// Fluids
			else if(value.indexOf('fl oz') >= 0) { unit = 'fl oz'; }
			else if(value.indexOf('pt') >= 0) { unit = 'pt'; }
			else if(value.indexOf('qt') >= 0) { unit = 'qt'; }
			else if(value.indexOf('gal') >= 0) { unit = 'gal'; }
			else if(value.indexOf('tsp') >= 0) { unit = 'tsp'; }
			else if(value.indexOf('tbsp') >= 0) { unit = 'tbsp'; }
			else if(value.indexOf('cup') >= 0 || value.indexOf('cp') >= 0) { unit = 'cup'; }
			else if(value.indexOf('barrel') >= 0 || value.indexOf('bbl') >= 0) { unit = 'bbl'; }
			
			else if(value.indexOf('ml') >= 0) { unit = 'ml'; }
			else if(value.indexOf('l') >= 0) { unit = 'l'; }*/
				/*case "kg":
					value *= 2.20462;
					unit = 'lb';
					break;*/
				
			}
		}
		else
		{
			switch(unit)
			{
				case "lb":
					value *= 0.453592;
					unit = 'kg';
					break;
				
			}
		}
		
		output = value + ' ' + unit;
		
		convertable.html(output);
	}
}

$(document).ready(function() {
	$.convertUnits();
});