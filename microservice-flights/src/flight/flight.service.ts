import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDTO } from './dto/flight.dto';
import { FLIGHTS, PASSENGER } from 'src/common/models/models';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { Model } from 'mongoose';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHTS.name) private readonly model: Model<IFlight>){}

    async create(flightDTO: FlightDTO): Promise<IFlight>{
        const newFlight = new this.model(flightDTO);
        return await newFlight.save();
    }

    async findAll(): Promise<IFlight[]>{
        return await this.model.find().populate(PASSENGER.name);
    }

    async findOne(id: string): Promise<IFlight>{
        return await this.model.findById(id).populate(PASSENGER.name);
    }

    async udpate(id: string, flightDTO: FlightDTO): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    async delete(id: string){
        await this.model.findByIdAndDelete(id);

        return {
            status: HttpStatus.OK,
            message: 'Flight deleted successfully'
        }
    }

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight>{

        return await this.model.findByIdAndUpdate(flightId,
            {
                $addToSet: {passengers: passengerId},
            }, 
            {new: true}
                
        ).populate(PASSENGER.name);

    }
}
