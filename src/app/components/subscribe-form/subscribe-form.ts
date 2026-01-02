import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { initialFormData, Subscribe, subscribeSchema } from './subscribe-form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ef-subscribe-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Field, MatCheckboxModule],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeForm {
  readonly #formModel = signal<Subscribe>(initialFormData);
  readonly form = form(this.#formModel, subscribeSchema);

  onSubmit(): void {
    if (this.form().invalid()) {
      return;
    }

    console.log('form values', this.form().value());
    this.form().reset();
    this.#formModel.set(initialFormData);
  }

  // Подписка на изменение значения контрола через effect
  eff = effect(() => {
    console.log('Email field: ', this.#formModel().email);
  });
}
