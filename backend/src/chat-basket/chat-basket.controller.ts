import { BadRequestException, Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@src/auth/decoraters/roles.decoraters';
import { Role } from '@src/auth/enums/role.enum';
import { ChatBasketService } from './chat-basket.service';
import { RolesGuard } from '@src/guards/role.guards';
import { ItemDto } from './dto/add-basket.dto';

interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
        roles: string[];
    };
}

@Controller('chat-basket')
export class ChatBasketController {

    constructor(private readonly ChatBasketService: ChatBasketService) { }


    // This endpoint will respond with the metadata of the URL provided by the user in the chat section, including details like price, image, title, and description.
    @Get('metadata')
    async getMetadata(@Query('url') url: string) {
        if (!url) {
            throw new BadRequestException('URL is required');
        }

        try {
            const metadata = await this.ChatBasketService.fetchMetadata(url);
            return { success: true, data: metadata };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to fetch metadata',
                error: error.message
            };
        }
    }



// This endpoint will add the items provided by the user in the chat section to the cart/basket.

    // @Post('add')
    // @Roles(Role.Client)
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // async addCartItem(
    //     @Body() itemDto: ItemDto,
    //     @Req() req: RequestWithUser
    // ) {
    //     const { price, name,quantity } = itemDto; 
    //     const userId = req.user.id;
    //     console.log("userid: " + userId);
    //     console.log("add basket to items hitted");

    //     const quantity = itemDto.quantity || 1;
    //     await this.ChatBasketService.addToBasket(userId, price, name, quantity);

    //     return { message: 'Items added to cart successfully' };
    // }


    @Post('add')
    @Roles(Role.Client)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async addCartItem(
        @Body() itemDto: ItemDto,
        @Req() req: RequestWithUser
    ) {
        const { price, name, quantity: dtoQuantity,Image } = itemDto; // Rename quantity for clarity
        const userId = req.user.id;
    
        console.log("userid: " + userId);
        console.log("add basket to items hitted");
    
        // Ensure `quantity` is a number
        const quantity = dtoQuantity ? Number(dtoQuantity) : 1;
    
        // Validate the converted quantity
        if (isNaN(quantity) || quantity <= 0) {
            throw new BadRequestException('Quantity must be a valid number greater than 0');
        }
    
        // const ProductType ='chat';
        await this.ChatBasketService.addToBasket(userId, price, name, quantity,Image);
    
        return { message: 'Items added to cart successfully' };
    }
    








    

}
