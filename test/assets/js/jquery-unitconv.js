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
		
		/*
		 * If no unit is defined, try to auto-detect it from the value
		 */
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
			else if(value.indexOf('in²') >= 0 || value.indexOf('sq in') >= 0) { unit = 'sq in'; }
			else if(value.indexOf('ft²') >= 0 || value.indexOf('sq ft') >= 0) { unit = 'sq ft'; }
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
		/*
		 * If the type is already known, convert alternative unit names
		 * to a common name
		 */
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
		
		/*
		 * Write it back to the element
		 */
		convertable.data('unit',unit);
		convertable.data('unitValue',value);
		
		/*
		 * Now convert them to the smallest possible value of their category
		 */
		
		switch(unit)
		{
			/*
			 * Mass (convert everything to grams)
			 */
			case "lb":
				value *= 453.592;
				unit = "g";
				break;
			
			case "oz":
				value *= 28.3495;
				unit = "g";
				break;
			
			case "gr":
				value *= 0.06479891;
				unit = "g";
				break;
			
			case "cwt":
				value *= 45359.2;
				unit = "g";
				break;
			
			case "kg":
				value *= 1000;
				unit = "g";
				break;
			
			case "t":
				value *= 1000000;
				unit = "g";
				break;
			
			/*
			 * Length (convert to mm)
			 */
			
			//case "pi":
			case "in":
				value *= 25.4;
				unit = "mm";
				break;
			
			case "ft":
				value *= 304.8;
				unit = "mm";
				break;
			
			case "yd":
				value *= 914.4;
				unit = "mm";
				break;
			
			case "mi":
				value *= 1609344;
				unit = "mm";
				break;
			
			case "cm":
				value *= 10;
				unit = "mm";
				break;
			
			case "m":
				value *= 1000;
				unit = "mm";
				break;
			
			case "km":
				value *= 1000000;
				unit = "mm";
				break;
			
			/*
			 * Area (convert to m²)
			 */
				
			case "acre":
				value *= 4.04685642*Math.pow(10,9);
				unit = "sq mm";
				break;
			
			case "sq in":
				value *= 645.16;
				unit = "sq mm";
				break;
			
			case "sq ft":
				value *= 92903.04;
				unit = "sq mm";
				break;
			
			case "sq yd":
				value *= 836127.36;
				unit = "sq mm";
				break;
			
			case "sq cm":
				value *= 100;
				unit = "sq mm";
				break;
			
			case "sq m":
				value *= 1000000;
				unit = "sq mm";
				break;
			
			case "sq km":
				value *= 1000000000000;
				unit = "sq mm";
				break;
			
			/*
			 * Volume (convert to cu mm)
			 */
			
			case "cu in":
				value *= 16387.064;
				unit = "cu mm";
				break;
			
			case "cu ft":
				value *= 28316846.6;
				unit = "cu mm";
				break;
			
			case "cu yd":
				value *= 764554858;
				unit = "cu mm";
				break;
			
			case "acre ft":
				value *= 1.23348184*Math.pow(10,12);
				unit = "cu mm";
				break;
			
			case "cu cm":
				value *= 1000;
				unit = "cu mm";
				break;
			
			case "cu m":
				value *= 1000000000;
				unit = "cu mm";
				break;
			
			case "cu km":
				value *= 1.0*Math.pow(10,18);
				unit = "cu mm";
				break;
			
			/*
			 * Fluids (convert to ml)
			 */
			
			case "fl oz":
				value *= 29.5735;
				unit = "ml";
				break;
			
			case "pt":
				value *= 473.176;
				unit = "ml";
				break;
			
			case "qt":
				value *= 946.353;
				unit = "ml";
				break;
			
			case "gal":
				value *= 3785.41;
				unit = "ml";
				break;
			
			case "tsp":
				value *= 4.92892;
				unit = "ml";
				break;
			
			case "tbsp":
				value *= 14.7868;
				unit = "ml";
				break;
			
			case "cup":
				value *= 236.588;
				unit = "ml";
				break;
			
			case "bbl":
				value *= 119240.471;
				unit = "ml";
				break;
			
			case "l":
				value *= 1000;
				unit = "ml";
				break;
		}
		
		
		output = '';
		
		if(toSystem == 'imperial')
		{
			switch(unit)
			{
				case "g":
					
					if(value < 1)
					{
						value *= 15.4323584;
						unit = "gr";
					}
					else if(value < 453.592)
					{
						value *= 0.035274;
						unit = "oz";
					}
					else if(value < 45359.2)
					{
						value *= 0.00220462;
						unit = "lb";
					}
					else
					{
						value *= 0.0000110231;
						unit = "cwt";
					}
					
					break;
				
				case "mm":
					
					break;
					
				case "ml":
					
					break;
					
				case "sq mm":
					
					break;
				
				case "cu mm":
					
					break;
			}
		}
		else
		{
			
		}
		
		output = value + ' ' + unit;
		
		convertable.html(output);
	}
}

$(document).ready(function() {
	$.convertUnits();
});