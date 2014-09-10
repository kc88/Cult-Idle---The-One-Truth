#pragma strict

var numFollowers : int; // number of followers successfully converted
var numFollowersI : int; // number idle followers
var numFollowersC : int; // number followers working on conversions
var numCash : float; // current cash held
var numMagicka : int; // current magicka possessed
var numConvertPerSecond : float; //number of automatic conversion attempts per second

var percentConvert : float; //convert success percentage
var percentRetain : float; //convert retain percentage
var percentIncome : float; //follower income percentage
var percentFollowerConvert : float; //follower convert success percentage, needs implementation

var percentSuspicion : float; //see below

/*
authority suspicion level: from 0-100%
	0-20% - light suspicion, no retention debuff.
	20-60% - moderate suspicion, light retention debuff.
	60%-99.9% - high suspicion, moderate retention debuff.
	100% - critical suspicion, heavy retention debuff and forced ascension.
*/


var followerSalary : float; //salary each working follower recieves each increment (1 second)

/*OBSOLETE:
var FollowConvertPerSecont : float; //number conversion attempts per second

*/

function Start () {
	// need to check previously saved numbers when that is implemented
	// currently being used to set initial percentages, etc
	percentConvert = 0.3;
	percentFollowerConvert = 0.1;
	numConvertPerSecond = 0.1;
	followerSalary = 1;
}

function Update () {

	
}

function ConversionAttempt () { //checks successfull conversion (follower gain) using convert rate and random number gen
	if (percentConvert > Random.value)
	{
		numFollowers ++;
		
	}
}
function FollowConversionAttempt(){ //same as ConversionAttempt, but called automatically based on number of followers
	if (percentFollowerConvert > Random.value)
	{
		numFollowers ++;
	}
}
function AddCash(followPercent : int){ //adds cash based on current follower salary, number of followers, and % working on income
	numCash = numCash + (followerSalary * numFollowers * followPercent/100);
}

function AddSuspicion(pC:float,pD:float){ //will be used to add to suspicion percentage
	percentSuspicion = percentSuspicion + (numFollowers*(2*pC-pD)/100000);
	if (percentSuspicion < 0)
		{
			percentSuspicion = 0;
		}
	if (percentSuspicion > 1)
		{
			percentSuspicion = 1;
		}
}