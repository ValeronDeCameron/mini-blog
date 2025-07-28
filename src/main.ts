import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


let PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT ?? PORT, () => {
    console.log(`Server started at port ${PORT}`)
  });
}
bootstrap();
