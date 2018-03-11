"use strict";
/*
 Tyler Green
 CISC 131
 12-09-2014
 Game of Life
*/
window.onload=function()
{
	var gameBoardArray;
	var tempArray;
	var i;
	var j;
	gameBoardArray=create2dArray(50,50,getDeadValue());
	tempArray=copy2dArray(gameBoardArray);
	createGameBoard(document.getElementById("gameBoard"),gameBoardArray);
	createFirstGeneration(gameBoardArray);
	for(i=0;i<gameBoardArray.length;i++)
	{
		for(j=0;j<gameBoardArray[i].length;j++)
		{
			if(gameBoardArray[i][j]===getDeadValue())
			{
				document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
			}
			if(gameBoardArray[i][j]===getLiveValue())
			{
				document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
			}
		}
	}
	window.setInterval(function(){applyRules(gameBoardArray,tempArray)},1000);
};

function applyRules(array2d,tempArray)
{
	var i;
	var j;
	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d[i].length;j++)
		{
			tempArray[i][j]=countLivingNeighborsOf(array2d,i,j);
		}
	}
	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d[i].length;j++)
		{
			if(array2d[i][j]===getLiveValue())
			{
			    if(tempArray[i][j]<2)
			    {
				    array2d[i][j]=getDeadValue();
			    }
			    if(tempArray[i][j]>3)
			    {
				    array2d[i][j]=getDeadValue();
			    }
			}
			if(array2d[i][j]===getDeadValue())
			{
			    if(tempArray[i][j]===3)
			    {
				    array2d[i][j]=getLiveValue();
			    }
			}
		}
	}
	for(i=0;i<array2d.length;i++)
		{
			for(j=0;j<array2d[i].length;j++)
			{
				if(array2d[i][j]===getDeadValue())
				{
					document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
				}
				if(array2d[i][j]===getLiveValue())
				{
					document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
				}
			}
	     }
}

function countLivingNeighborsOf(array2d,row,col)
{
	var result;
	result=0;
	if(isInArray(array2d,row-1,col-1)===true && array2d[row-1][col-1]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row-1,col)===true && array2d[row-1][col]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row-1,col+1)===true && array2d[row-1][col+1]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row,col-1)===true && array2d[row][col-1]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row,col+1)===true && array2d[row][col+1]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row+1,col-1)===true && array2d[row+1][col-1]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row+1,col)===true && array2d[row+1][col]===getLiveValue())
	{
		result=result+1;
	}
	if(isInArray(array2d,row+1,col+1)===true && array2d[row+1][col+1]===getLiveValue())
	{
		result=result+1;
	}
	return result;
}

function createFirstGeneration(array2d)
{
	var i;
	var j;
	var row;
	var col;

	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d[i].length;j++)
		{
			if(i===j || i==j || (i+j)%2===0)
			{
				array2d[i][j]=getLiveValue();
			}
		}
	}
}

function createGameBoard(containerElement, array2d)
{
	var row;
	var col;
	var i;
	var datClass;
	var html;
	html="";
	datClass="";
	row=0;
	col=0;
	for(i=0;i<array2d.length*array2d.length;i++)
	{
		datClass="cell";
		if(row===0 && col<array2d.length)
		{
			datClass=datClass+" firstRow";
		}
		if(col===array2d.length-1)
		{
			datClass=datClass+" lastColumn";
		}
		if(col===array2d.length)
		{
			datClass=datClass+" newRow";
			row=row+1;
			col=0;
		}
		html=html+createHTMLElement("div","r"+row+"c"+col,datClass,null);
		col=col+1;
	}
	containerElement.innerHTML=html;
}

function copy2dArray(array)
{
	var thatArray
	var i;
	var j;
	thatArray= new Array(array.length)
	for(i=0;i<array.length;i++)
	{
		thatArray[i]=new Array(array[i].length);
	}
	for(i=0;i<array.length;i++)
	{
		for(j=0;j<array[i].length;j=j+1)
		{
			thatArray[i][j]=array[i][j];
		}
	}
	return thatArray;
}

function create2dArray(rows,columns,initialValue)
{
	var array;
	var i;
	var j;
	array=new Array(rows);
	for(i=0;i<array.length;i++)
	{
		array[i]=new Array(columns);
	}
    for(i=0;i<array.length;i++)
	{
		for(j=0;j<array[i].length;j=j+1)
		{
			array[i][j]=initialValue;
		}
	}
	return array;
}

function getDeadValue()
{
	return 0;
}

function getLiveValue()
{
	return 1;
}

function isAlive(cell)
{
	return(cell===getLiveValue());
}

function getLiveColor()
{
	return "red";
}

function getDeadColor()
{
	return "black";
}

function isInArray(array2d,row,col)
{
	return(row>=0 && row<array2d.length && col<array2d[0].length && col>=0);
}

function trim(data)
{
	var whitespace;
	var start;
	var end;
	var result;
    if(typeof data==="string")   //first if
    {
		whitespace=" \n\r\t\f";
		start=0;
		while(start<data.length && whitespace.indexOf(data.charAt(start))>=0) //first while
		{
			start=start+1;
		}
		end=data.length-1;
		while(end>=0 && whitespace.indexOf(data.charAt(end))>=0)   //second while
		{
			end=end-1;
		}
		if(end<start)    //second if
		{
			result="";
		}
		else         //else to second if
		{
			result= data.substring(start,end+1);
		}

	}
	else
	{
		result=data;
	}
return result;
}

function createHTMLElement(elementType, id, classInfo, content)
{



	if(elementType===null)  //div or span
	{
		elementType="";
	}
	else
	{
		elementType=trim(elementType);
	}

	if(trim(id)===null)  //id
	{
		id="";
	}
	else
	{
		id=" id=" + '"' + trim(id)+ '"';
		if(trim(id).length===0)
		{
			id="";
		}
	}
	if(trim(classInfo)===null)   //classinfo
	{
		classInfo="";
	}
	else
	{
        classInfo=" class=" + '"' + trim(classInfo)+ '"';
		if(trim(classInfo).length===0)
		{
			classInfo="";
		}
	}
	if(content===null)     //content
    {
		content="";
	}

	return "<" + elementType + id + classInfo + ">" + content +"</" + elementType + ">";
}