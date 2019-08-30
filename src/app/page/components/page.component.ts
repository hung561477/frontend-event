import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { sideBarItems } from '../../share/config/header.config';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ItemService } from '../../share/service/item.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { ToggleService } from 'src/app/share/service/toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/share/model/contact.model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { StepService } from 'src/app/share/service/step.service';
// import * as Parallax from 'parallax-js';
declare var $: any;


@Component({
  selector: 'event-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})

export class PageComponent implements OnInit, AfterViewInit {
  _opened = true;
  _slide = 1;
  _modeNum = 0;
  _MODES: Array<string> = ['slide'];
  interval: any;
  closeResult: string;
  modalRef: BsModalRef;
  contactForm: FormGroup;
  isLogo = false;
  configModal = {
    backdrop: false,
    animated: true
  };
  active: boolean = false;
  @ViewChild('lgModal') childModal: ModalDirective;

  public show = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type = 'component';

  public disabled = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false,
    spaceBetween: 0,
    speed: 1500,
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild('.swiper-container') public swiperWrapper: any;

  public onIndexChange(index: number): void {
    this._slide = index + 1;
    this.menuActive.setMenuActive(index);
  }

  public onSwiperEvent(event: string): void {
  }

  constructor(private router: Router, private menuActive: ItemService,
    private modalService: BsModalService, private modal: ToggleService,
    private formBuilder: FormBuilder, private auth: AuthenticationService,
    private step: StepService) {
  }

  createFormContact() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.active = this.step.getMyGV();
    this.menuActive.activeSlide.subscribe(value => {
      this.componentRef.directiveRef.setIndex(value);
    });
    this.createFormContact();
    this.setSlide();
    if (this.active) {
      this.openModal1();
    }
  }

  ngAfterViewInit() {
    $.simpleTicker($('#ticker-roll'), {
      effectType: 'roll',
      speed: 1000,
      delay: 3000,

    });

    $('#home').parallax({
      imageSrc: '/assets/main.png',
      naturalWidth: 3000,
      naturalHeight: 800,
      positionY: 'center',
      parallax: 'scroll'
    });

    $('a[href^="#"]').click(function (e) {
      e.stopPropagation();
      $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);
      return false;
    });
  }

  onSubmit() {
    const body = new ContactModel(
      this.contactForm.getRawValue().name,
      this.contactForm.getRawValue().email,
      this.contactForm.getRawValue().description,
    )
    this.auth.submitContact(body).subscribe(val => {
    })
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  onWindowScroll(event) {
    if (event.target.scrollingElement.scrollTop > 150) {
      this.isLogo = true;
    } else {
      this.isLogo = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'custom-modal' }));
  }

  setSlide() {
    this._opened = !this._opened;
    for (const m of sideBarItems) {
      if (m.url === this.router.url) {
        this._toggleSidebar(m.id);
      }
    }
  }

  _toggleSidebar(event?: number) {
    this._slide = event;
    this._opened = !this._opened;
  }

  openModal1() {
    this.childModal.show();
  }
  closeModal() {
    this.childModal.hide();
  }

}
