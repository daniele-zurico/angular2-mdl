import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component} from '@angular/core';
import {
  MdlCheckboxComponent,
  MdlChekboxModule} from './mdl-checkbox.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlCheckbox', () => {

  var doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlChekboxModule, FormsModule ],
      declarations: [ MdlTestCheckboxComponent ],
    });
  }));


  beforeEach(async(inject([DOCUMENT], function (document) {
    doc = document;
  })));

  it('should add the css class mdl-checkbox to the host element', () => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-checkbox')).toBe(true);


  });

  it('should support ngModel', async(() => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let testInstance = fixture.componentInstance;

      // let el = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;
      let checkboxComponent = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).componentInstance;

      testInstance.checkboxValue1 = true;

      fixture.detectChanges();
      fixture.whenStable().then(() => {

        // but el.checked is not true ?
        expect(checkboxComponent.value).toEqual(true);

      });

    });

  }));

  it('should change the value on click', () => {

    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    instance.checkboxValue1 = false;

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.checkboxValue1).toEqual(true);

  });

  it('should mark the component as focused and blured', () => {
    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent('focus', true, true);
    inputEl.dispatchEvent(evt);

    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;
    expect(checkboxEl.classList.contains('is-focused')).toBe(true);

    var evtBlur = doc.createEvent('HTMLEvents');
    evtBlur.initEvent('blur', true, true);
    inputEl.dispatchEvent(evtBlur);

    fixture.detectChanges();
    expect(checkboxEl.classList.contains('is-focused')).toBe(false);

  });

  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestCheckboxComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

});


@Component({
  selector: 'test-icon',
  template: `<mdl-checkbox [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">
              checkbox label
            </mdl-checkbox>
  `,
})
class MdlTestCheckboxComponent {
  public checkboxValue1 = false;

  public onChange(v: boolean) {}
}
