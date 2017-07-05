# InputFile Module

##Available attributes
`[accept]="file_extension,audio/*,video/*,image/*,media_type" => like real accept attribute`
`[isRequired]="true" => can put a variable to have dynamic requirement`

##Reactive Forms
```input-file(formControlName="file", [accept]="'.zip'", [isRequired]="true")```

##NgModel Forms
```input-file([(ngModel)]="fileVariable", name='name', #name="ngModel", [isRequired]="true")```
