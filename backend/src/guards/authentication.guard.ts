import { Injectable,
    CanActivate,
    ExecutionContext

 } from "@nestjs/common";
import { Observable } from "rxjs";

 @Injectable()
 export class AuthenticationGuards implements CanActivate{
    canActivate(context: ExecutionContext):
     boolean | Promise<boolean> | Observable<boolean> {
    console.log("inside the guards")
    return true
    }
 }