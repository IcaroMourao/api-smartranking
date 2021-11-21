import { format } from 'winston';
const { printf } = format;

export class LoggerHelper {
  private date() {
    return new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Fortaleza',
    });
  }

  format() {
    return printf(({ level, message }) => {
      return `${this.date()}: ${level}: ${message}`;
    });
  }
}
