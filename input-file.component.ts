import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {createFileRequiredValidator} from './validateFileRequired.validator';

@Component({
    selector: 'input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFileComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputFileComponent),
            multi: true,
        },
    ],
})
export class InputFileComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Input() accept;
    @Input() isRequired;
    fileName = null;
    private _file = null;
    private validateFn = null;
    private propagateChange = (_: any) => {
    };

    ngOnInit() {
        this.validateFn = createFileRequiredValidator(this.isRequired || false);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isRequired) {
            this.validateFn = createFileRequiredValidator(this.isRequired);
            this.propagateChange(this._file);
        }
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }

    inputValueChanged(event) {
        const eventObj: MSInputMethodContext = event as MSInputMethodContext;
        const target: HTMLInputElement = eventObj.target as HTMLInputElement;
        const files: FileList = target.files;
        console.log(event);
        if (files && files[0]) {
            this._file = files[0];
            this.fileName = this._file.name;
        } else {
            this._file = null;
            this.fileName = 'Aucun fichier choisi';
        }
        this.propagateChange(this._file);
    }

    get file() {
        return this._file;
    }

    set file(val) {
        this._file = val;
        this.fileName = this._file.name ? this._file.name : 'Aucun fichier choisi';
        this.propagateChange(this._file);
    }

    writeValue(value: any) {
        this._file = value;
        this.fileName = this._file.name ? this._file.name : 'Aucun fichier choisi';
        this.propagateChange(this._file);
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
