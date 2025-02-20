// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Game } from '../game';
// import { PlayerComponent } from "../player/player.component";
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
// import { GameInfoComponent } from "../game-info/game-info.component"
// import { MatCardModule } from '@angular/material/card';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { inject } from '@angular/core';


// @Component({
//   selector: 'app-game',
//   standalone: true,
//   imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, GameInfoComponent, MatCardModule],
//   templateUrl: './game.component.html',
//   styleUrls: ['./game.component.scss']
// })
// export class GameComponent implements OnInit {

//   pickCardAnimation = false;
//   game!: Game;
//   currentCard: string = '';

//   items$;




//   firestore: Firestore;

//   constructor(public dialog: MatDialog, firestore: Firestore) {
//     this.firestore = firestore;
//     this.items$ = collectionData(this.getGameRef());
//   }
  



// getGameRef(){
//   return collection(this.firestore, 'games')
// }


//   ngOnInit(): void {
//     this.newGame();
//   }

//   newGame() {
//     this.game = new Game();
//   }



//   takeCard() {
//     if (!this.pickCardAnimation) {
//       const card = this.game.stack.pop();
//       if (card !== undefined) {
//         this.currentCard = card;
//         this.pickCardAnimation = true;
//         this.game.currentPlayer++
//         this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
//         setTimeout(() => {
//           this.game.playedCards.push(this.currentCard);
//           this.pickCardAnimation = false;
//         }, 1000);
//       } else {
//       }
//     }
//   }

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogAddPlayerComponent);
//     dialogRef.afterClosed().subscribe((name: string) => {
//       if (name && name.length > 0) {
//         this.game.players.push(name)
//       }
//     });
//   }
// }




import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';
  items$: Observable<any[]>;  
  readonly gameRef;

  constructor(private route:ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.gameRef = collection(this.firestore, 'games');
    this.items$ = collectionData(this.gameRef, { idField: 'id' });
        this.items$.subscribe(game => console.log('Firebase Daten:', game));
  }



  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params)=>{
      console.log(params)
    })
  }




  newGame() {
    this.game = new Game();


    addDoc(this.gameRef, this.game.toJson()).then((docRef) => {
      console.log("Dokument erfolgreich hinzugefügt mit ID: ", docRef.id);
    }).catch((error) => {
      console.error("Fehler beim Hinzufügen des Dokuments: ", error);
    });
  }




  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}