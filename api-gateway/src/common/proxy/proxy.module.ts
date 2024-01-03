import { Module } from "@nestjs/common";
import { ClientProxySuperflights } from "./client-proxy";

@Module({
    providers: [ClientProxySuperflights],
    exports: [ClientProxySuperflights],
})

export class ProxyModule{}