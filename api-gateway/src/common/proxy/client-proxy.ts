import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxySuperflights{
    constructor(private readonly configService: ConfigService){}

    clientProxyUsers(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.configService.get('AMQP_URLS'),
                queue: RabbitMQ.UserQueue,
            }
        })
    }

    clientProxyPassengers(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.configService.get('AMQP_URLS'),
                queue: RabbitMQ.PassengerQueue,
            }
        })
    }

    flightProxyPassengers(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.configService.get('AMQP_URLS'),
                queue: RabbitMQ.FlightQueue,
            }
        })
    }
}