import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.quards'

export const Auth = () => UseGuards(JwtAuthGuard)
