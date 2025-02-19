import { Controller, Post, Body, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards'; 
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decoraters/roles.decoraters';
import { Favourite } from './schemas/favourite.schema';

@Controller('favourites')
export class FavouriteController {
    constructor(
        private readonly favouriteService: FavouriteService,
    ) {}

    @Post('add')
    @Roles(Role.Client)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async addFavourite(@Request() req, @Body('productId') productId: string): Promise<Favourite> {
        const userId = req.user.id; // Extract userId from JWT payload
        return await this.favouriteService.createFavourite(userId, productId);
    }

    @Delete('remove/:id')
    @Roles(Role.Client)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async removeFavourite(@Param('id') id: string): Promise<{ message: string }> {
        await this.favouriteService.removeFavourite(id);
        return { message: 'Favourite removed successfully' };
    }

    @Get('user')
    @Roles(Role.Client)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getFavouritesByUser(@Request() req): Promise<Favourite[]> {
        const userId = req.user.id; // Extract userId from JWT payload
        return await this.favouriteService.getFavouritesByUser(userId);
    }

    @Get('exists/:productId')
    @Roles(Role.Client)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async isProductFavourite(@Request() req, @Param('productId') productId: string): Promise<boolean> {
        const userId = req.user.id; // Extract userId from JWT payload
        return await this.favouriteService.isProductFavourite(userId, productId);
    }
}
