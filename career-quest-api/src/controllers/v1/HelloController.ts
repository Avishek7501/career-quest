import { Get, Route, Tags } from 'tsoa';

@Tags('V1 Hello')
@Route('/api/v1/hello')
class HelloController {
    @Get('/')
    async hello() {
        return 'Hello Avishek';
    }
}

export default HelloController;
