

in onInit/the constructor add this.onChanges()

ngOnChanges(){
    this.form.get('value').valueChanges().subscribe(value => {
        do something
    }) 
}

// This will do somehing every time the value of 'value' changes
// This way, we don't get spammed with outputs whenever any input in the component changes