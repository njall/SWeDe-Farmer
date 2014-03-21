<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<!-- saved from url=(0046)http://www.datamech.com/XMLForm/XMLForm0004.pl -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta content="www.datamech.com" name="GENERATOR">
<title>WebService</title>
<style type="text/css">
body { margin-top: 0; padding-top:0; }
div#menuForm { overflow: hidden; background-color: #FFFFC6; border: 2px solid yellow; position: fixed; padding: 2px; Z-index: 1000; height: 45px; left: 0; right: 0; }
div#xmlForm { padding: 10px 10px 0 10px; width: 100%; padding-top: 55px; left: 5px; right: 5px; }
@media print { div#menuForm { display:none; } div#xmlForm { padding-top: 0; } input#submit { display:none; } }
</style>
<style type="text/css">
.XMLattribute { margin-left: 10px; font-style: italic; }
</style>
<style type="text/css"></style></head>
<body onload="editorSetup();" onhelp="helpSelected();" style="">
<script type="text/javaScript" src="./WebService_files/moreEdit4.js"></script>
<div id="menuForm"><form name="menuForm" onclick="clickFormBody(this, event);">
  <select name="edit" size="1" onchange="menuChosen(this);">
  <option selected="selected" value="">Edit</option>
  <option value="-" disabled="">--------------------</option>
  <option value="duplicateSelected">Duplicate</option>
  <option value="clearSelected">Clear Selected Fields</option>
  <option value="nilSelected">Nil</option>
  <option value="-" disabled="">--------------------</option>
  <option value="cutSelected">Cut</option>
  <option value="copySelected">Copy</option>
  <option value="pasteReplaceSelected">Paste</option>
  <option value="pasteBeforeSelected">Paste Before Selected</option>
  <option value="pasteAfterSelected">Paste After Selected</option>
  <option value="pasteIntoSelected">Paste Into Selected</option>
  <option value="-" disabled="">--------------------</option>
  <option value="snapShot">Take Snap Shot</option>
  <option value="makeXML">Generate XML</option>
  <option value="-" disabled="">--------------------</option>
  <option value="showPreference">Preferences...</option>
<!--
  <option value="showSchema">Schema...</option>
--> 
  </select>
  <select name="operation" size="1" onchange="menuChosen(this);">
  <option selected="selected" value="">Operate on Selection</option>
  <option value="-" disabled="">--------------------</option>
  <option value="expandSelected">Expand</option>
  <option value="collapseSelected">Collapse</option>
  <option value="-" disabled="">--------------------</option>
  <option value="sortSelectedKey">Use as Key and Sort</option>
  <option value="verifySelected">Verify Against Schema</option>
  <option value="aboutSelected">Help</option>
  <option value="-" disabled="">--------------------</option>
  <option value="becomeTextarea">Use Text Area for Input</option>
  <option value="becomeTextfield">Use Text Field for Input</option>
  <option value="becomeSelectList">Use Select List for Input</option>
  <option value="becomeRadioButton">Use Radio Buttons for Input</option>
<!-- 
  <option value="test">test</option>
-->
  </select>
    <select name="elementsMenu" size="1" class="formMenu" onchange="makeElementChosen(this);">
      <option selected="selected" value="">Make Element in Scrap</option>
      <option value="-" disabled="disabled">--------------------</option>
      <option value="XMLcomplexContent">New Complex Element</option>
      <option value="-" disabled="disabled">--------------------</option>
      <option value="#Examples">Examples</option>
      <option value="#IPRDeclarations">IPRDeclarations</option>
      <option value="#Function">Function</option>
      <option value="#Organisation">Organisation</option>
      <option value="#Citation">Citation</option>
      <option value="#Licenses">Licenses</option>
      <option value="#Author">Author</option>
      <option value="#Copyright">Copyright</option>
      <option value="#License">License</option>
      <option value="#Authors">Authors</option>
      <option value="#GlobalDescription">GlobalDescription</option>
      <option value="#Example">Example</option>
      <option value="#Disclaimers">Disclaimers</option>
      <option value="#Sections">Sections</option>
      <option value="#Representation">Representation</option>
      <option value="#PersonName">PersonName</option>
      <option value="#Acknowledgements">Acknowledgements</option>
      <option value="#Projects">Projects</option>
      <option value="#TechnologyCategories">TechnologyCategories</option>
      <option value="#WebService">WebService</option>
      <option value="#IPRDeclaration">IPRDeclaration</option>
      <option value="#TermsOfUseStatements">TermsOfUseStatements</option>
      <option value="#Copyrights">Copyrights</option>
      <option value="#Acknowledgement">Acknowledgement</option>
      <option value="#ScientificCategories">ScientificCategories</option>
      <option value="#AtomisedName">AtomisedName</option>
      <option value="#Citations">Citations</option>
      <option value="#EmailAddresses">EmailAddresses</option>
      <option value="#Functions">Functions</option>
      <option value="#IPRStatements">IPRStatements</option>
      <option value="#OrgUnits">OrgUnits</option>
      <option value="#TermsOfUse">TermsOfUse</option>
      <option value="#Project">Project</option>
      <option value="#Name">Name</option>
      <option value="#Description">Description</option>
      <option value="#Disclaimer">Disclaimer</option>
      <option value="-" disabled="disabled">--------------------</option>
      <option value="XMLsimpleContent">New Simple Element</option>
      <option value="-" disabled="disabled">--------------------</option>
      <option value="#Section">Section</option>
      <option value="#EmailAddress">EmailAddress</option>
      <option value="!Abbreviation">Abbreviation</option>
      <option value="!PreferredName">PreferredName</option>
      <option value="!Text">Text</option>
      <option value="!Type">Type</option>
      <option value="!GUIURL">GUIURL</option>
      <option value="!Request">Request</option>
      <option value="!SortingName">SortingName</option>
      <option value="!URI">URI</option>
      <option value="!BaseURL">BaseURL</option>
      <option value="!TechnicalDocumentationURL">TechnicalDocumentationURL</option>
      <option value="!InheritedName">InheritedName</option>
      <option value="!Comment">Comment</option>
      <option value="!Response">Response</option>
      <option value="!ProjectTitle">ProjectTitle</option>
      <option value="!Details">Details</option>
      <option value="!Prefix">Prefix</option>
      <option value="!Suffix">Suffix</option>
      <option value="!GivenNames">GivenNames</option>
      <option value="!OrgUnit">OrgUnit</option>
      <option value="!Category">Category</option>
      <option value="!Name">Name</option>
      <option value="!FullName">FullName</option>
      <option value="-" disabled="disabled">--------------------</option>
      <option value="XMLattribute">New Attribute;</option>
      <option value="-">--------------------</option>
      <option value="@xmlns">xmlns</option>
      <option value="@SectionTitle">SectionTitle</option>
      <option value="@xmlns:xsi">xmlns:xsi</option>
      <option value="@preferred">preferred</option>
      <option value="@xsi:schemaLocation">xsi:schemaLocation</option>
    </select>
<script type="text/javascript">
<!--
  function setUpPreference() {
    var preference=document.preference;
    // begin preference
    preference.radioIndex=1;
    preference.breaktag=0;
    preference.isLargeSchema="true";
    preference.checkSchema=false;
    preference.obeySchema=false;
    // end preference
  }

  function setUpSchemaInfo() {
    // begin schema
setSchema('@xmlns:xsi',{'#dt':'#string'});
setSchema('@SectionTitle',{'#dt':'#string'});
setSchema('@preferred',{'#dt':'#string'});
setSchema('@xsi:schemaLocation',{'#dt':'#string'});
setSchema('@xmlns',{'#dt':'#string'});
    // end schema
  }
-->
</script>
  <br>
  <input type="checkbox" name="multiple" value="multiple">repeat operation
</form></div>
<div id="xmlForm"><form name="xmlForm" action="http://www.datamech.com/XMLForm/formXML0200.pl?.df=html" target="_blank" onsubmit="return outputToWindow(this)" onclick="clickFormBody(this, event);" method="post">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);" style="">
<fieldset class="WebService">
<legend>- WebService</legend>
<input type="hidden" value="WebService" name=".tg">
<input type="hidden" name="@xmlns:xsi" value="http://www.w3.org/2001/XMLSchema-instance">
<input type="hidden" name="@xsi:schemaLocation" value="http://www.example.org web_service_schema.xsd">
<span class="XMLattribute" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="xmlns">
<label>xmlns: </label>
<input type="text" class="xmlns" name="@xmlns" value="http://www.example.org" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="BaseURL">
<label>BaseURL: </label>
<input type="text" class="BaseURL" name="BaseURL" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Name">
<label>Name: </label>
<input type="text" class="Name" name="Name" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Type">
<label>Type: </label>
<input type="text" class="Type" name="Type" value="SOAP" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="TechnicalDocumentationURL">
<label>TechnicalDocumentationURL: </label>
<input type="text" class="TechnicalDocumentationURL" name="TechnicalDocumentationURL" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="GUIURL">
<label>GUIURL: </label>
<input type="text" class="GUIURL" name="GUIURL" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Projects">
<legend>- Projects</legend>
<input type="hidden" value="Projects" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Project">
<legend>- Project</legend>
<input type="hidden" value="Project" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="ProjectTitle">
<label>ProjectTitle: </label>
<input type="text" class="ProjectTitle" name="ProjectTitle" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Organisation">
<legend>- Organisation</legend>
<input type="hidden" value="Organisation" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Name">
<legend>- Name</legend>
<input type="hidden" value="Name" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Representation">
<legend>- Representation</legend>
<input type="hidden" value="Representation" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Abbreviation">
<label>Abbreviation: </label>
<input type="text" class="Abbreviation" name="Abbreviation" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Representation" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Name" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="OrgUnits">
<legend>- OrgUnits</legend>
<input type="hidden" value="OrgUnits" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="OrgUnit">
<label>OrgUnit: </label>
<input type="text" class="OrgUnit" name="OrgUnit" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/OrgUnits" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Organisation" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Project" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Projects" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Authors">
<legend>- Authors</legend>
<input type="hidden" value="Authors" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Author">
<legend>- Author</legend>
<input type="hidden" value="Author" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="PersonName">
<legend>- PersonName</legend>
<input type="hidden" value="PersonName" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="FullName">
<label>FullName: </label>
<input type="text" class="FullName" name="FullName" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="SortingName">
<label>SortingName: </label>
<input type="text" class="SortingName" name="SortingName" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="AtomisedName">
<legend>- AtomisedName</legend>
<input type="hidden" value="AtomisedName" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="InheritedName">
<label>InheritedName: </label>
<input type="text" class="InheritedName" name="InheritedName" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Prefix">
<label>Prefix: </label>
<input type="text" class="Prefix" name="Prefix" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Suffix">
<label>Suffix: </label>
<input type="text" class="Suffix" name="Suffix" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="GivenNames">
<label>GivenNames: </label>
<input type="text" class="GivenNames" name="GivenNames" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="PreferredName">
<label>PreferredName: </label>
<input type="text" class="PreferredName" name="PreferredName" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/AtomisedName" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/PersonName" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="EmailAddresses">
<legend>- EmailAddresses</legend>
<input type="hidden" value="EmailAddresses" name=".tg">
<div class="XMLsimpleContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="EmailAddress">
<label>EmailAddress: </label>
<input type="text" class="EmailAddress" name="EmailAddress" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLattribute" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="preferred">
<label>preferred: </label>
<input type="text" class="preferred" name="@preferred" value="true" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
</div>
<input type="hidden" value="/EmailAddresses" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Organisation">
<legend>- Organisation</legend>
<input type="hidden" value="Organisation" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Name">
<legend>- Name</legend>
<input type="hidden" value="Name" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Representation">
<legend>- Representation</legend>
<input type="hidden" value="Representation" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Abbreviation">
<label>Abbreviation: </label>
<input type="text" class="Abbreviation" name="Abbreviation" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Representation" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Name" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="OrgUnits">
<legend>- OrgUnits</legend>
<input type="hidden" value="OrgUnits" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="OrgUnit">
<label>OrgUnit: </label>
<input type="text" class="OrgUnit" name="OrgUnit" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/OrgUnits" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Organisation" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Author" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Authors" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="IPRStatements">
<legend>- IPRStatements</legend>
<input type="hidden" value="IPRStatements" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="IPRDeclarations">
<legend>- IPRDeclarations</legend>
<input type="hidden" value="IPRDeclarations" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="IPRDeclaration">
<legend>- IPRDeclaration</legend>
<input type="hidden" value="IPRDeclaration" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/IPRDeclaration" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/IPRDeclarations" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Copyrights">
<legend>- Copyrights</legend>
<input type="hidden" value="Copyrights" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Copyright">
<legend>- Copyright</legend>
<input type="hidden" value="Copyright" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Copyright" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Copyrights" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Licenses">
<legend>- Licenses</legend>
<input type="hidden" value="Licenses" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="License">
<legend>- License</legend>
<input type="hidden" value="License" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/License" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Licenses" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="TermsOfUseStatements">
<legend>- TermsOfUseStatements</legend>
<input type="hidden" value="TermsOfUseStatements" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="TermsOfUse">
<legend>- TermsOfUse</legend>
<input type="hidden" value="TermsOfUse" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/TermsOfUse" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/TermsOfUseStatements" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Disclaimers">
<legend>- Disclaimers</legend>
<input type="hidden" value="Disclaimers" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Disclaimer">
<legend>- Disclaimer</legend>
<input type="hidden" value="Disclaimer" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Disclaimer" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Disclaimers" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Acknowledgements">
<legend>- Acknowledgements</legend>
<input type="hidden" value="Acknowledgements" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Acknowledgement">
<legend>- Acknowledgement</legend>
<input type="hidden" value="Acknowledgement" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Acknowledgement" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Acknowledgements" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Citations">
<legend>- Citations</legend>
<input type="hidden" value="Citations" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Citation">
<legend>- Citation</legend>
<input type="hidden" value="Citation" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Text">
<label>Text: </label>
<input type="text" class="Text" name="Text" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Details">
<label>Details: </label>
<input type="text" class="Details" name="Details" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="URI">
<label>URI: </label>
<input type="text" class="URI" name="URI" value="http://www.altova.com/" size="70" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Citation" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Citations" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/IPRStatements" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="GlobalDescription">
<legend>- GlobalDescription</legend>
<input type="hidden" value="GlobalDescription" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Sections">
<legend>- Sections</legend>
<input type="hidden" value="Sections" name=".tg">
<div class="XMLsimpleContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Section">
<label>Section: </label>
<input type="text" class="Section" name="Section" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLattribute" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="SectionTitle">
<label>SectionTitle: </label>
<input type="text" class="SectionTitle" name="@SectionTitle" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
</div>
<input type="hidden" value="/Sections" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/GlobalDescription" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Functions">
<legend>- Functions</legend>
<input type="hidden" value="Functions" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Function">
<legend>- Function</legend>
<input type="hidden" value="Function" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Name">
<label>Name: </label>
<input type="text" class="Name" name="Name" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Description">
<legend>- Description</legend>
<input type="hidden" value="Description" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Sections">
<legend>- Sections</legend>
<input type="hidden" value="Sections" name=".tg">
<div class="XMLsimpleContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);"><span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Section">
<label>Section: </label>
<input type="text" class="Section" name="Section" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLattribute" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="SectionTitle">
<label>SectionTitle: </label>
<input type="text" class="SectionTitle" name="@SectionTitle" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
</div>
<input type="hidden" value="/Sections" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Description" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Examples">
<legend>- Examples</legend>
<input type="hidden" value="Examples" name=".tg">
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="Example">
<legend>- Example</legend>
<input type="hidden" value="Example" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Request">
<label>Request: </label>
<input type="text" class="Request" name="Request" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Response">
<label>Response: </label>
<input type="text" class="Response" name="Response" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Comment">
<label>Comment: </label>
<input type="text" class="Comment" name="Comment" value="a" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/Example" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Examples" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Function" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/Functions" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="ScientificCategories">
<legend>- ScientificCategories</legend>
<input type="hidden" value="ScientificCategories" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Category">
<label>Category: </label>
<input type="text" class="Category" name="Category" value="text" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/ScientificCategories" name=".tg">
</fieldset>
</div>
<div class="XMLcomplexContent" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<fieldset class="TechnologyCategories">
<legend>- TechnologyCategories</legend>
<input type="hidden" value="TechnologyCategories" name=".tg">
<span class="XMLsimpleType" onclick="selectelm(this, event);" ondblclick="selectelm(this, event);">
<span class="Category">
<label>Category: </label>
<input type="text" class="Category" name="Category" value="text" onfocus="focusGained(this)" onchange="textChanged(this)"></span>
<br></span>
<input type="hidden" value="/TechnologyCategories" name=".tg">
</fieldset>
</div>
<input type="hidden" value="/WebService" name=".tg">
</fieldset>
</div>
<p><input id="submit" type="submit" value="Generate XML"></p>
</form></div>


<div id="window-resizer-tooltip" style="display: block;"><a href="http://www.datamech.com/XMLForm/XMLForm0004.pl#" title="Edit settings" style="background-image: url(chrome-extension://kkelicaakdanhinjdeammmilcgefonfh/images/icon_19.png);"></a><span class="tooltipTitle">Window size: </span><span class="tooltipWidth" id="winWidth">1366</span> x <span class="tooltipHeight" id="winHeight">728</span><br><span class="tooltipTitle">Viewport size: </span><span class="tooltipWidth" id="vpWidth">1366</span> x <span class="tooltipHeight" id="vpHeight">600</span></div></body></html>