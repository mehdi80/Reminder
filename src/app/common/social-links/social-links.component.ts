import {Component, signal, Input} from '@angular/core';
import {SocialLinks} from '../../models/social-link';


@Component({
  selector: 'app-social-links',
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {

  private _socialOptions = signal<SocialLinks[]>([]);

  @Input()
  set socialOptions(options: SocialLinks[]) {
    this._socialOptions.set(options);
  }

  get socialOptions() {
    return this._socialOptions();
  }
}
