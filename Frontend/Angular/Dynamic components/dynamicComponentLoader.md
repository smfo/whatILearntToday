# Dynamic component loader

Used when it is not practical to use a template with a static component structure. In this case we want to add components dynamically.

## Anchor directive
Need to define where the components will be inserted, this is done using an anchor directive inserted in the components view.

```JS
// cirective that will host the dynamic elements
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[template-host]'
})
export class TemplateHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
```

The ViewContainerRef is injected to get access to the view container of the element that will host the dynamic component(s?).

The directive selector has to be applied to the element where the view container is created.
```JS
@Component({
  selector: 'app-template-host',
  //using the anchor directive (template-host)
  template: '<ng-template template-host></ng-template>'
})
```

This is where angular will dynamically load the components.

## Loading the components

get an array of components to load dynamically

```JS
//import the anchor directive instance from the view
  @ViewChild(TemplateHostDirective) pageTemplateHost: TemplateHostDirective;

private loadPage(params) {
    //access the view container of the anchor directive to load components here
    const vcr = this.pageTemplateHost.viewContainerRef;

    //Get data about the component from service
    this.displayService.getDisplayPage(id, page).takeUntil(this.subscriptionDestroyer).subscribe(displayPage => {
      vcr.clear();

      try {
        //where templateTypes[displayPage.template] is the dynamic component
        //create an instance of the component
        const cf = this.componentFactoryResolver.resolveComponentFactory(templateTypes[displayPage.template]);

        //add the chosen component to the view container of the anchor directive
        const cr = vcr.createComponent(cf);
        (<TemplateAbstractPage>cr.instance).getPageConfig(id, page);
      } catch (error) { }

    });
```

# Simpler example

Want to load new adds every 3 seconds

Anchor directive

```JS
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
```

The component where everything happens

```JS
@Component({
  selector: 'app-template-host',
  //Using the anchor directive
  template: `
            <div class="ad-banner-example">
              <h3>Advertisements</h3>
              <ng-template adHost></ng-template>
            </div>
          `
})

export class AdBannerComponent implements OnInit, OnDestroy {
    // adds to create
  @Input() ads: AdItem[];
  currentAdIndex = -1;

  // anchor directive
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.loadNewAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    //chose the next add using some maths
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    //current component to load
    const adItem = this.ads[this.currentAdIndex];

    //creates an instance of the component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    //creating view container ref
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    //add the component(of type AdComponent) to the view container
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  loadNewAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
```
