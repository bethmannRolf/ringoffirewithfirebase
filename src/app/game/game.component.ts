
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
import { ActivatedRoute, Router } from '@angular/router';
import { updateDoc } from '@angular/fire/firestore';



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
 
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    public dialog: MatDialog, 
    private firestore: Firestore
  ) {
    this.gameRef = collection(this.firestore, 'games');
    this.items$ = collectionData(this.gameRef, { idField: 'id' });
  }


  updateGame(): void {
    if (!this.game || !this.game.id) {
      console.error("Spiel-ID fehlt, kann nicht aktualisieren.");
      return;
    }
  
    const gameDocRef = doc(this.firestore, 'games', this.game.id); // Dokumentreferenz holen
  
    updateDoc(gameDocRef, this.game.toJson())
      .then(() => console.log("Spiel erfolgreich aktualisiert!"))
      .catch((error) => console.error("Fehler beim Aktualisieren des Spiels:", error));
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id');  
      console.log('Gefundene Spiel-ID in URL:', gameId);
  
      if (gameId) {
        this.loadGame(gameId);  
      } else {
        this.newGame(); 
      }
    });
  }
  
  newGame() {
    this.game = new Game();
  
    addDoc(this.gameRef, this.game.toJson()).then((docRef) => {
      this.game.id = docRef.id; 
      console.log("Spiel erfolgreich erstellt mit ID:", docRef.id);
    }).catch((error) => {
      console.error("Fehler beim Erstellen des Spiels:", error);
    });
  }
  
  loadGame(id: string): void {
    const gameDocRef = doc(this.firestore, 'games', id);
  
    onSnapshot(gameDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        if (!this.game) {
          this.game = new Game();
        }
        this.game.id = id; 
        Object.assign(this.game, docSnapshot.data()); 
        console.log("Spiel geladen:", this.game);
      } else {
        console.error("Spiel mit der ID " + id + " nicht gefunden.");
      }
    });
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = (this.game.currentPlayer) % this.game.players.length;
  
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
  
      
          const gameDocRef = doc(this.firestore, 'games', this.game.id!);
          updateDoc(gameDocRef, this.game.toJson()).then(() => {
            console.log("Spiel aktualisiert mit neuer Karte:", this.currentCard);
          }).catch((error) => {
            console.error("Fehler beim Aktualisieren des Spiels:", error);
          });
  
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);  // Spieler zur Liste hinzufügen
  
        // **Spielstand sofort in Firestore speichern**
        const gameDocRef = doc(this.firestore, 'games', this.game.id!);
        updateDoc(gameDocRef, this.game.toJson()).then(() => {
          console.log("Neuer Spieler hinzugefügt:", name);
          console.log("Neuer Spieler hinzugefügt:", this.game.currentPlayer);
        }).catch((error) => {
          console.error("Fehler beim Aktualisieren des Spiels:", error);
        });
      }
    });
  }
  
}