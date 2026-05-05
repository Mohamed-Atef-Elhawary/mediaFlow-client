import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  docRank: WritableSignal<number> = signal(0);
  backDrop: WritableSignal<boolean> = signal(false);
}
