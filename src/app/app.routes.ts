// import { Routes } from '@angular/router';
// import { StartScreenComponent } from './start-screen/start-screen.component';
// import { GameComponent } from './game/game.component';


// export const routes: Routes = [
//     {path: '', component: StartScreenComponent },
//     {path: 'game', component: GameComponent }
   
// ];




import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game/:id', component: GameComponent },  // Dynamische Route für Spiel mit ID
    { path: 'game', component: GameComponent }  
];
