import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputFileComponent} from './input-file.component';
import {
    ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [InputFileComponent],
    exports: [InputFileComponent]
})
export class InputFileModule { }
