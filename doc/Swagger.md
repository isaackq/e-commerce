# **Documenting Swagger Usage with NestJS**

## **Introduction**

Swagger is a powerful tool used for interactive and comprehensive API documentation. By integrating Swagger with the **NestJS** framework, developers can create a user-friendly interface to explore and document their project's API endpoints.

---

## **Prerequisites**

- A working **NestJS** project.
- Necessary packages installed for Swagger integration.

---

## **Setup Steps**

### **1. Install Required Packages**

Install the Swagger library for NestJS along with **swagger-ui-express**:

```bash
npm install @nestjs/swagger swagger-ui-express
```

---

### **2. Configure Swagger in Your Project**

Add the necessary configurations in the **`main.ts`** file:

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation for the API endpoints')
    .setVersion('1.0')
    .addTag('users') // Add categories
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define Swagger UI route

  await app.listen(3000);
}
bootstrap();
```

---

### **3. Documenting Endpoints**

#### **3.1 Add Tags Using `@ApiTags`**

Use **`@ApiTags`** to group endpoints under categories:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'This action returns all users';
  }
}
```

#### **3.2 Describe Operations Using `@ApiOperation`**

Use **`@ApiOperation`** to specify endpoint functionality:

```typescript
import { ApiOperation } from '@nestjs/swagger';

@Get()
@ApiOperation({ summary: 'Get all users' })
getAllUsers() {
  return 'This action returns all users';
}
```

#### **3.3 Describe Responses Using `@ApiResponse`**

Define response types and descriptions:

```typescript
import { ApiResponse } from '@nestjs/swagger';

@Get()
@ApiResponse({ status: 200, description: 'Return all users' })
@ApiResponse({ status: 404, description: 'No users found' })
getAllUsers() {
  return 'This action returns all users';
}
```

---

### **4. Documenting Data Using DTOs**

#### **4.1 Create DTOs with `@ApiProperty`**

Use **`@ApiProperty`** to annotate the properties of your data transfer objects (DTOs):

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;
}
```

#### **4.2 Use DTOs in Documentation**

Specify DTOs in your endpoint documentation:

```typescript
@ApiResponse({
  status: 200,
  description: 'Return all users',
  type: CreateUserDto,
  isArray: true,
})
```

---

### **5. Accessing the Swagger UI**

Once Swagger is configured, you can access the interactive UI at:

```
http://localhost:3000/api
```

---

### **6. Best Practices**

1. **Consistency:** Ensure all endpoints are properly documented.
2. **DTOs:** Use DTOs to clearly define input and output data structures.
3. **Organized Tags:** Use tags to categorize and group related endpoints.

---

## **Conclusion**

By following these steps, you can easily integrate **Swagger** to document the API of your **NestJS** project. This documentation enhances the developer experience and provides a clear understanding of available endpoints.

For more details, visit [Bariq](https://github.com/Hazzembadran/Learn-and-Code-Bariq/blob/main/Backend/SwaggerInNestJs.md).
