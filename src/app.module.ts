import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import * as appRootPath from 'app-root-path';
import { LoggerHelper } from './common/Helpers/LoggerHelper';

const loggerHelper = new LoggerHelper();
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:HIwP8KI7yGqUWRkD@cluster0.iswl9.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    JogadoresModule,
    CategoriasModule,
    WinstonModule.forRoot({
      transports: [
        new transports.File({ filename: `${appRootPath}/logs/debug.log`, level: 'silly' }),
      ],
      format: loggerHelper.format(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
