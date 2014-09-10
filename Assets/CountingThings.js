#pragma strict
//obsolete, not in use
var followers: int;
var followText: TextMesh;
var addbutton: Transform;
var mouseup : boolean;
var mousepos : Vector3;
var screenmpos : Vector3;
function Start () {
}

function Update () {
	screenmpos = Input.mousePosition;
	mousepos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	if (Input.GetMouseButtonDown(0)){
		followers++;
		followText.text = followers.ToString();
	}
	
}
