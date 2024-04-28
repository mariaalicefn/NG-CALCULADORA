import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public listOperadores: string[] = ['/', 'X', '-', '+', '='];
  public memoria: number[] = [0.0, 0.0];
  public memoriaIndex: number = 0;
  public operacao: string = '';
  public valueDisplay: string = '0';
  public wipeValue = false;

  applyCommand(command: any) {
    for (let i = 0; i < this.listOperadores.length; i++) {
      if (this.listOperadores[i] == command) {
        this.setOperation(command);
        return;
      }
    }

    if (command == 'AC') {
      this.allClear();
    } else if (command == '←') {
      return;
    } else {
      this.addDigit(command);
    }
  }

  setOperation(newOperation: any) {
    let isEqualSign = newOperation == '=';
    if (this.memoriaIndex == 0) {
      if (!isEqualSign) {
        this.operacao = newOperation;
        this.memoriaIndex = 1;
        this.wipeValue = true;
      }
    } else {
      this.memoria[0] = this.calculate();
      this.memoria[1] = 0.0;
      this.operacao = isEqualSign ? null : newOperation;
      this.memoriaIndex = isEqualSign ? 0 : 1;
      this.valueDisplay = this.memoria[0].toString();
    }
    this.wipeValue = true;
  }

  addDigit(digito: any) {
    let isDot = digito == '.';
    let wipeValue = (this.valueDisplay == '0' && !isDot) || this.wipeValue;

    if (isDot && this.valueDisplay.indexOf('.') > -1) {
      return;
    }

    let emptyValue = isDot ? '0' : '';
    let currentValue = wipeValue ? emptyValue : this.valueDisplay;
    this.valueDisplay = currentValue + digito;
    this.wipeValue = false;

    this.memoria[this.memoriaIndex] = parseFloat(this.valueDisplay) ?? 0;
  }

  allClear() {
    this.valueDisplay = '0';
    this.memoria[0] = 0;
    this.memoria[1] = 0;
    this.memoriaIndex = 0;
    this.operacao = '';
    this.wipeValue = false;
  }

  crearValue() {
    this.valueDisplay = '0';
  }

  alter() {
    const result = parseFloat(this.valueDisplay) * -1;
    this.valueDisplay = result.toString();
  }

  calculate() {
    switch (this.operacao) {
      case '/':
        return this.memoria[0] / this.memoria[1];
      case 'X':
        return this.memoria[0] * this.memoria[1];
      case '-':
        return this.memoria[0] - this.memoria[1];
      case '+':
        return this.memoria[0] + this.memoria[1];
      default:
        return this.memoria[0];
    }
  }

  getValue() {
    return this.valueDisplay;
  }

  getbuffer(index: any) {
    return this.memoria[index];
  }
}
