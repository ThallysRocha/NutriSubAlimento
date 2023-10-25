import { Food } from '../models/food.js';

export default class FoodController {
    createFood = async (request, response) => {
        const {name} = request.body;
        try{
            if(await Food.findOne({name})){
                return response
                .status(400)
                .json({error: "Food already exists"});
            }
            const food = await Food.create(request.body);
            return response.status(201).json({food});

        } catch(error){
            return response
            .status(400)
            .json({message: "Registration failed", error: error});
        }
    };
    getAllFoods = async (request, response) => {
        try{
            const foods = await Food.find();    
            if(foods.length > 0)
                return response
                    .status(200)
                    .json({foods});
            else
                return response
                    .status(404)
                    .json({error: "No foods found"});
        } catch(error){
            return response.status(400).json({error: error});
        }
    };
    getFood = async  (request, response) => {
        try{
            const food = await Food.findById({ _id: request.params.foodId });
            if (food) return response.send({ food });
            else 
                return response
                    .status(404)
                    .json({ error: "Food not found" });
        } catch (error){
            return response
                .status(500)
                .json({ message: "Something went wrong with the server", error });
        }
    };
    editFood = async (request, response) => {
        try{
            if(await Food.findOne({ _id: request.foodId})){
            const body = request.body;
            delete body.createdAt;
            delete body._id;
            await Food.updateOne({ _id: request.foodId }, body);
            return response.send(body);
            }else
                return response
                    .status(404)
                    .json({ error: "Food not found" });
        } catch (error){
            return response
                .status(500)
                .json({ message: "Something went wrong with the server", error });
        }
    };
}