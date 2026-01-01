import { Component, effect, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { initialSubscribeForm, Subscribe } from './subscribe-form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ef-subscribe-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Field],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.scss',
})
export class SubscribeForm {
  readonly #formModel = signal<Subscribe>(initialSubscribeForm);
  readonly form = form(this.#formModel);

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.form().invalid()) {
      return;
    }

    console.log('form values', this.form().value());
  }

  // Подписка на изменение значения контрола через effect
  eff = effect(() => {
    console.log('Email field: ', this.#formModel().email);
  });
}
