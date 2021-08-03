```ts
const routes: Routes = [
  {
    path: "",
    redirectTo: "example",
    pathMatch: "full",
  },
  {
    path: "example",
    component: exampleComponent,
  },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [exampleComponent],
  providers: [PlatformService],
  exports: [exampleComponent],
})
export class exampleModule {}
```
