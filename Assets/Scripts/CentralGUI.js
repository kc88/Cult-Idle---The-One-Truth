#pragma strict

//using mechanics control script to perform conversion attempts
var mCon : MechanicsControl;
mCon = gameObject.GetComponent("MechanicsControl");


//these six variables are used in 
private var convSliderVal : float; //percentage of followers converting
private var cashSliderVal : float; //percentage of followers funding
private var disSliderVal : float; //percentage of followers causing authority distraction

//same as above variables, used for detecting changes with sliders. These are variables sent to other scripts to determine rates.
var convSliderNew : float;
var cashSliderNew : float;
var disSliderNew : float;


var suspicionBar : Transform;
var suspicionColor : GameObject;



function Start()
{
	convSliderVal = 33.33;
	cashSliderVal = 33.33;
	disSliderVal = 33.33;
	
	convSliderNew = 33.33;
	cashSliderNew = 33.33;
	disSliderNew = 33.33;
}

function OnGUI()
{
	//creating the area to add GUI buttons, will most likely be replaced with 3d buttons in the future
	GUILayout.BeginArea(Rect(20,40,200,400));
		GUILayout.BeginHorizontal();
			if(GUILayout.Button("Convert",GUILayout.Height(30)))
				{
					mCon.ConversionAttempt();					
				}
		GUILayout.EndHorizontal();
		GUILayout.Space(60);
		convSliderVal = GUILayout.HorizontalSlider(convSliderVal,0.01,100);
		GUILayout.Space(20);
		if (convSliderNew != convSliderVal)
			{	
				convSliderNew = convSliderVal;
				cashSliderVal = (cashSliderNew/(cashSliderNew + disSliderNew))*(100 - convSliderNew);
				disSliderVal = (disSliderNew /(disSliderNew + cashSliderNew))*(100 - convSliderNew);
				if (cashSliderVal == 0)
					cashSliderVal = 0.01;
				if (disSliderVal == 0)
					disSliderVal = 0.01;
				cashSliderNew = cashSliderVal;
				disSliderNew = disSliderVal;
				
			}
		cashSliderVal = GUILayout.HorizontalSlider(cashSliderVal,1,100);
		GUILayout.Space(20);
		if (cashSliderNew != cashSliderVal)
			{
				cashSliderNew = cashSliderVal;
				convSliderVal = (convSliderNew/(convSliderNew + disSliderNew))*(100 - cashSliderNew);
				disSliderVal = (disSliderNew /(disSliderNew + convSliderNew))*(100 - cashSliderNew);
				if (convSliderVal == 0)
					convSliderVal = 0.01;
				if (disSliderVal == 0)
					disSliderVal = 0.01;
				convSliderNew = convSliderVal;
				disSliderNew = disSliderVal;
			}
		disSliderVal = GUILayout.HorizontalSlider(disSliderVal,1,100);
				if (disSliderNew != disSliderVal)
			{
				disSliderNew = disSliderVal;
				cashSliderVal = (cashSliderNew/(cashSliderNew + convSliderNew))*(100 - disSliderNew);
				convSliderVal = (convSliderNew /(convSliderNew + cashSliderNew))*(100 - disSliderNew);
				if (cashSliderVal == 0)
					cashSliderVal = 0.01;
				if (convSliderVal == 0)
					convSliderVal = 0.01;
				cashSliderNew = cashSliderVal;
				convSliderNew = convSliderVal;
			}
		GUILayout.EndArea();
		
		suspicionBar.localScale = Vector3(mCon.percentSuspicion,1,1);

		if (mCon.percentSuspicion >= 0 && mCon.percentSuspicion < 0.2)
			suspicionColor.renderer.material.color = Color.green;
		else if (mCon.percentSuspicion >= 0.2 && mCon.percentSuspicion < 0.6)
			suspicionColor.renderer.material.color = Color.yellow;
		else 
			suspicionColor.renderer.material.color = Color.red;
		/* unused gui area
		GUILayout.BeginArea(Rect(250,100,400,400));
			
		GUILayout.EndArea();
		*/
	 
}