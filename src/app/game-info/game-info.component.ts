import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent {
  cardAction = [
    { title: 'Waterfall', description: ' Everyone starts drinking at the same time. The player who drew the card can stop whenever they want, but others can only stop when the person to their right stops.' },
    { title: 'You', description: 'Choose someone to drink.' },
    { title: 'Me', description: ' The person who drew the card drinks.' },
    { title: 'Floor', description: 'Everyone touches the floor. The last person to do so drinks.' },
    { title: 'Guys', description: 'All men drink.' },
    { title: 'Chicks', description: 'All women drink.' },
    { title: 'Heaven', description: ' Everyone raises their hand. The last person to do so drinks.' },
    { title: 'Mate', description: 'Pick a "mate." Every time you drink, they must also drink.' },
    { title: 'Rhyme', description: ' Say a word. Going clockwise, each player must say a word that rhymes with it. The first to fail drinks.' },
    { title: 'Categories', description: 'Pick a category (e.g., car brands). Players take turns naming something from that category. The first to fail drinks.' },
    { title: 'Rule', description: 'Make a new rule that everyone must follow for the rest of the game. Breaking the rule results in drinking.' },
    { title: 'Question Master', description: ' If you ask a question and someone answers, they must drink. This lasts until another Queen is drawn.' },
    { title: 'King Cup', description: 'Pour some of your drink into the middle cup. The person who draws the fourth King must drink the entire cup.' }
  ]

  title = '';
  description = '';
  private _card: string = '';

  @Input()
  set card(value: string) {
    this._card = value;
    let cardNumber = +(value.split('_')[1] ?? '0'); // Falls `undefined`, wird '0' verwendet
    if (!isNaN(cardNumber) && cardNumber >= 1 && cardNumber <= this.cardAction.length) {
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    } else {
      this.title = '';
      this.description = 'Take a card.';
    }
  }

  get card(): string {
    return this._card;
  }

}
