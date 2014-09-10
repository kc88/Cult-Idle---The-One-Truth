#pragma strict
//used to perform automatic convert attempts. Based off of number of followers assigned to conversions, as well as individual convert speed

private var needInvoking : boolean;
private var currentConverters : int;
private var currentConvertSpeed : float;

var mCon : MechanicsControl;
mCon = gameObject.GetComponent("MechanicsControl");
var cGUI : CentralGUI;
cGUI = gameObject.GetComponent("CentralGUI");

var cashTimer : float = 1;
var authorityTimer : float = 0.2;


function Start () {
	needInvoking = true;
}

function Update () {
	if(mCon.numFollowers != currentConverters || mCon.numConvertPerSecond != currentConvertSpeed)
		CancelInvoke();
		needInvoking = true;
	if(needInvoking && mCon.numFollowers != 0)
	{
		InvokeRepeating("PerformAttempt",1.0/(mCon.numFollowers * mCon.numConvertPerSecond * cGUI.convSliderNew/100),1.0/(mCon.numFollowers * mCon.numConvertPerSecond * cGUI.convSliderNew/100));
		needInvoking = false;
	}
	
	
	currentConverters = mCon.numFollowers;
	currentConvertSpeed = mCon.numConvertPerSecond;

	cashTimer -= Time.deltaTime;
	authorityTimer -= Time.deltaTime;

	if (cashTimer < 0)
	{
		cashTimer = 1;
		mCon.AddCash(cGUI.cashSliderNew);
	}

	if (authorityTimer < 0)
		{
			authorityTimer = 0.2;
			mCon.AddSuspicion(cGUI.convSliderNew,cGUI.disSliderNew); //sending percent converting, percent distracting
			//this is where suspicion checks
		}
	
}

function PerformAttempt(){
	mCon.FollowConversionAttempt();
}

