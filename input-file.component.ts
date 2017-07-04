import {
    Component,
    forwardRef,
    Input,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
    ],
})
export class InputFileComponent implements ControlValueAccessor {
    @Input() accept;
    private _file = null;
    private fileName = null;
    private propagateChange = (_: any) => {
    };
    private propagateTouched = (_: any) => {
    };


    inputValueChanged(event) {
        const eventObj: MSInputMethodContext = event as MSInputMethodContext;
        const target: HTMLInputElement = eventObj.target as HTMLInputElement;
        const files: FileList = target.files;
        console.log(event);
        if (files && files[0]) {
            console.log('Got files', files[0])
            this._file = files[0];
            this.fileName = this._file.name;
        } else {
            console.log('Doesnt Got files')
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
        this.propagateChange(this._file);
    }

    writeValue(value: any) {
        this._file = value;
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
        // this.propagateTouched = fn;
    }
}
