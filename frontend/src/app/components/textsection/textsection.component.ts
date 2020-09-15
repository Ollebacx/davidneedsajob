import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-textsection',
  templateUrl: './textsection.component.html',
  styleUrls: ['./textsection.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.3s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.7s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'widthIncrease',
      [
        transition(
          ':enter',
          [
            style({ width: '0%'}),
            animate('1s ease-in-out',
              style({ width: '100%'}))
          ]
        ),
        transition(
          ':leave',
          [
            style({ width: '100%' }),
            animate('0.5s ease-in',
              style({ width: '0%' }))
          ]
        )
      ]
    )

  ]
})

export class TextsectionComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() bgColor: string;
  @Input() textColor: string;
  @Input() date: string;
  height;
  scrolled = 0;
  hasScroll;

  constructor() {
  }

  ngOnInit(): void {
    var elem
    setTimeout(() => {
      elem = document.getElementById('body-text');
      console.log(elem.scrollHeight);
      if (elem.scrollHeight > (window.innerHeight - 140)) {
        this.hasScroll = true;
      }
      else {
        this.hasScroll = false;
      }
      document.body.style.setProperty('--scroll', `${this.scrolled}`);
    }, 800);//Wait for enter animation time between routes
  }

  onScroll(event: any) {
    var winScroll = event.target.scrollTop;
    this.height = event.target.scrollHeight - event.target.offsetHeight;
    this.scrolled = (winScroll / this.height) * 100;
    document.getElementById("myBar").style.width = this.scrolled + "%";
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
    }
    //SCROLL ANIMATION VAR TO BIND BOTH
    document.body.style.setProperty('--scroll', `${winScroll}`);
  }

}


