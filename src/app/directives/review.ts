import { Directive, ElementRef, Host, HostListener, input, OnInit } from '@angular/core';
import { RankingService } from '../services/ranking-service';

@Directive({
  selector: '[appReviewDirective]',
})
export class ReviewDirective implements OnInit {
  index = input.required<number>();

  constructor(
    private rankingService: RankingService,
    private ele: ElementRef,
  ) {}
  ngOnInit(): void {
    const currentRanc: number = this.rankingService.docRank();
    console.log(currentRanc);
    let children = [...this.ele.nativeElement.parentElement.children];
    for (let i = 0; i < currentRanc; i++) {
      // console.log('children[i]', children[i]);
      children[i].firstChild.classList.add('text-primary');
    }
  }
  @HostListener('mouseenter', ['$event']) onEnter(event: any) {
    let children = event.target.parentElement.children;
    for (let i = 0; i <= this.index(); i++) {
      children[i].classList.add('text-primary');
    }
  }
  @HostListener('mouseleave', ['$event']) onLeave(event: any) {
    let children = event.target.parentElement.children;
    for (let i = 0; i <= this.index(); i++) {
      children[i].classList.remove('text-primary');
    }
  }
  @HostListener('click', ['$event']) onClick(event: any) {
    let children = [...event.currentTarget.parentElement.children];
    children.forEach((child) => {
      child.firstChild.classList.remove('text-primary');
    });

    for (let i = 0; i <= this.index(); i++) {
      children[i].firstChild.classList.add('text-primary');
    }
  }
}
