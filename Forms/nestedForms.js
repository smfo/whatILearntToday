When getting values of nested forms

const form = this.formbuilder.group({
    level1: this.formGroup.group({
        level2 : ['value', Validators.required]
    })
})

access level2 values

this.form.get(['level1', 'level2']).setValue('value of level 2');