import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {AvatarModule} from 'primeng/avatar';
import {FieldsetModule} from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PopoverModule } from 'primeng/popover';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { NgControl } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';


import { InputGroup } from 'primeng/inputgroup';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import { UppercaseDirective } from './utils/uppercase.directive';
import { SafePipe } from './utils/safe.pipe';


@NgModule({
    imports: [
        InputTextModule,
        FluidModule,
        ButtonModule,
        SelectModule,
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputNumberModule,
        TabsModule,
        FieldsetModule,
        ReactiveFormsModule,
        FloatLabelModule,
        PopoverModule,
        AccordionModule,
        DatePickerModule,
        CheckboxModule,
        SelectButtonModule,
        TextareaModule,
        TableModule,
        ButtonModule,
        CommonModule,
        DialogModule,
        RippleModule,
        AvatarModule,
        MenuModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TooltipModule,
        HttpClientModule,
        PanelModule,
        InputGroup,
        UppercaseDirective,
        ToggleSwitchModule,
        MultiSelectModule,
        SafePipe
    ],
    exports: [
      InputTextModule,
      FluidModule,
      ButtonModule,
      SelectModule,
      FormsModule,
      InputGroupModule,
      InputGroupAddonModule,
      InputNumberModule,
      TabsModule,
      FieldsetModule,
      ReactiveFormsModule,
      FloatLabelModule,
      PopoverModule,
      AccordionModule,
      DatePickerModule,
      CheckboxModule,
      SelectButtonModule,
      TextareaModule,
      HttpClientModule,
      TableModule,
      ButtonModule,
      CommonModule,
      DialogModule,
      RippleModule,
      AvatarModule,
      MenuModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      TooltipModule,
      PanelModule,
      InputGroup,
      UppercaseDirective,
      ToggleSwitchModule,
      MultiSelectModule,
      SafePipe
    ]
})
export class ParametrosModule {
}
