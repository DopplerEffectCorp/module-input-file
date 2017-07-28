import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
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
    encapsulation: ViewEncapsulation.None,
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
    @Input() multiple;
    @Output('change') change: EventEmitter<any> = new EventEmitter();
    fileName = null;
    picture;
    protected _file: FileList;
    protected validateFn = null;
    protected propagateChange = (_: any) => {
    };

    ngOnInit() {
        this.multiple = this.multiple || false;
        this.validateFn = createFileRequiredValidator(this.isRequired || false);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isRequired']) {
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
        if (files) {
            this._file = files;
            this.fileName = this._file.length > 1 ? 'Plusieurs fichier sélectionnés' : this._file[0].name;
            if (this._file.length < 2) {
                const reader = new FileReader();
                reader.onload = (nevent: any) => {
                    this.picture = nevent.target.result;
                    this.change.emit(this.picture);
                };
                reader.readAsDataURL(this._file[0]);
            }
        } else {
            this._file = null;
            this.fileName = null;
        }

        this.propagateChange(this._file);
    }

    get file() {
        return this._file;
    }

    set file(val) {
        this._file = val;
        this.fileName = this._file ? (this._file.length > 1 ? 'Plusieurs fichier sélectionnés' : this._file[0].name) : null;
        this.propagateChange(this._file);
    }

    writeValue(value: any) {
        this._file = value;
        this.fileName = this._file ? (this._file.length > 1 ? 'Plusieurs fichier sélectionnés' : this._file[0].name) : null;
        this.propagateChange(this._file);
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
