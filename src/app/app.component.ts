import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Tone from "tone";

const bkeys = ['1', '2', '3', '4', '5', '6'];
const wkeys = ['q','w','e','r','t', 'y', 'u', 'i'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'Piano';
  whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  blackKeys = ['Db4', 'Eb4', 'Gb4', 'Ab4', 'Bb4'];
  wKeysHtml!: HTMLCollectionOf<Element>;
  bKeysHtml!: HTMLCollectionOf<Element>;

  destroy(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    document.addEventListener('keydown', e => {
      if(bkeys.indexOf(e.key) > -1) {
        (this.bKeysHtml[bkeys.indexOf(e.key)] as HTMLElement).click();
      } else if(wkeys.indexOf(e.key) > -1) {
        (this.wKeysHtml[wkeys.indexOf(e.key)] as HTMLElement).click();
      }
    });
    this.wKeysHtml = document.getElementsByClassName('whiteKey');
    this.bKeysHtml = document.getElementsByClassName('blackKey');
  }

  invoke(e: any) {
    console.log(e);
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    // trigger the attack immediately
    synth.triggerAttack(e, now);
    // wait one second before triggering the release
    synth.triggerRelease(now + 1);
  }
}
