
XmlAttributeOverrides allows for overriding property, field and class attributes when using the XmlSerializer to serialize or deserialize 
an object. To Worker, it needs a XmlAttribute

XmlAttributes represents a collection of attribute objects that control how the XmlSerializer serializes and deserializes an objects
a xmlAttribute can consist of multiple XmlElementAttributes. These objects are used by the XmlSerializer to override the default
way it SERIALIZES a class


//Creating XmlElementAttributes objects to override attributes applied to the property
var ignoreField = new XmlElementAttribute("Name of field to ignore");
var ignoreField2 = new XmlElementAttribute("Another field to ignore");

//Add the XmlElementAttributes to the XmlAttribute
var attributes = new XmlAttributes();

attributes.XmlElements.Add(ignoreField);
attributes.XmlElements.Add(ignoreField2);

//Add the XmlAttribute to the XmlAttributeOverride, specifying the member to override
var overrides = new XmlAttributeOverrides();
overrides.Add(typeof(OveriddenMember), "name of value to be overidden", attributes)

//create XmlSerializer with the given overrides
var serializer = new XmlSerializer(typeof(OveriddenMember), overrides)