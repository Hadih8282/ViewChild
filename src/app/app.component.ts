import { Component, ViewEncapsulation, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { IncComponent } from './inc/inc.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'viewChild';
  htmlTest = '<img src=xxx onerror="alert(\'xss attack\')">';
  @ViewChild('par', { static: true, read: ElementRef }) par!: ElementRef;
  @ViewChild(IncComponent, { static: true, read: IncComponent }) incComp!: IncComponent;
  @ViewChildren(IncComponent, { read: IncComponent }) incComps!: QueryList<IncComponent>;

  constructor(private renderer: Renderer2) {}

  public ngOnInit() {
    console.log(this.par.nativeElement.innerHTML);
    console.log(this.incComp);
    this.incComp.increment();
    // this.par.nativeElement.innerHTML = this.htmlTest;
    // this.par.nativeElement.style.color = 'purple'; Kamelan Ghalat
    this.renderer.setStyle(this.par.nativeElement, 'color', 'purple');
  }
  
  public ngAfterViewInit() {
    this.incComps.forEach((comp) => {
      comp.increment();
    });
  }

  public onClick(val: HTMLInputElement) {
    alert(val.value);
  }

}
