import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  status: boolean;
  @ApiResponseProperty({
    example: 201,
  })
  statusCode: number;
}

export class OkResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  status: boolean;
  @ApiResponseProperty({
    example: 200,
  })
  statusCode: number;
}
