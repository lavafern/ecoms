import { DocumentBuilder } from "@nestjs/swagger";

export const documentConfig = new DocumentBuilder()
    .setTitle("ecommerce")
    .setDescription("ecommerce api docs")
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .build()
