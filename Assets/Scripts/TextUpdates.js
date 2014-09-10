#pragma strict
//used to update values of visible text fields with current player stats
var followerText : TextMesh;
var cashText: TextMesh;
var magText: TextMesh;

var convPercent : TextMesh;
var cashPercent : TextMesh;
var disPercent : TextMesh;
var mCon : MechanicsControl;
var cGUI : CentralGUI;
mCon = gameObject.GetComponent("MechanicsControl");
cGUI = gameObject.GetComponent("CentralGUI");

function Start () {

}

function Update () {
	followerText.text =  mCon.numFollowers.ToString();
	convPercent.text = cGUI.convSliderNew.ToString("F1");
	cashPercent.text = cGUI.cashSliderNew.ToString("F1");
	disPercent.text = cGUI.disSliderNew.ToString("F1");
	cashText.text = mCon.numCash.ToString("F2");
	
}

