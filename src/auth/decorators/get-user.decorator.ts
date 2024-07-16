import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetUser = createParamDecorator(
    ( data, ctx: ExecutionContext) => {
        console.log({ctx});
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if(data) {
            const prop = user[data];
            if(!prop) {
                throw new InternalServerErrorException('Property not found (request)');
            }
            return prop;
        }

        if(!user) {
            throw new InternalServerErrorException('User not found (request)');
        }

        return user;

    }
)