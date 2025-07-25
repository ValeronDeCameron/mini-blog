import { Injectable, Post } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    private data = [
        {
            id: 1,
            name: "Oleksii",
            password: "1234"
        },
        {
            id: 2,
            name: "Alex",
            password: "mmnzx"
        }
    ]
    
    findAll() {
        return this.data;
    }

    findUserById(id) {
        let user = this.data.find(user => id === user.id )
        if (!user) throw new NotFoundException("user not found")  
        return user
    }

    createNewUser(dto: createUserDto) {

        const {name, password, email} = dto;
        let id = this.data.length + Date.now()
        let newUser = {
            id: id,
            name,
            password,
            email
        }

        this.data.push(newUser);
        return {newUser, message: "created!"}
    }

    updateUser(id, dto: updateUserDto) {
        const {name, password, email} = dto;
        let oldUserIndex = this.data.findIndex( user => id === user.id);
        if (oldUserIndex === -1) throw new NotFoundException("Smth going wrong with update");
        let oldUser = this.data[oldUserIndex]
        let updatedUser = {
            ...oldUser,
            ...dto
        }
        this.data[oldUserIndex] = updatedUser;
        return {updatedUser, message: "User successfully updated"}
    }

    deleteUser(id) {
        let userIndex = this.data.findIndex(user => id === user.id)
        if (userIndex === -1) throw new NotFoundException("User not found")
        this.data.splice(userIndex, 1)
        return {ok: true, message: "User successfully deleted"}
    }
}
