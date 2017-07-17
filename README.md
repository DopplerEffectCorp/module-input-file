# InputFile Module
TEST
## Available attributes

`[accept]="file_extension,audio/*,video/*,image/*,media_type" => like real accept attribute`

`[isRequired]="true" => can put a variable to have dynamic requirement`

## Reactive Forms

`input-file(formControlName="file", [accept]="'.zip'", [isRequired]="true")`

## NgModel Forms

`input-file([(ngModel)]="fileVariable", name='name', #name="ngModel", [isRequired]="true")`

## Extendable
    @Component({
        selector: 'input-file-user',
        templateUrl: './form.user.input.html',
        styleUrls: [‘./form.user.input.file.scss’],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FormUserInputFileComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => FormUserInputFileComponent),
                multi: true,
            },
        ],
    })

    export class FormUserInputFileComponent extends InputFileComponent {

    }
