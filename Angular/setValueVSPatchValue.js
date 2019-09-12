
patchValue lets you match your input value to the controls in the form and set the value
of the fields with matching names. while setValue require that you have a new value for all the
fields in the form

loophole! by using get('field name').setValue(newValue) you can set the value of one specific field
patchValue is good for forms where you have a lot of controls and don't want to use getValue
on all of them 


const form = this.formbuilder.group({
    name: [''],
    age: [undefined]
})

const name = {
    name: "me"
}

form.setValue({name: "me", age: 93})
form.setValue({name: "me"})             //not valid
form.get('name').setValue("me")         //valid
form.patchValue(name)
form.patchValue({name: "me"})