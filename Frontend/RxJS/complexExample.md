```js
private addSite() {
    this.dataExplorerService.site().pipe(
      tap(site => this.downloadForm.get(SITE_FORM_FIELD).setValue(site.id)),
      // Use mergeMap here in order for the call and the pipe to run. This is a lazy observable as well, so if we had used a non highorder operator we whould have to subscribe to the http call to get it to run
      mergeMap(site => this.dataExportService.devicesBySite(site.id).pipe(
        tap(devices => this.deviceList = devices),
      )),//.subscribe, this is not needed because mergeMap subscribes for us
    ).subscribe(res => this.addDevices())
  }

  private addDevices() {
    this.dataExplorerService.devices().pipe(
      tap(devices => this.downloadForm.get(DEVICE_FORM_FIELD).setValue(devices)),
      // As devices is a list of observables and we want to execute operations on all of them seperatly, we use from() to convert the seperate elements to observables instead of of() that would only produce one observable
      mergeMap(devices => from(devices).pipe(
        tap(device => this.deviceList = this.deviceList.filter(listItem => listItem.id !== device.id)),
        mergeMap(device =>
          this.dataExportService.parametersByDevice(device.id).pipe(
            tap(params => {
              if (params !== []) {

                const currentParameterOptions = this.parameters;

                var newParameterOptions;

                if (currentParameterOptions !== undefined) {
                  newParameterOptions = params.concat(currentParameterOptions);
                } else {
                  newParameterOptions = params;
                }

                this.parameters = this.sortListByProperty(newParameterOptions, PARAMETER_SORT_FIELD);
              }
            }))
        ),
        // Finalize runs when all the device observables have reached this point. If we called addParameters from a subscribe instead, that would be called when the first observable finished
        finalize(() => this.addParameters())
      ))//.subscribe
    ).subscribe()
  }

  private addParameters() {
    this.dataExplorerService.parameters().pipe(
      tap(parameters => this.downloadForm.get(PARAMETERS_FORM_FIELD).setValue(parameters)),
      mergeMap(parameters => from(parameters).pipe(
        tap(parameter => this.parameters = this.parameters.filter(listItem => listItem.parameterId !== parameter.parameterId))
      ))
    ).subscribe(res => console.log('params finished'))
  }
```