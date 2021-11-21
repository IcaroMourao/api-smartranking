import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:HIwP8KI7yGqUWRkD@cluster0.iswl9.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
