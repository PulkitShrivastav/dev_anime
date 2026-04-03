import { Routes } from '@angular/router';
import { GanpatiAnime } from './extraComponents/ganpati-anime/ganpati-anime';
import { CarouselAnime } from './extraComponents/carousel-anime/carousel-anime';
import { FilesComponet } from './files-componet/files-componet';
import { CodeComponent } from './files-componet/code-component/code-component';
import { HomePageComp } from './files-componet/home-page-comp/home-page-comp';
import { UserComp } from './files-componet/user-comp/user-comp';

export const routes: Routes = [
    {
        path: 'files',
        component: FilesComponet,
        children: [
            {
                path: ':fileName',
                component: CodeComponent
            }]

    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComp
    },
    {
        path: 'carousel',
        component: CarouselAnime
    },
    {
        path: 'ganpati',
        component: GanpatiAnime
    },
    {
        path: 'login',
        component: UserComp
    }
];
