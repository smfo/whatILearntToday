
# Bootstrap dialog

Need a ng-template to open

## Options
Pass options as the second parameter to the `.open()` function.

Prevent dialog from closing when clicking the background.
```js
let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
};

const modalRef = this.modalService.open(NgbdModalContent, ngbModalOptions);
```