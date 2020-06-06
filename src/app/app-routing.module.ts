import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'home-location', loadChildren: () => import('./pages/home-location/home-location.module').then(m => m.HomeLocationPageModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule) },
  { path: 'support', loadChildren: () => import('./pages/support/support.module').then(m => m.SupportPageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'edit-profile', loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'messages', loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule) },
  { path: 'message/:id', loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule) },
  { path: 'home-results', loadChildren: () => import('./pages/home-results/home-results.module').then(m => m.HomeResultsPageModule) },
  { path: 'search-filter', loadChildren: () => import('./pages/modal/search-filter/search-filter.module').then(m => m.SearchFilterPageModule) },
  { path: 'nearby', loadChildren: () => import('./pages/nearby/nearby.module').then(m => m.NearbyPageModule) },
  { path: 'schedule-visit', loadChildren: () => import('./pages/schedule-visit/schedule-visit.module').then(m => m.ScheduleVisitPageModule) },
  { path: 'bycategory', loadChildren: () => import('./pages/bycategory/bycategory.module').then(m => m.BycategoryPageModule) },
  { path: 'property-list', loadChildren: () => import('./pages/property-list/property-list.module').then(m => m.PropertyListPageModule) },
  { path: 'property-detail/:id', loadChildren: () => import('./pages/property-detail/property-detail.module').then(m => m.PropertyDetailPageModule) },
  { path: 'broker-list', loadChildren: () => import('./pages/broker-list/broker-list.module').then(m => m.BrokerListPageModule) },
  { path: 'broker-detail/:id', loadChildren: () => import('./pages/broker-detail/broker-detail.module').then(m => m.BrokerDetailPageModule) },
  { path: 'broker-chat', loadChildren: () => import('./pages/broker-chat/broker-chat.module').then(m => m.BrokerChatPageModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule) },
  { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule) },
  { path: 'invoices', loadChildren: () => import('./pages/invoices/invoices.module').then(m => m.InvoicesPageModule) },
  { path: 'extras', loadChildren: () => import('./pages/extras/extras.module').then(m => m.ExtrasPageModule) },
  { path: 'extras/profile-one', loadChildren: () => import('./pages/extras/profile-one/profile-one.module').then(m => m.ProfileOnePageModule) },
  { path: 'extras/profile-two', loadChildren: () => import('./pages/extras/profile-two/profile-two.module').then(m => m.ProfileTwoPageModule) },
  { path: 'extras/timeline', loadChildren: () => import('./pages/extras/timeline/timeline.module').then(m => m.TimelinePageModule) },
  { path: 'extras/authentication', loadChildren: () => import('./pages/extras/authentication/authentication.module').then(m => m.AuthenticationPageModule) },
  { path: 'extras/popupmenu', loadChildren: () => import('./pages/extras/popupmenu/popupmenu.module').then(m => m.PopupmenuPageModule) },
  { path: 'extras/charts', loadChildren: () => import('./pages/extras/charts/charts.module').then(m => m.ChartsPageModule) },
  { path: 'extras/post', loadChildren: () => import('./pages/extras/post/post.module').then(m => m.PostPageModule) },
  // { path: '**', redirectTo: '/home-results' },
  { path: 'sitio', loadChildren: () => import('./pages/sitio/sitio.module').then( m => m.SitioPageModule)},

  {
    path: 'agendar-cita',
    loadChildren: () => import('./pages/agendar-cita/agendar-cita.module').then( m => m.AgendarCitaPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
